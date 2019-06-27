const uuidv4 = require('uuid/v4');
const { Op } = require('sequelize');
const { CompletedQappSection, Qapp, QappDatum, Question } = require('../models');

function checkFieldLength(question, body) {
  if (question.id !== body.questionId) return `Weird data condition - ${question.id} !== ${body.questionId}`;

  if (['text', 'email', 'tel', 'largeText'].indexOf(question.dataEntryType) !== -1) {
    if (body.value !== undefined) {
      const size = body.value.length;
      if (size === 0) return `${question.questionLabel} is required.`;
      if (size > question.maxLength)
        return `${question.questionLabel} is too long. Maximum length is ${question.maxLength}.`;
    }
  }

  return null;
}

module.exports = {
  async index(req, res) {
    try {
      const qapps = await Qapp.findAll({
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ['completedSections', 'sectionId', 'ASC'],
        ],
        where: { userId: req.user.id, archived: false },
        include: [
          {
            model: QappDatum,
            attributes: ['questionId', 'value', 'valueId'],
            as: 'data',
          },
          {
            model: CompletedQappSection,
            attributes: ['sectionId'],
            as: 'completedSections',
          },
        ],
      });
      const qappsWithSectionIds = qapps.map((qapp) => {
        const updatedQapp = JSON.parse(JSON.stringify(qapp)); // clone object to update prop
        updatedQapp.completedSections = updatedQapp.completedSections.map((s) => s.sectionId); // update to array of ids
        return updatedQapp;
      });
      res.send(qappsWithSectionIds);
    } catch (err) {
      res.status(400).send({
        err: 'Dashboard data unavailable.',
      });
    }
  },
  async show(req, res) {
    try {
      const qapp = await Qapp.findOne({
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ['completedSections', 'sectionId', 'ASC'],
        ],
        where: { userId: req.user.id, id: req.params.id },
        include: [
          {
            model: QappDatum,
            attributes: ['questionId', 'value', 'valueId'],
            as: 'data',
          },
          {
            model: CompletedQappSection,
            attributes: ['sectionId'],
            as: 'completedSections',
          },
        ],
      });
      const updatedQapp = JSON.parse(JSON.stringify(qapp)); // clone object to update prop
      updatedQapp.completedSections = updatedQapp.completedSections.map((s) => s.sectionId); // update to array of ids
      res.send(updatedQapp);
    } catch (err) {
      res.status(400).send({
        err: 'Dashboard data unavailable.',
      });
    }
  },
  async store(req, res) {
    try {
      const question = await Question.findOne({ where: { id: 1 } });
      const error = checkFieldLength(question, req.body);
      if (error !== null) {
        res.status(400).send({ error });
        return;
      }

      const qappId = uuidv4();
      await Qapp.create({
        ...req.body,
        id: qappId,
      });
      await QappDatum.create({
        qappId,
        questionId: req.body.questionId,
        value: req.body.value,
      });
      const qappWithData = await Qapp.findOne({
        where: { userId: req.user.id, id: qappId },
        include: [
          {
            model: QappDatum,
            attributes: ['questionId', 'value', 'valueId'],
            as: 'data',
          },
        ],
      });
      res.send(qappWithData);
    } catch (err) {
      res.status(400).send({
        // this should be a string so it displays on the form
        error: err.toString(),
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
  async archive(req, res) {
    try {
      // confirm record exists with same qapp id
      const qapp = await Qapp.findOne({
        where: { id: req.body.id },
      });
      // if record exists, update, otherwise skip
      if (qapp) {
        await Qapp.update(
          {
            archived: true,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
      }
      res.redirect(303, `/api/qapps/`);
    } catch (err) {
      res.status(400).send({
        error: err.toString(),
      });
    }
  },
  async saveData(req, res) {
    try {
      const question = await Question.findOne({ where: { id: req.body.questionId } });
      const error = checkFieldLength(question, req.body);
      if (error !== null) {
        res.status(400).send({ error });
        return;
      }
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
      // redirect to return latest QAPP with data
      res.redirect(`/api/qapps/${req.body.qappId}`);
    } catch (err) {
      res.status(400).send({
        error: err.toString(),
      });
    }
  },
  async updateData(req, res) {
    try {
      Object.keys(req.body.values).forEach(async (qId) => {
        const datumFields = { qappId: req.body.qappId, questionId: qId, valueId: req.body.valueId };
        const qappDatum = await QappDatum.findOne({
          where: datumFields,
        });
        await qappDatum.update({
          ...datumFields,
          value: req.body.values[qId],
        });
      });
      // redirect to return latest QAPP with data
      res.redirect(303, `/api/qapps/${req.body.qappId}`);
    } catch (err) {
      res.status(400).send({
        error: err.toString(),
      });
    }
  },
  async deleteData(req, res) {
    try {
      await QappDatum.destroy({
        where: {
          qappId: req.body.qappId,
          valueId: { [Op.or]: req.body.valueIds },
        },
      });
      // redirect to return latest QAPP with data
      res.redirect(303, `/api/qapps/${req.body.qappId}`);
    } catch (err) {
      res.status(400).send({
        error: err.toString(),
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
        error: err.toString(),
      });
    }
  },
};
