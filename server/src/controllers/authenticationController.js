const jwt = require('jsonwebtoken');
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { User } = require('../models');
const config = require('../config/config');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: config.service,
  auth: {
    user: config.db.email,
    pass: 'Aquaqapp1010',
  },
});

let handlebarsOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./server/src/templates/'),
  },
  viewPath: path.resolve('./server/src/templates/'),
  extName: '.html',
};

transporter.use('compile', hbs(handlebarsOptions));

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userJson = user.toJSON();
      const token = jwtSignUser(userJson);
      delete userJson.password;
      res.header('Access-Control-Expose-Headers', 'Authorization');
      res.header('Authorization', `Bearer ${token}`);
      res.send({
        data: userJson,
      });
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.',
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(403).send({
          error: 'The credentials do not match our records. Please try again or reset your password.',
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid || !user) {
        return res.status(403).send({
          error: 'The credentials do not match our records. Please try again or reset your password.',
        });
      }
      const userJson = user.toJSON();
      const token = jwtSignUser(userJson);
      delete userJson.password;
      res.header('Access-Control-Expose-Headers', 'Authorization');
      res.header('Authorization', `Bearer ${token}`);
      return res.send({
        data: userJson,
      });
    } catch (err) {
      return res.status(500).send({
        error: `An error has occurred trying to log in: ${err}`,
      });
    }
  },

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(422).send({
          error: 'User not found.',
        });
      } else {
        const userJson = user.toJSON();
        const token = jwtSignUser(userJson);

        await User.update(
          {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 1000 * 60 * 60 * 24 * 3,
          },
          {
            where: {
              id: user.id,
            },
          }
        );

        const updatedUser = await User.findOne({
          where: {
            id: user.id,
          },
        });

        const updatedUserJson = updatedUser.toJSON();

        let data = {
          to: updatedUserJson.email,
          from: 'aqua.qapp@gmail.com',
          template: 'forgot-password-email',
          subject: 'AquaQAPP Password Reset',
          context: {
            url: config.baseUrl + '/#/resetPassword?token=' + updatedUserJson.resetPasswordToken,
            name: updatedUserJson.name.split(' ')[0],
          },
        };

        transporter.sendMail(data, function() {
          return res.json({ message: 'Success' });
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  async renderResetPasswordTemplate(req, res) {
    return res.sendFile(path.resolve('./client/views/Reset.vue'));
  },

  async resetPassword(req, res) {
    try {
      const { resetPasswordToken } = req.body;
      const user = await User.findOne({
        where: {
          resetPasswordToken: resetPasswordToken,
        },
      });

      if (!user) {
        return res.status(422).send({
          error: 'The password reset token has expired. Please follow steps to reset again.',
        });
      } else {
        const { newPassword, confirmNewPassword } = req.body;
        if (newPassword === confirmNewPassword) {
          user.password = newPassword;
          await user.hashPassword(user);
          await User.update(
            {
              resetPasswordToken: null,
              resetPasswordExpires: null,
              password: user.password,
            },
            {
              where: {
                resetPasswordToken: resetPasswordToken,
              },
            }
          );

          const updatedUser = await User.findOne({
            where: {
              id: user.id,
            },
          });

          let data = {
            to: updatedUser.email,
            from: 'aqua.qapp@gmail.com',
            template: 'reset-password-email',
            subject: 'Password Reset Confirmation',
            context: {
              name: updatedUser.name.split(' ')[0],
            },
          };

          transporter.sendMail(data, function(err) {
            if (!err) {
              return res.json({ message: 'Password reset' });
            } else {
              return done(err);
            }
          });
        } else {
          return res.status(422).send({
            error: 'Passwords do not match.',
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },

  async user(req, res) {
    const userJson = req.user.toJSON();
    const token = jwtSignUser(userJson);
    delete userJson.password;
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header('Authorization', `Bearer ${token}`);
    return res.send({
      data: userJson,
    });
  },

  async logout(req) {
    req.logout();
  },
};
