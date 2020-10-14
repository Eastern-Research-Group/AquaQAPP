module.exports = {
  up: (queryInterface) => {
    const records = [];
    records.push({
      activity: 'Document Control',
      placeholder: 'Indicate where records (forms) will be stored and the length of time they will be retained.',
      detailsLabel:
        'Indicate who is responsible for records handling, maintaining project files, and ensuring that the most current forms, QAPP, and operating procedures are in use.',
      procedureSort: 1,
    });
    records.push({
      activity: 'Data Generation',
      placeholder: 'Summarize records that will be produced – field, lab, and/or assessment.',
      detailsLabel:
        'List records that will be produced – field, lab, and/or assessment – and who is responsible for producing those records. Indicate which records will be maintained in the project files.',
      procedureSort: 2,
    });
    records.push({
      activity: 'Data Quality Report',
      placeholder:
        'Describe final project QAPP including attachments and corrective actions, documentation of any substantive changes made to the AquaQAPP-generated QAPP, formatted data, data evaluation summary.',
      detailsLabel:
        'Describe the package that will be submitted to MassDEP to support your data’s use by the agency. Indicate who will conduct data valuation and comparisons to your Data Quality Objective, and the components they will use to make this determination. The package should include the QAPP with any attachments (and documentation of substantive changes to the AquaQAPP-generated QAPP), Corrective Action Reporting Form, formatted data, and data evaluation summary.',
      procedureSort: 3,
    });
    records.push({
      activity: 'Reporting Format',
      placeholder: 'Identify the file type(s) that will be used to deliver data to users (e.g., *.csv, *.xml, *.kml).',
      detailsLabel: 'Details',
      procedureSort: 4,
    });
    records.push({
      activity: 'Records Storage',
      placeholder: 'Location of digital data storage (e.g., EPA’s Water Quality Exchange (WQX) database).',
      detailsLabel: 'Indicate where completed forms will be stored, and the length of time they will be retained.',
      procedureSort: 5,
    });
    return queryInterface.bulkInsert('RefProcedures', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('RefProcedures', null, {}),
};
