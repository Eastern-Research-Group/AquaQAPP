module.exports = {
  up(queryInterface) {
    let records = [];
    records.push({
      sectionNumber: '1',
      sectionLevel: '1',
      sectionLabel: 'Getting Started',
      sectionName: 'gettingStarted',
      sectionSort: 1,
      instructions:
        '<p>This screen provides information about the following:</p><ul><li>Scope of AquaQAPP</li><li>Before You Start</li><li>Navigating AquaQAPP</li><li>Helpful Resources</li><li>Data Usage by the Massachusetts Department of Environmental Protection (MassDEP) and U.S. Environmental Protection Agency (EPA), Region 1</li></ul><p><b>Scope of AquaQAPP</b></p><p>AquaQAPP is a web-based application created by the Massachusetts Bays National Estuary Partnership (MassBays) and developed by Eastern Research Group, with funding from the EPA (EPA Grant No. OS-83941701-0). AquaQAPP generates tailored Quality Assurance Project Plans (QAPPs) for marine and freshwater water quality and benthic monitoring efforts and is intended to assist volunteer monitoring programs in collecting quality-assured data. AquaQAPP supports monitoring projects that incorporate:</p><ul><li>Basic water quality monitoring parameters for rivers and streams.</li><li>Basic water quality monitoring parameters for marine and estuarine waters.</li><li>Benthic monitoring and habitat assessment for wadeable rivers and streams.</li><li>Benthic monitoring and characterization in marine or estuarine waters.</li></ul><p>Examples of parameters and concerns outside the scope of AquaQAPP include wetlands assessment, marine debris, and toxics (e.g., heavy metals, pesticides, PCBs, PAHs). While you may use AquaQAPP to create a QAPP that includes sampling for these and other parameters, you must identify and provide data quality objectives and method descriptions for any parameters not already listed in AquaQAPP. AquaQAPP output is a Microsoft Word document that can be amended with additional parameters or methods (see Data Usage by the MassDEP and EPA Region 1, below).</p><p><b>Before You Start</b></p><p>Before developing your QAPP using AquaQAPP, it will be helpful to assemble the following information:</p><ul><li>Contact information for relevant personnel in the organization coordinating the monitoring project.</li><li>Geographical information for each field site (either latitude and longitude or the ability to identify sites on a map).</li><li>The environmental concern(s) that prompted your project.</li><li>Optionally, a list of parameters you plan to measure. AquaQAPP will provide suggested parameters that can be adjusted if need be.</li></ul><p><b>Navigating AquaQAPP</b></p><p>Click on the section titles in the left-hand column to move between screens. Mark each section as complete by clicking the “Mark as Complete” button in the top right of each screen. A green checkmark will appear next to the section title if successfully saved.</p><p>Save your work by clicking the blue “Save” button at the top left of each screen before navigating away from the screen. AquaQAPP will automatically save your work when marked as complete.</p><p>You may develop your QAPP over multiple sessions; just log in and select your QAPP in progress. When you’ve finished entering information, generate a QAPP by clicking the green “Generate QAPP” button at the top right of the screen.</p><p><b>Helpful Resources</b></p><p>For detailed information about using AquaQAPP, and guidance for selecting monitoring methods, please refer to the User Guide.</p><p><b>Data Usage by the MassDEP and EPA Region 1</b></p><p>When you use AquaQAPP to document and plan for collection of quality-assured data, the generated QAPP is considered pre-approved by MassDEP and deemed acceptable by EPA, and additional agency review is not required prior to sampling. This pre-approval is valid so long as samples are collected and analyzed in strict accordance with the QAPP generated by the application. While the generated QAPP is provided as a Microsoft Word document to enable minor editing, it should not be significantly altered from the original output. “Not significantly altered” means that the user has not made or will not make changes to sample collection protocols, analytical methods, or other substantive content included in the generated QAPP.  Where new or revised methods, additional parameters, or other substantial changes are included beyond the content generated by AquaQAPP, and a stated objective of the monitoring effort is to submit the resulting data to MassDEP, QAPP review is required prior to implementation.</p>',
    });
    records.push({
      sectionNumber: '2',
      sectionLevel: '1',
      sectionLabel: 'General Information',
      sectionName: 'generalInformation',
      sectionSort: 2,
      instructions:
        'Enter the title of your QAPP. This title will be used in the generated Word document and to identify your QAPP within AquaQAPP.',
    });
    records.push({
      sectionNumber: '3',
      sectionLevel: '1',
      sectionLabel: 'Prepared By',
      sectionName: 'preparedBy',
      sectionSort: 3,
      instructions:
        'Enter the name and organizational affiliation of the person responsible for preparing the QAPP. Note that this may be different from the person inputting information to AquaQAPP.',
    });
    records.push({
      sectionNumber: '4',
      sectionLevel: '1',
      sectionLabel: 'Project Organization/Personnel',
      sectionName: 'projectOrganization',
      sectionSort: 4,
      instructions:
        'Use the "Add" button to populate the table with information about project organization and personnel. Enter information in the pop-up window for all relevant personnel and associated organizations. Select appropriate role(s) from the drop-down menu. Note that only one person can be selected as the primary contact. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.',
    });
    records.push({
      sectionNumber: '5',
      sectionLevel: '1',
      sectionLabel: 'Problem Definition',
      sectionName: 'problemDefinition',
      sectionSort: 5,
      instructions:
        'State the specific environmental problem, question, or threat to be investigated, and why the work needs to be done. Explain the ways in which the problem studied by your project presents a challenge to the environment and/or human health. Describe the purpose of collecting your data and identify the organization(s) that will use it.',
    });
    records.push({
      sectionNumber: '6',
      sectionLevel: '1',
      sectionLabel: 'Project Background',
      sectionName: 'projectBackground',
      sectionSort: 6,
      instructions:
        'Describe the history of the project or environmental problem, relevant previous studies, and how this project fills a data gap or complements existing information. If the project is related to other ongoing projects, it is important to show how and why it is related. Reference papers or studies that inspired your project, and describe any collaboration planned with others conducting related research or monitoring.',
    });
    records.push({
      sectionNumber: '7',
      sectionLevel: '1',
      sectionLabel: 'Project Description',
      sectionName: 'projectDescription',
      sectionSort: 7,
      instructions:
        'Describe the scope of the research and conditions that will be measured. Briefly describe the field or lab work that will be undertaken for your project and the type of data that will be collected. Explain how your data will be used, including plans for data interpretation and analysis.',
    });
    records.push({
      sectionNumber: '8',
      sectionLevel: '1',
      sectionLabel: 'Project Activities',
      sectionName: 'projectActivities',
      sectionSort: 8,
      instructions:
        'The table below contains space to record the schedule of routine project tasks such as gathering equipment, training volunteers, conducting sampling activity, data analysis, and report writing. Use the "Add" button to populate the table below with an activity and check the month(s) during which each activity will occur. Note that this calendar is set up for activities to be repeated from one year to the next. In other words, you cannot assign different years to each activity. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.',
    });
    records.push({
      sectionNumber: '9',
      sectionLevel: '1',
      sectionLabel: 'Water Quality Concerns',
      sectionName: 'waterQualityConcerns',
      sectionSort: 9,
      instructions:
        'Check all water quality concerns motivating your project and indicate if water quality concerns differ by sampling location. If you are selecting the "General Environmental Health: Benthic" you must also select the "General Environmental Health: Physical/Chemical Water Quality" concern. See the User’s Guide for more information about this requirement. Note that your generated QAPP will not receive pre-approval by Massachusetts Department of Environmental Protection if "Other" is selected.',
    });
    records.push({
      sectionNumber: '10',
      sectionLevel: '1',
      sectionLabel: 'Monitoring Locations',
      sectionName: 'monitoringLocations',
      sectionSort: 10,
      instructions:
        '<p>Add monitoring locations in one of two ways:</p><ul><li>Using the Map tab, click "Add Location" and then click on the field site on the map. Complete the fields in the pop-up window to provide details about each field site.</li><li>Using the Locations tab, click the "Add" button to add a field site. Complete the fields in the pop-up window to provide details about each field site.</li></ul><p>Monitoring locations will appear on both tabs once added. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.</p>',
    });
    records.push({
      sectionNumber: '11',
      sectionLevel: '1',
      sectionLabel: 'Parameters',
      sectionName: 'parameters',
      sectionSort: 11,
      instructions:
        '<p>Using the appropriate tab for freshwater and marine/estuarine locations, select all parameters and analytical methods you plan to measure.</p><p>The first box below suggests a subset of parameters based on water quality concern(s) selected. The second box displays the full suite of available parameters. Note that parameters are paired with analytical methods, so take care to select the appropriate combination of parameter and method for your project. If you are measuring a parameter that is not listed, write the parameter name in the "Other Parameters" box and hit "Add" to move it to the "Selected" box. All selected parameters and methods appear in the “Selected” box to the right.</p><ul><li>If you selected “General Environmental Health: Benthic” as a concern, you must also select temperature, conductivity or salinity, and dissolved oxygen as parameters on this screen.</li><li>If you selected “General Environmental Health: Benthic” and your location is marine, you must also select grab sample volume, sample penetration depth, and sediment texture as parameters on this screen.</li></ul>',
    });
    records.push({
      sectionNumber: '12',
      sectionLevel: '1',
      sectionLabel: 'Parameters By Location',
      sectionName: 'parametersByLocation',
      sectionSort: 12,
      instructions:
        '<p>The table below displays all sampling locations entered on the “Monitoring Locations” screen. Edit or delete existing rows of information by clicking the “Edit” or “Delete” buttons in each row of interest.</p><p>In the pop-up window, use the check boxes to the left of the parameter names to indicate whether a parameter is measured at that location. Indicate the site location rationale and frequency of sampling.</p>',
    });
    records.push({
      sectionNumber: '13',
      sectionLevel: '1',
      sectionLabel: 'Sampling Design',
      sectionName: 'sampleDesign',
      sectionSort: 13,
      instructions:
        '<p>Use the "Add" button to populate the table below for all parameters and methods. Complete the fields in the pop-up window. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.</p><p><b>A row is required for every parameter selected. If a parameter is removed on the Parameters section make sure to remove its respective row in order to mark complete.</b></p>',
    });
    records.push({
      sectionNumber: '14',
      sectionLevel: '1',
      sectionLabel: 'Record Handling Procedures',
      sectionName: 'recordHandling',
      sectionSort: 14,
      instructions:
        'The table below displays the five required activities related to record handling. The “Details” column contains guidance about the type of information that should be provided for each activity. Use the “Edit” button to populate the “Details” column for your monitoring project.',
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
