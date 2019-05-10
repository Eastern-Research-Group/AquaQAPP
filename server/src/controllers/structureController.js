const { Project, ProjectOutline, ProjectOutlineQuestion } = require('../models');
const config = require('../config/config');

module.exports = {
  async projects(req, res) {
    try {
      const sections = await Project.findAll({
        where: { id: config.projectId },
      });
      res.send(sections);
    } catch (err) {
      res.status(400).send({
        err: `Projects data unavailable. ${err}`,
      });
    }
  },
  async sections(req, res) {
    try {
      const sections = await ProjectOutline.findAll({
        where: { projectId: config.projectId },
      });
      res.send(sections);
    } catch (err) {
      res.status(400).send({
        err: `Sections data unavailable. ${err}`,
      });
    }
  },
  async questions(req, res) {
    try {
      const questions = await ProjectOutlineQuestion.findAll({
        where: { projectId: config.projectId },
        include: [{ model: ProjectOutline, attributes: ['outlineNumber', 'outlineLabel'], as: 'outline' }],
      });
      res.send(questions);
    } catch (err) {
      res.status(400).send({
        err: 'Questions data unavailable.',
      });
    }
  },
};
