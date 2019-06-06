const {
  RefConcern,
  RefLocationType,
  RefHorizontalCollectionMethod,
  RefHorizontalCoordRefSystem,
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
};
