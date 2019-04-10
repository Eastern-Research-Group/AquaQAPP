const { ProjectOutline, ProjectOutlineQuestion } = require('../models');
const config = require('../config/config');

module.exports = {
  async sections(req, res) {
    try {
      const sections = await ProjectOutline.findAll({
        where: { projectId: config.projectId },
      });
      res.send(sections);
    } catch (err) {
      res.status(400).send({
        err: 'Sections data unavailable. ' + err,
      });
    }
  },
  async questions(req, res) {
    try {
      const questions = await ProjectOutlineQuestion.findAll({
        where: { projectId: config.projectId },
      });
      res.send(questions);
    } catch (err) {
      res.status(400).send({
        err: 'Questions data unavailable.',
      });
    }
  },
};
