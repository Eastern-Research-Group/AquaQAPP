const {
  Crosswalk,
  RefConcern,
  RefRole,
  RefLocationType,
  RefHorizontalCollectionMethod,
  RefHorizontalCoordRefSystem,
  RefParameter,
} = require('../models');

module.exports = {
  async concerns(req, res) {
    try {
      const concerns = await RefConcern.findAll({});
      res.send(concerns);
    } catch (err) {
      res.status(400).send({
        err: 'Data unavailable.',
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
      const params = await RefParameter.findAll({});
      res.send(params);
    } catch (err) {
      res.status(400).send({
        err: 'Data unavailable.',
      });
    }
  },
  async crosswalks(req, res) {
    try {
      const refs = await Crosswalk.findAll({});
      res.send(refs);
    } catch (err) {
      res.status(400).send({
        err: 'Data unavailable.',
      });
    }
  },
};
