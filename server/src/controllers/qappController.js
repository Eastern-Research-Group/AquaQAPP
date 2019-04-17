const { Qapp } = require('../models');
const config = require('../config/config');

module.exports = {
  async index(req, res) {
    try {
      const qapps = await Qapp.findAll({
        where: { userId: req.user.id, projectId: config.projectId },
      });
      res.send(qapps);
    } catch (err) {
      res.status(400).send({
        err: 'Dashboard data unavailable.',
      });
    }
  },
  async show(req, res) {
    try {
      const qapp = await Qapp.findOne({
        where: { userId: req.user.id, projectId: config.projectId, id: req.id },
      });
      res.send(qapp);
    } catch (err) {
      res.status(400).send({
        err: 'Dashboard data unavailable.',
      });
    }
  },
  async store(req, res) {
    try {
      const qapp = await Qapp.create(req.body);
      const qappJson = qapp.toJSON();
      res.send({
        userId: qappJson.userId,
        projectId: config.projectId,
        title: qappJson.title,
        description: qappJson.description,
        updatedAt: qappJson.updatedAt,
      });
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async destroy(req, res) {
    try {
      const qapp = await Qapp.destroy({
        where: { id: req.body.id },
      });
      res.json(qapp);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
};