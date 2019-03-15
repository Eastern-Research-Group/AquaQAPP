const {User} = require('../models');

module.exports = {
  async dashboard (req, res) {
      try {
          const userId = req.user.id;
          const user = await User.findOne({
              where: {
                  UserId: userId
              }
          });
          res.send(user);
          console.log(user);
      } catch (err) {
          res.status(400).send({
              err: 'Dashboard data unavailable.'
          })
      }
  }
};