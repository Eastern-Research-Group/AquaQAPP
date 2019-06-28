const path = require('path');
const { wqxXmlToJson } = require('../utils/jsonHelpers');

module.exports = {
  up: (queryInterface) => {
    const json = wqxXmlToJson(path.resolve(__dirname, './data/MonitoringLocationType.xml'));
    return queryInterface.bulkInsert('RefLocationTypes', json);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefLocationTypes', null, {}),
};
