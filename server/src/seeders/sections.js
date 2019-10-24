module.exports = {
  up(queryInterface) {
    let records = [];
    records.push({
      sectionNumber: '1',
      sectionLevel: '1',
      sectionLabel: 'General Information',
      sectionName: 'generalInformation',
      sectionSort: 1,
      instructions:
        'Enter the title of your QAPP. This title will be used in the generated Word document and to identify your QAPP within AquaQAPP.',
    });
    records.push({
      sectionNumber: '2',
      sectionLevel: '1',
      sectionLabel: 'Prepared By',
      sectionName: 'preparedBy',
      sectionSort: 2,
      instructions:
        'Enter the individual and/or organization responsible for preparing this QAPP. Note that this may be different from the person inputting information to AquaQAPP.',
    });
    records.push({
      sectionNumber: '3',
      sectionLevel: '1',
      sectionLabel: 'Project Organization/Personnel',
      sectionName: 'projectOrganization',
      sectionSort: 3,
      instructions:
        'Use the "Add" button to populate the table with information about project organization and personnel. Enter information in the pop-up window for all relevant personnel and associated organizations. Select appropriate role(s) from the drop-down menu. Note that only one person can be selected as the primary contact. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.',
    });
    records.push({
      sectionNumber: '4',
      sectionLevel: '1',
      sectionLabel: 'Problem Definition',
      sectionName: 'problemDefinition',
      sectionSort: 4,
      instructions:
        'State the specific environmental problem or challenge to be investigated by your project and identify contributing factors. Provide historical and scientific perspective such as local context or prior research that informs this project.',
    });
    records.push({
      sectionNumber: '5',
      sectionLevel: '1',
      sectionLabel: 'Problem Background',
      sectionName: 'problemBackground',
      sectionSort: 5,
      instructions:
        'Explain the ways in which the problem studied by your project presents a challenge to the environment and/or human health. Describe the purpose of collecting your data and identify the organization(s) that will use it.',
    });
    records.push({
      sectionNumber: '6',
      sectionLevel: '1',
      sectionLabel: 'Project Description',
      sectionName: 'projectDescription',
      sectionSort: 6,
      instructions:
        'Describe the scope of the research and conditions that will be measured. Briefly describe the field or lab work that will be undertaken for your project and the type of data that will be collected. Explain plans for data interpretation and analysis.',
    });
    records.push({
      sectionNumber: '7',
      sectionLevel: '1',
      sectionLabel: 'Project Activities',
      sectionName: 'projectActivities',
      sectionSort: 7,
      instructions:
        'The table below contains space to record the schedule of routine project tasks such as gathering equipment, training volunteers, conducting sampling activity, data analysis, and report writing. Use the "Add" button to populate the table below with an activity and check the month(s) during which each activity will occur. Note that this calendar is set up for activities to be repeated from one year to the next. In other words, you cannot assign different years to each activity. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.',
    });
    records.push({
      sectionNumber: '8',
      sectionLevel: '1',
      sectionLabel: 'Water Quality Concerns',
      sectionName: 'waterQualityConcerns',
      sectionSort: 8,
      instructions:
        'Check all water quality concerns motivating your project and indicate if water quality concerns differ by sampling location. If you are selecting the "General Environmental Health: Benthic" you must also select the "General Environmental Health: Physical/Chemical Water Quality" concern. See the User’s Guide for more information about this requirement. Note that your generated QAPP will not receive pre-approval by Massachusetts Department of Environmental Protection if "Other" is selected.',
    });
    records.push({
      sectionNumber: '9',
      sectionLevel: '1',
      sectionLabel: 'Monitoring Locations',
      sectionName: 'monitoringLocations',
      sectionSort: 9,
      instructions:
        '<p>Add monitoring locations in one of two ways:</p><ul><li>Using the Map tab, click "Add Location" and then click on the field site on the map. Complete the fields in the pop-up window to provide details about each field site.</li><li>Using the Locations tab, click the "Add" button to add a field site. Complete the fields in the pop-up window to provide details about each field site.</li></ul><p>Monitoring locations will appear on both tabs once added. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.</p>',
    });
    records.push({
      sectionNumber: '10',
      sectionLevel: '1',
      sectionLabel: 'Parameters',
      sectionName: 'parameters',
      sectionSort: 10,
      instructions:
        '<p>Using the appropriate tab for freshwater and saltwater/brackish locations, select all parameters and analytical methods you plan to measure.</p><p>The first box below suggests a subset of parameters based on water quality concern(s) selected. The second box displays the full suite of available parameters. Note that parameters are paired with analytical methods, so take care to select the appropriate combination of parameter and method for your project. If you are measuring a parameter that is not listed, write the parameter name in the "Other" box and hit the enter key to move it to the "Selected" box. All selected parameters and methods appear in the "Selected" box to the right.</p><p>If you selected "General Environmental Health: Benthic" as a concern, you must also select temperature, conductivity or salinity, and dissolved oxygen as parameters on this screen.</p>',
    });
    records.push({
      sectionNumber: '11',
      sectionLevel: '1',
      sectionLabel: 'Sample Design',
      sectionName: 'sampleDesign',
      sectionSort: 11,
      instructions:
        '<p>Use the "Add" button to populate the table below for all parameters and methods. Complete the fields in the pop-up window. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.</p><p><b>A row is required for every parameter selected. If a parameter is removed on the Parameters section make sure to remove its respective row in order to mark complete.</b></p>',
    });
    records.push({
      sectionNumber: '12',
      sectionLevel: '1',
      sectionLabel: 'Record Handling Procedures',
      sectionName: 'recordHandling',
      sectionSort: 12,
      instructions:
        'Use the "Add" button to populate the table below. In the pop-up window, identify each step involved in record and data handling, and describe the procedures that will be followed. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.',
    });
    records.push({
      sectionNumber: '13',
      sectionLevel: '1',
      sectionLabel: 'Secondary Data',
      sectionName: 'secondaryData',
      sectionSort: 13,
      instructions:
        'Use the "Add" button to populate the table below with any secondary or external data sources consulted while planning this project. Complete the fields in the pop-up window for each secondary data source.',
    });
    // manually set ids so they always start at 1 (section ids are used when marking complete so must be consistent)
    records = records.map((record, index) => ({
      ...record,
      id: index + 1,
    }));
    return queryInterface.bulkInsert('Sections', records);
  },

  down: (queryInterface) => queryInterface.bulkDelete('Sections', null, {}),
};
