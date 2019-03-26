const { Qapp } = require('../models');

module.exports = {
  async dashboard(req, res) {
    try {
      const qapps = await Qapp.findAll({
        where: {userId: req.user.id},
      });
      res.send(qapps);
    } catch (err) {
      res.status(400).send({
        err: 'Dashboard data unavailable.',
      });
    }
  },
  async addQapp(req, res) {
    try {
      const qapp = await Qapp.create(req.body);
      const qappJson = qapp.toJSON();
      res.send({
        userId: qappJson.userId,
        title: qappJson.title,
        description: qappJson.description,
        updatedAt: qappJson.updatedAt,
      });
      console.log(res);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
};
