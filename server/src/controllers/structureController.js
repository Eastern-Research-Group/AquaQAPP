const { Section, Question, Example } = require('../models');

module.exports = {
  async sections(req, res) {
    try {
      const sections = await Section.findAll({});
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
        include: [
          { model: Section, attributes: ['sectionNumber', 'sectionLabel'], as: 'section' },
          { model: Example, attributes: ['text'], as: 'examples' },
        ],
      });
      res.send(questions);
    } catch (err) {
      res.status(400).send({
        err: 'Questions data unavailable.',
      });
    }
  },
};
