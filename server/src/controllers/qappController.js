const uuidv4 = require('uuid/v4');
const { CompletedQappSection, Qapp, QappDatum } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const qapps = await Qapp.findAll({
        where: { userId: req.user.id },
        include: [{ model: QappDatum, attributes: ['questionId', 'value', 'valueId'], as: 'data' }],
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
        where: { userId: req.user.id, id: req.params.id },
        include: [{ model: QappDatum, attributes: ['questionId', 'value', 'valueId'], as: 'data' }],
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
      res.send(qapp);
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
      res.send(qapp);
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
        where: { qappId: req.body.qappId, questionId: req.body.questionId, valueId: req.body.valueId },
      });
      // if record exists, update, otherwise create
      if (qappDatum) {
        qappDatum = await qappDatum.update(req.body);
      } else {
        qappDatum = await QappDatum.create(req.body);
      }
      // return updated QAPP with the latest saved data fields
      const qapp = await Qapp.findOne({
        where: { userId: req.user.id, id: req.body.qappId },
        include: [{ model: QappDatum, attributes: ['questionId', 'value', 'valueId'], as: 'data' }],
      });
      res.send(qapp);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
  async completedSections(req, res) {
    try {
      // TODO: confirm user has access to this QAPP first?
      const sections = await CompletedQappSection.findAll({
        where: { qappId: req.params.id },
      });
      res.send(sections);
    } catch (err) {
      res.status(400).send({
        err: `Data unavailable. ${err}`,
      });
    }
  },
  async addCompletedSection(req, res) {
    try {
      await CompletedQappSection.create(req.body);
      const sections = await CompletedQappSection.findAll({
        where: { qappId: req.body.qappId },
      });
      res.send(sections);
    } catch (err) {
      res.status(400).send({
        err: `Data unavailable. ${err}`,
      });
    }
  },
  async deleteCompletedSection(req, res) {
    try {
      await CompletedQappSection.destroy({
        where: { qappId: req.body.qappId, sectionId: req.body.sectionId },
      });
      const sections = await CompletedQappSection.findAll({
        where: { qappId: req.body.qappId },
      });
      res.send(sections);
    } catch (err) {
      res.status(400).send({
        error: err,
      });
    }
  },
};
