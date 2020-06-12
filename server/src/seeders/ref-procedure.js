module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      activity: 'Document Control',
      placeholder: 'Indicate where records (forms) will be stored and the length of time they will be retained.',
      procedureSort: 1,
    });
    records.push({
      activity: 'Data Generation',
      placeholder: 'Summarize records that will be produced – field, lab, and/or assessment.',
      procedureSort: 2,
    });
    records.push({
      activity: 'Data Quality Report',
      placeholder:
        'Describe final project QAPP including attachments and corrective actions, documentation of any substantive changes made to the AquaQAPP-generated QAPP, formatted data, data evaluation summary.',
      procedureSort: 3,
    });
    records.push({
      activity: 'Reporting Format',
      placeholder: 'Identify the file type(s) that will be used to deliver data to users (e.g., *.csv, *.xml, *.kml).',
      procedureSort: 4,
    });
    records.push({
      activity: 'Records Storage',
      placeholder: 'Location of digital data storage (e.g., EPA’s Water Quality Exchange (WQX) database).',
      procedureSort: 5,
    });
    return queryInterface.bulkInsert('RefProcedures', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefProcedures', null, {}),
};
