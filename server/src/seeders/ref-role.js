module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      code: 'PM',
      label: 'Project Manager',
    });
    records.push({
      code: 'QAM',
      label: 'QA Manager',
    });
    records.push({
      code: 'FC',
      label: 'Field Coordinator',
    });
    records.push({
      code: 'DM',
      label: 'Data Manager',
    });
    return queryInterface.bulkInsert('RefRoles', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefRoles', null, {}),
};
