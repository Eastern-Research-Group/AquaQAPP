const path = require('path');
const { wqxXmlToJson } = require('../utils/jsonHelpers');

module.exports = {
  up: (queryInterface) => {
    const json = wqxXmlToJson(path.resolve(__dirname, './data/MonitoringLocationType.xml'));
    return queryInterface.bulkInsert('RefWaterTypes', json);
  },
};
