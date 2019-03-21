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
      // todo: remove the hashed password from the user JSON response
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
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
          error: 'The login information was incorrect',
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect.',
        });
      }
      // todo: remove the hashed password from the user JSON response
      const userJson = user.toJSON();
      return res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      return res.status(500).send({
        error: 'An error has occurred trying to log in: ' + err,
      });
    }
  },

  async user(req, res) {
    // todo: remove the hashed password from the user JSON response
    const userJson = req.user.toJSON();
    res.send({
      user: userJson,
      token: jwtSignUser(userJson),
    });
  },

  async logout(req) {
    req.logout();
  },
};
