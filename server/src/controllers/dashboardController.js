const {Qapp} = require('../models');

module.exports = {
  async dashboard (req, res) {
      try {
        const qapps = await Qapp.findAll();
        res.send(qapps);
      } catch (err) {
          res.status(400).send({
              err: 'Dashboard data unavailable.'
          })
      }
  }
};
