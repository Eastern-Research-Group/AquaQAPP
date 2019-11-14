module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      code: 'PM',
      label: 'Project Manager',
      responsibilities: 'Overall management of administrative and technical work of the monitoring program.',
    });
    records.push({
      code: 'QAM',
      label: 'QA Manager',
      responsibilities:
        'Review of procedures and data generated including reports to ensure adherence to QAPP. Reports any problems to the Project Manager, and works with Project Manager to document and correct any deviations.',
    });
    records.push({
      code: 'FC',
      label: 'Field Coordinator',
      responsibilities:
        'Planning and coordination of all field monitoring. Includes technical oversight, preparation of field equipment, volunteer assignments and scheduling. Receives samples and delivers to the lab. Oversees proper sample handling/ preservation and chain of custody forms.',
    });
    records.push({
      code: 'DM',
      label: 'Data Manager',
      responsibilities: 'Data collection, management, analysis and interpretation.',
    });
    return queryInterface.bulkInsert('RefRoles', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefRoles', null, {}),
};
