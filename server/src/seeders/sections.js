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
        '<p>This screen provides information about the following topics. Click on the title in the bulleted list below to navigate directly to that section.</p><ul><li><a class="getting-started-link" href="#scope">Scope of AquaQAPP</a></li><li><a class="getting-started-link" href="#before">Before You Start</a></li><li><a class="getting-started-link" href="#navigating">Navigating AquaQAPP</a></li><li><a class="getting-started-link" href="#help">Helpful Resources</a></li><li><a class="getting-started-link" href="#data">Data Usage</a></li></ul><p><b id="scope">Scope of AquaQAPP</b></p><p>AquaQAPP is a web-based application created by the Massachusetts Bays National Estuary Partnership (MassBays) in collaboration with Massachusetts Department of Environmental Protection (MassDEP) and the United States Environmental Protection Agency (EPA), and developed by Eastern Research Group, Inc., with funding from MassDEP and EPA (EPA Grants No. OS-83941701-0 and CE-00A00621-0). AquaQAPP generates tailored Quality Assurance Project Plans (QAPPs) for marine and freshwater water quality and benthic monitoring efforts in the Commonwealth of Massachusetts and is intended to assist volunteer monitoring programs in collecting quality-assured data. AquaQAPP supports monitoring projects that incorporate:</p><ul><li>Basic water quality monitoring parameters for rivers and streams. </li><li>Basic water quality monitoring parameters for marine and estuarine waters.</li><li>Benthic monitoring and habitat assessment for wadeable rivers and streams.</li><li>Benthic monitoring and characterization in marine or estuarine waters.</li></ul><p>AquaQAPP does not currently support parameters associated with concerns such as wetlands assessment, marine debris, or toxics (e.g., heavy metals, pesticides, PCBs, PAHs). While you may use AquaQAPP to create a QAPP that includes sampling for these and other parameters, this requires incorporation of additional sections into the generated QAPP and submission to MassDEP for approval before beginning work on the project. (See Data Usage for more detail on this, below.)</p><p><b id="before">Before You Start</b></p><p>Before developing your QAPP using AquaQAPP, it will be helpful to assemble the following information:</p><ul><li>Contact information for the following personnel in the organization coordinating the monitoring project: Project Manager, QA Manager, Field Coordinator, and Data Manager.</li><li>Contact information for the individual who will serve as the primary contact for the project.</li><li>The environmental concern(s) that prompted your project.</li><li>The data quality objectives for your project.</li><li>Geographical information for each field site (either latitude and longitude or the ability to identify sites on a map)</li><li>The water type at all field sites (freshwater, estuarine/brackish, or marine).</li></ul><p><p>AquaQAPP will suggest monitoring parameters based on your environmental concern; if you already know which parameters your program will focus on, you should also have in hand:</p><ul><li>A list of parameters you plan to measure.</li><li>Instruments or equipment that will be used to measure in situ parameters.</li><li>Laboratory name(s) and information from the lab(s) regarding analytical methods that will be used for samples sent to the laboratory.</li></ul></p><p>Section 2 of the User Guide includes a complete list of items to gather before starting the application. In addition, attachments to the User Guide focus on Selecting a Laboratory, Determining your Data Quality Objectives, and Selecting Monitoring Locations.</p><b id="navigating">Navigating AquaQAPP</b></p><p>AquaQAPP functions like a wizard that uses user-provided content to generate a custom QAPP. As you proceed through the AquaQAPP screens, you will be prompted to enter information about your project.</p><p>Click on the section titles in the left-hand column to move between screens. As you add information to each screen, save your work by clicking the blue “Save” button in the upper-right corner before navigating away from the screen. Note that you need to fill out all information in pop-up windows before they can be saved.</p><p>Mark each screen as complete by clicking the “Mark as Complete” button in upper-right corner. AquaQAPP will automatically save your work when marked as complete. A green checkmark will appear next to the section title if successfully saved.</p><p>You may develop your QAPP over multiple sessions; just log in and select your QAPP in progress. When you’ve finished entering information, generate a QAPP by clicking the green “Generate QAPP” button at the top right of the screen. AquaQAPP will generate a QAPP as a Microsoft Word document. For the QAPP to be complete, you will need to edit that document to complete a few tables and ensure the details reflect your program plan. The printed QAPP will also include a cover sheet prompting you to attach relevant maps, documents, and forms. The latter are available on MassBays’ website (<a class="getting-started-link" target="_blank" href="https://edit.mass.gov/how-to/use-aquaqapp-to-plan-your-monitoring-project">https://edit.mass.gov/how-to/use-aquaqapp-to-plan-your-monitoring-project</a>).</p><p><b id="help">Helpful Resources</b></p><p>For detailed information about using AquaQAPP and guidance for selecting analytical methods, please refer to the <b>User Guide</b>.<p><b>Standard Operating Procedures</b> for sampling methods referenced in AquaQAPP are available on MassBays’ website (<a class="getting-started-link" target="_blank" href="https://edit.mass.gov/how-to/use-aquaqapp-to-plan-your-monitoring-project">https://edit.mass.gov/how-to/use-aquaqapp-to-plan-your-monitoring-project</a>). These methods have been vetted by MassDEP and EPA Region 1 and are recommended for community-based monitoring programs in Massachusetts waters.</p></p><p><b id="data">Data Usage</b></p><p>When you use AquaQAPP to document and plan for collection of quality-assured data, the generated QAPP is considered pre-approved by MassDEP and deemed acceptable by EPA, and agency review is not required prior to sampling. This pre-approval is valid so long as samples are collected and analyzed in strict accordance with the QAPP generated by the application. While the generated QAPP is provided as a Microsoft Word document to enable minor editing, it should not be significantly altered from the original output. “Not significantly altered” means that the user has not made or will not make changes to sample collection protocols, analytical methods, or other substantive content included in the generated QAPP. Where new or revised methods, additional parameters, or other substantial changes are included beyond the content generated by AquaQAPP, and a stated objective of the monitoring effort is to submit the resulting data to MassDEP, QAPP review is required prior to implementation. See the User Guide for information on submitting a modified QAPP for approval.</p><p>You might consider uploading your data to EPA’s Water Quality eXchange (WQX), to make the data available to others through online portals and viewers (for example, the How’s My Waterway application available at <a class="getting-started-link" target="_blank" href="https://www.epa.gov/waterdata/hows-my-waterway">https://www.epa.gov/waterdata/hows-my-waterway</a>).</p><p>MassBays is especially interested in any monitoring data in the coastal watersheds of Ipswich Bay, Massachusetts Bay, and Cape Cod Bay, and provides support to groups working in these areas to design and implement monitoring programs, and share data via WQX. For more, visit <a class="getting-started-link" target="_blank" href="https://www.mass.gov/service-details/monitoring-coordinators-network">https://www.mass.gov/service-details/monitoring-coordinators-network</a>.</p>',
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
        'Use the "Add" button to populate the table with information about project organization and personnel. Enter information in the pop-up window for all relevant personnel and associated organizations. You must provide contacts for the Project Manager, QA Manager, Field Coordinator, and Data Manager roles. Note that only one person can be selected as the primary contact. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.',
    });
    records.push({
      sectionNumber: '9',
      sectionLevel: '1',
      sectionLabel: 'Water Quality Concerns',
      sectionName: 'waterQualityConcerns',
      sectionSort: 5,
      instructions:
        'Check all water quality concerns motivating your project and indicate if water quality concerns differ by sampling location. If you are selecting the "General Environmental Health: Benthic" you must also select the "General Environmental Health: Physical/Chemical Water Quality" concern. See the User’s Guide for more information about this requirement.',
    });
    records.push({
      sectionNumber: '5',
      sectionLevel: '1',
      sectionLabel: 'Problem Definition',
      sectionName: 'problemDefinition',
      sectionSort: 6,
      instructions:
        'Use the following prompt to describe the environmental problem or challenge to be explored by the monitoring program.',
    });
    records.push({
      sectionNumber: '6',
      sectionLevel: '1',
      sectionLabel: 'Project Background',
      sectionName: 'projectBackground',
      sectionSort: 7,
      instructions:
        'Use the follow prompts to describe the history of the project or environmental problem and relevant previous studies.',
    });
    records.push({
      sectionNumber: '7',
      sectionLevel: '1',
      sectionLabel: 'Project Description',
      sectionName: 'projectDescription',
      sectionSort: 8,
      instructions: '',
    });
    records.push({
      sectionNumber: '8',
      sectionLevel: '1',
      sectionLabel: 'Project Schedule',
      sectionName: 'projectActivities',
      sectionSort: 9,
      instructions:
        '<p>The table below contains space to record the schedule of routine project tasks such as gathering equipment, training volunteers, conducting sampling activity, data analysis, and report writing. Your project will likely have recurring and one-time activities. To indicate repeating activities, indicate the year that activity will take place in your project plan.</p><p>Use the "Add" button to populate the table below with an activity and check the month(s) during which each activity will occur. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.</p>',
    });
    records.push({
      sectionNumber: '10',
      sectionLevel: '1',
      sectionLabel: 'Monitoring Locations',
      sectionName: 'monitoringLocations',
      sectionSort: 10,
      instructions:
        '<p>Add monitoring locations in one of two ways:</p><ul><li>Using the Map tab, click "Add Location" and then click on the field site on the map. Complete the fields in the pop-up window to provide details about each field site.</li><li>Using the List tab, click the "Add" button to add a field site. Complete the fields in the pop-up window to provide details about each field site.</li></ul><p>Monitoring locations will appear on both tabs once added. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.</p>',
    });
    records.push({
      sectionNumber: '11',
      sectionLevel: '1',
      sectionLabel: 'Parameters',
      sectionName: 'parameters',
      sectionSort: 11,
      instructions:
        '<p> Using the appropriate tab for freshwater and marine/estuarine locations, select all parameters and analytical methods you plan to measure. </p> <p> The first box displays suggested parameters based on your selected water type(s) and concern(s). The middle box contains all parameters available in AquaQAPP. To select a parameter, click on the checkbox in the same row. This will move the parameter to the “Selected” box on the right-hand side of the screen, which displays all parameters that will be included in the generated QAPP. Note that parameters are paired with analytical methods, so take care to select the appropriate combination of parameter and method for your project. </p> <p> The "Other parameters" text box at the bottom of the screen provides space to enter any parameters not listed. If your organization intends to submit data to MassDEP and you enter an "other" parameter, please note that MassDEP will need to review the generated QAPP before you can implement it. </p> <p> <b><i>If you are conducting benthic monitoring</i></b> (i.e., your concerns include “General Environmental Health: Benthic”), additional measurements are necessary to provide context for your findings. Manually select the following parameters from the lists on this page: </p> <ul> <li>For benthic sampling in wadeable streams, select temperature, conductivity, and dissolved oxygen.</li> <li> For benthic sampling in estuarine or marine waters, select sample penetration depth, sediment volume, sediment texture, temperature, salinity, and dissolved oxygen. </li> </ul> ',
    });
    records.push({
      sectionNumber: '12',
      sectionLevel: '1',
      sectionLabel: 'Parameters By Location',
      sectionName: 'parametersByLocation',
      sectionSort: 12,
      instructions:
        '<p>The table below displays all sampling locations entered on the "Monitoring Locations" screen. Click the "Edit" button in each row of interest to open a pop-up window, then use the check boxes to the left of the parameter names to indicate whether a parameter is measured at that location.</p>',
    });
    records.push({
      sectionNumber: '13',
      sectionLevel: '1',
      sectionLabel: 'Sampling Design Details',
      sectionName: 'sampleDesign',
      sectionSort: 14,
      instructions:
        '<p>The table below lists all monitoring locations and the parameters measured at each location. Add sampling design details by clicking the "Edit" button in each row of interest and completing the fields in the pop-up window.</p>',
    });
    records.push({
      sectionNumber: '14',
      sectionLevel: '1',
      sectionLabel: 'Record Handling Procedures',
      sectionName: 'recordHandling',
      sectionSort: 15,
      instructions:
        'The table below displays the five required activities related to record handling. The “Details” column contains guidance about the type of information that should be provided for each activity. Use the “Edit” button to populate the “Details” column for your monitoring project.',
    });
    records.push({
      sectionNumber: '15',
      sectionLevel: '1',
      sectionLabel: 'Sampling Design Summary',
      sectionName: 'sampleDesignSummary',
      sectionSort: 13,
      instructions: '',
    });
    records.push({
      sectionNumber: '16',
      sectionLevel: '1',
      sectionLabel: 'Data Management',
      sectionName: 'dataManagement',
      sectionSort: 16,
      instructions: 'Use the following prompts to describe the data management processes used throughout the project.',
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
