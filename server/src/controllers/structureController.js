const { Outline, Question, refConcerns } = require('../models');

module.exports = {
  async sections(req, res) {
    try {
      const sections = await Outline.findAll({});
      res.send(sections);
    } catch (err) {
      res.status(400).send({
        err: `Sections data unavailable. ${err}`,
      });
    }
  },
  async questions(req, res) {
    try {
      const questions = await Question.findAll({
        include: [{ model: Outline, attributes: ['outlineNumber', 'outlineLabel'], as: 'outline' }],
      });
      res.send(questions);
    } catch (err) {
      res.status(400).send({
        err: 'Questions data unavailable.',
      });
    }
  },
  async concerns(req, res) {
    try {
      const concerns = await refConcerns.findAll({});
      res.send(concerns);
    } catch (err) {
      res.status(400).send({
        err: 'Questions data unavailable.',
      });
    }
  },
  // TODO: maybe move to qappController?
  async completedSections(req, res) {
    try {
      // TODO: confirm user has access to this QAPP first?
      const sections = await QappOutline.findAll({
        where: { qappId: req.params.id },
      });
      res.send(sections);
    } catch (err) {
      res.status(400).send({
        err: `Data unavailable. ${err}`,
      });
    }
  },
};
