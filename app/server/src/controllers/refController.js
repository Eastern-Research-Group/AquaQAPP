const { Op } = require('sequelize');
const {
  RefConcern,
  RefRole,
  RefLocationType,
  RefHorizontalCollectionMethod,
  RefHorizontalCoordRefSystem,
  RefParameter,
  RefProcedure,
} = require('../models');

module.exports = {
  async concerns(req, res) {
    try {
      const concerns = await RefConcern.findAll({
        order: [['concernSort', 'ASC']],
        include: [
          {
            model: RefParameter,
            attributes: ['id', 'label'],
            as: 'parameters',
          },
        ],
        where: {
          code: {
            [Op.not]: 'ACID',
          },
        },
      });
      res.send(concerns);
    } catch (err) {
      res.status(400).send({
        err: err.toString(),
      });
    }
  },
  async roles(req, res) {
    try {
      const roles = await RefRole.findAll({});
      res.send(roles);
    } catch (err) {
      res.status(400).send({
        err: 'Data unavailable.',
      });
    }
  },
  async locationTypes(req, res) {
    try {
      const refs = await RefLocationType.findAll({});
      res.send(refs);
    } catch (err) {
      res.status(400).send({
        err: 'Data unavailable.',
      });
    }
  },
  async collectionMethods(req, res) {
    try {
      const refs = await RefHorizontalCollectionMethod.findAll({});
      res.send(refs);
    } catch (err) {
      res.status(400).send({
        err: 'Data unavailable.',
      });
    }
  },
  async coordRefSystems(req, res) {
    try {
      const refs = await RefHorizontalCoordRefSystem.findAll({});
      res.send(refs);
    } catch (err) {
      res.status(400).send({
        err: 'Data unavailable.',
      });
    }
  },
  async parameters(req, res) {
    try {
      const params = await RefParameter.findAll({
        include: [
          {
            model: RefConcern,
            attributes: ['id', 'code'],
            as: 'concerns',
          },
        ],
      });
      res.send(params);
    } catch (err) {
      res.status(400).send({
        err: 'Data unavailable.',
      });
    }
  },
  async procedures(req, res) {
    try {
      const procedures = await RefProcedure.findAll({
        order: [['procedureSort', 'ASC']],
      });
      res.send(procedures);
    } catch (err) {
      res.status(400).send({
        err: 'Data unavailable.',
      });
    }
  },
};
