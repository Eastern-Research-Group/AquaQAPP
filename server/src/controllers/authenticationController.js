const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

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
          error: 'Incorrect email address or password.',
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Incorrect email address or password.',
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
