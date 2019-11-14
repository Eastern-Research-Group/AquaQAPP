const path = require('path');
const { csvToJson } = require('../utils/jsonHelpers');
const concerns = require('./data/concerns').default;

module.exports = {
  up: async (queryInterface) => {
    const paramsByWaterType = await csvToJson(path.resolve(__dirname, './data/ParamsByWaterType.csv'));
    await queryInterface.bulkInsert('RefParameters', paramsByWaterType);

    // Need to wait for all sequelize promises to complete before finishing seed (required because of forEach loop)
    const promises = [];

    // Update param rows to populate param data from separate CSV
    const paramData = await csvToJson(path.resolve(__dirname, './data/ParamData.csv'));
    paramData.forEach((row) => {
      promises.push(queryInterface.bulkUpdate('RefParameters', row, { label: row.label }));
    });

    // Populate parameter-concern many-to-many relationship table
    const paramConcerns = await csvToJson(path.resolve(__dirname, './data/ParamConcerns.csv'));
    paramConcerns.forEach((row) => {
      const concernId = concerns.find((c) => c.label === row.concern).id;
      const paramId = paramsByWaterType.find((p) => p.label === row.label).id;
      promises.push(
        queryInterface.bulkInsert('RefParameterConcerns', [{ refConcernId: concernId, refParameterId: paramId }])
      );
    });

    return Promise.all(promises);
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('RefParameterConcerns', null, {});
    return queryInterface.bulkDelete('RefParameters', null, {});
  },
};
