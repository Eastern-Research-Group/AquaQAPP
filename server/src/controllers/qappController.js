const uuidv4 = require('uuid/v4');
const { Qapp, QappDatum } = require('../models');
const config = require('../config/config');

module.exports = {
  async index(req, res) {
    try {
      const qapps = await Qapp.findAll({
        where: { userId: req.user.id, projectId: config.projectId },
        include: [{ model: QappDatum, attributes: ['questionId', 'value'], as: 'data' }],
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
        where: { userId: req.user.id, projectId: config.projectId, id: req.params.id },
        include: [{ model: QappDatum, attributes: ['questionId', 'value'], as: 'data' }],
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
      const qapp = await Qapp.create({
        ...req.body,
        id: uuidv4(),
      });
      const qappJson = qapp.toJSON();
      res.send(qappJson);
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
  async saveData(req, res) {
    try {
      // check if record already exists with same qapp id and question id
      let qappDatum = await QappDatum.findOne({
        where: { qappId: req.body.qappId, questionId: req.body.questionId },
      });
      // if record exists, update, otherwise create
      if (qappDatum) {
        qappDatum = await qappDatum.update(req.body);
      } else {
        qappDatum = await QappDatum.create(req.body);
      }
      // return updated QAPP with the latest saved data fields
      const qapp = await Qapp.findOne({
        where: { userId: req.user.id, projectId: config.projectId, id: req.body.qappId },
        include: [{ model: QappDatum, attributes: ['questionId', 'value'], as: 'data' }],
      });
      const qappJson = qapp.toJSON();
      res.send(qappJson);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
};
