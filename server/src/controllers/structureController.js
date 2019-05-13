const { Outline, Question } = require('../models');

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
};
