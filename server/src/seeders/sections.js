module.exports = {
  up(queryInterface) {
    let records = [];
    records.push({
      sectionNumber: '1',
      sectionLevel: '1',
      sectionLabel: 'Getting Started',
      sectionName: 'gettingStarted',
      sectionSort: 1,
      instructions: `
        <div class="getting-started">
          <p id="gettingStarted">
            This screen provides information about the following topics. Click on the title in the bulleted list below to
            navigate directly to that section.
          </p>
          <ul>
            <li><a class="getting-started-link" href="#scope">Scope of AquaQAPP</a></li>
            <li><a class="getting-started-link" href="#before">Before You Start</a></li>
            <li><a class="getting-started-link" href="#navigating">Navigating AquaQAPP</a></li>
            <li><a class="getting-started-link" href="#help">Helpful Resources</a></li>
            <li><a class="getting-started-link" href="#data">Data Usage</a></li>
          </ul>
          <p><strong id="scope">Scope of AquaQAPP</strong></p>
          <p>
            AquaQAPP is a web-based application created by the Massachusetts Bays National Estuary Partnership (MassBays) in
            collaboration with Massachusetts Department of Environmental Protection (MassDEP) and the United States
            Environmental Protection Agency (EPA), and developed by Eastern Research Group, Inc., with funding from MassDEP
            and EPA (EPA Grants No. OS-83941701-0 and CE-00A00621-0). AquaQAPP generates tailored Quality Assurance Project
            Plans (QAPPs) for marine and freshwater water quality and benthic monitoring efforts in the Commonwealth of
            Massachusetts and is intended to assist volunteer monitoring programs in collecting quality-assured data. AquaQAPP
            may be used for projects set outside of Massachusetts; we suggest consulting with your state’s agency for guidance
            on approval of the generated QAPP. AquaQAPP supports monitoring projects that incorporate:
          </p>
          <ul>
            <li>Basic water quality monitoring parameters for rivers and streams.</li>
            <li>Basic water quality monitoring parameters for marine and estuarine waters.</li>
            <li>Benthic invertebrates and sediment analysis for wadeable rivers and streams.</li>
            <li>Benthic invertebrates and sediment characterization in marine or estuarine waters.</li>
          </ul>
          <p>
            AquaQAPP uses the following USGS salinity-based definitions to distinguish among the three water types: fresh
            water is less than 1,000 ppm, estuarine waters range from 1,000 ppm 30,000 ppm, and marine water contains more
            than 30,000 ppm dissolved salts.
          </p>
          <p>
            AquaQAPP does not currently support parameters associated with concerns such as wetlands assessment, marine
            debris, contaminants of emerging concern, or toxics (e.g., heavy metals, pesticides, PCBs, PAHs). While you may
            use AquaQAPP to create a QAPP that includes sampling for these and other parameters, this requires incorporation
            of additional sections into the generated QAPP and submission to MassDEP for approval before beginning work on the
            project. (See Data Usage for more detail on this, below.)
          </p>
          <a href="#gettingStarted" class="top-of-page"><span class="fa fa-arrow-up"></span>Back to top</a>
          <p><strong id="before">Before You Start</strong></p>
          <p>
            Before developing your QAPP using AquaQAPP, you might want to review the User Guide. It will also be helpful to
            assemble the following information:
          </p>
          <ul>
            <li>
              Contact information for the following personnel in the organization coordinating the monitoring project: Project
              Manager, QA Manager, Field Coordinator, Data Manager, and Laboratory Manager.
            </li>
            <li>Contact information for the individual who will serve as the primary contact for the project.</li>
            <li>The environmental concern(s) that prompted your project.</li>
            <li>The data quality objectives for your project.</li>
            <li>
              Geographical information for each field site (either latitude and longitude or the ability to identify sites on
              a map).
            </li>
            <li>The water type at all field sites (freshwater, estuarine/brackish, or marine).</li>
          </ul>
          <div>
          <p>
            AquaQAPP will suggest monitoring parameters based on your environmental concern; if you already know which
            parameters your program will focus on, you should also have in hand:
          </p>
          <ul>
            <li>A list of parameters you plan to measure.</li>
            <li>Instruments or equipment that will be used to measure in situ parameters.</li>
            <li>
              Laboratory name(s) and information from the lab(s) regarding analytical methods that will be used for samples
              sent to the laboratory.
            </li>
          </ul>
          <p>
            Section 2 of the User Guide includes a complete list of items to gather before starting the application. In
            addition, attachments to the User Guide focus on Selecting a Laboratory, Determining your Data Quality Objectives,
            and Selecting Monitoring Locations.
          </p>
          <a href="#gettingStarted" class="top-of-page"><span class="fa fa-arrow-up"></span>Back to top</a>
          <strong id="navigating">Navigating AquaQAPP</strong>
          <p>
            AquaQAPP functions like a wizard that uses user-provided content to generate a custom QAPP. As you proceed through
            the AquaQAPP screens, you will be prompted to enter information about your project.
          </p>
          <p>
            Click on the section titles in the left-hand column to move between screens. As you add information to each
            screen, save your work by clicking the blue “Save” button in the upper-right corner before navigating away from
            the screen. Note that you need to fill out all information in pop-up windows before they can be saved. Screens do
            not need to be completed in order. You may decide to edit your entries on the Project Description screen after
            completing the Parameters screen, for example.
          </p>
          <p>
            Mark each screen as complete by clicking the “Mark as Complete” button in upper-right corner. AquaQAPP will
            automatically save your work when marked as complete. A green checkmark will appear next to the section title if
            successfully saved.
          </p>
          <p>
            You may develop your QAPP over multiple sessions; just log in and select your QAPP in progress. When you’ve
            finished entering information, generate a QAPP by clicking the green “Generate QAPP” button at the top right of
            the screen. AquaQAPP will generate a QAPP as a Microsoft Word document. For the QAPP to be complete, you will need
            to edit that document to complete a few tables and ensure the details reflect your program plan. The printed QAPP
            will also include a cover sheet prompting you to attach relevant maps, documents, and forms. The latter are
            available on MassBays’ website (<a
              class="getting-started-link"
              target="_blank"
              href="https://mass.gov/how-to/use-aquaqapp-to-plan-your-monitoring-project"
              >https://mass.gov/how-to/use-aquaqapp-to-plan-your-monitoring-project</a
            >).
          </p>
          <a href="#gettingStarted" class="top-of-page"><span class="fa fa-arrow-up"></span>Back to top</a>
          <p><strong id="help">Helpful Resources</strong></p>
          <p>
            The following resources are available on MassBays' website at <a
              class="getting-started-link"
              target="_blank"
              href="https://mass.gov/how-to/use-aquaqapp-to-plan-your-monitoring-project"
              >https://mass.gov/how-to/use-aquaqapp-to-plan-your-monitoring-project</a
            >:
          </p>
          <ul>
            <li>
              <strong>AquaQAPP User Guide</strong> includes details and tips for each screen in AquaQAPP, as well as guidance
              for selecting analytical methods, screening testing laboratories, and developing Data Quality Objectives. It is
              also available from within AquaQAPP via the link in the top navigation bar.
            </li>
            <li>
              <strong>Standard Operating Procedures and Field Operations</strong> for all sampling methods referenced in AquaQAPP.
              These methods have been vetted by MassDEP and EPA Region 1 and are recommended for community-based monitoring programs
              in Massachusetts waters.
            </li>
            <li>
              <strong>Templates for forms</strong> referenced in the final QAPP are available as separate tabs in an Excel
              workbook. You will need to edit the templates to match your program needs. The generated QAPP will prompt you
              to attach relevant forms to your final QAPP.
            </li>
          </ul>
          <a href="#gettingStarted" class="top-of-page"><span class="fa fa-arrow-up"></span>Back to top</a>
          <p><strong id="data">Data Usage</strong></p>
          <p>
            When you use AquaQAPP to document and plan for collection of quality-assured data, the generated QAPP is
            considered pre-approved by MassDEP and deemed acceptable by EPA, and agency review is not required prior to
            sampling. This pre-approval is valid so long as samples are collected and analyzed in strict accordance with the
            QAPP generated by the application. While the generated QAPP is provided as a Microsoft Word document to enable
            minor editing, it should not be significantly altered from the original output. “Not significantly altered” means
            that the user has not made or will not make changes to sample collection protocols, analytical methods, or other
            substantive content included in the generated QAPP. Where new or revised methods, additional parameters, or other
            substantial changes are included beyond the content generated by AquaQAPP, and a stated objective of the
            monitoring effort is to submit the resulting data to MassDEP, QAPP review is required prior to implementation. See
            the User Guide for information on submitting a modified QAPP for approval.
          </p>
          <p>
            You might consider uploading your data to EPA’s Water Quality eXchange (WQX), to make the data available to others
            through online portals and viewers (for example, the How’s My Waterway application available at
            <a class="getting-started-link" target="_blank" href="https://www.epa.gov/waterdata/hows-my-waterway"
              >https://www.epa.gov/waterdata/hows-my-waterway</a
            >). You can learn more about WQX at
            <a href="https://www.epa.gov/waterdata/water-quality-data-upload-wqx">
              https://www.epa.gov/waterdata/water-quality-data-upload-wqx
            </a>.
          </p>
          <p>
            MassBays is especially interested in any monitoring data in the coastal watersheds of Ipswich Bay, Massachusetts
            Bay, and Cape Cod Bay, and provides support to groups working in these areas to design and implement monitoring
            programs, and share data via WQX. For more, visit
            <a
              class="getting-started-link"
              target="_blank"
              href="https://www.mass.gov/service-details/monitoring-coordinators-network"
              >https://www.mass.gov/service-details/monitoring-coordinators-network</a
            >.
          </p>
          <a href="#gettingStarted" class="top-of-page"><span class="fa fa-arrow-up"></span>Back to top</a>
        </div>
      `,
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
        'Use the "Add" button to populate the table with information about project organization and personnel. Enter information in the pop-up window for all relevant personnel and associated organizations. You must provide names and contact information for the Project Manager, QA Manager, Field Coordinator, Data Manager, and Laboratory Manager roles. The same person may fill more than one role; only one person can serve as the primary contact. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.',
    });
    records.push({
      sectionNumber: '9',
      sectionLevel: '1',
      sectionLabel: 'Water Quality Concerns',
      sectionName: 'waterQualityConcerns',
      sectionSort: 5,
      instructions:
        '<p>Check all water quality concerns motivating your project and indicate if water quality concerns differ by sampling location. Hover over each box below to see a description of the concern. AquaQAPP will suggest parameters based on the concerns you select here; you will also have the opportunity to select additional monitoring parameters on the Parameters screen.</p><p>If you are selecting the "General Environmental Health: Benthic," AquaQAPP will automatically select the "General Environmental Health: Physical/Chemical Water Quality" concern, per MassDEP requirements.</p>',
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
        'Use the following prompts to describe the history of the project or environmental problem and relevant previous studies.',
    });
    records.push({
      sectionNumber: '7',
      sectionLevel: '1',
      sectionLabel: 'Project Description',
      sectionName: 'projectDescription',
      sectionSort: 8,
      instructions:
        'Use the following prompts to describe the work to be performed, the type of data you plan to collect, the methods to be used to collect the data, and the decisions you plan to make based on those data.',
    });
    records.push({
      sectionNumber: '8',
      sectionLevel: '1',
      sectionLabel: 'Project Schedule',
      sectionName: 'projectActivities',
      sectionSort: 9,
      instructions:
        '<p>The table below contains space to record the schedule of routine project tasks such as gathering equipment, training volunteers, conducting sampling activity, analyzing data, and writing reports. Your project will likely have recurring and one-time activities. To indicate repeating activities, indicate the year that activity will take place in your project plan.</p><p>Use the "Add" button to populate the table below with an activity and check the month(s) during which each activity will occur. Edit or delete existing rows of information by clicking the "Edit" or "Delete" buttons in each row of interest.</p>',
    });
    records.push({
      sectionNumber: '10',
      sectionLevel: '1',
      sectionLabel: 'Monitoring Locations',
      sectionName: 'monitoringLocations',
      sectionSort: 10,
      instructions:
        '<p>Add monitoring locations in one of two ways:</p><ul><li>Using the Map tab, click "Add Location" and then click on the field site on the map. Complete the fields in the pop-up window to provide details about each field site.</li><li>Using the List tab, click the "Add" button to add a field site. Complete the fields in the pop-up window to provide details about each field site.</li></ul><p>Monitoring locations will appear on both tabs once added. Edit or delete existing rows of information by clicking the “Edit” or “Delete” buttons in each row of interest on the List tab.</p>',
    });
    records.push({
      sectionNumber: '11',
      sectionLevel: '1',
      sectionLabel: 'Parameters',
      sectionName: 'parameters',
      sectionSort: 11,
      instructions: `
        <p>
          Using the appropriate tab for freshwater and marine/estuarine locations, select all parameters you plan to measure.
        </p>
        <p>
          The first box displays suggested parameters based on your selected water type(s) and concern(s). The middle box
          contains all parameters available in AquaQAPP. To select a parameter, click on the checkbox in the same row. This
          will move the parameter to the “Selected” box on the right-hand side of the screen, which displays all parameters
          that will be included in the generated QAPP. Note that parameters are paired with analytical or sample collection
          methods, so take care to select the appropriate combination of parameter and method for your project.
        </p>
        <p>
          The "Other parameters" text box at the bottom of the screen provides space to enter any parameters not listed. If
          your organization intends to submit data to MassDEP and you enter an "other" parameter, please note that MassDEP
          will need to review the generated QAPP before you can implement it.
        </p>
        <p>
          <strong class="has-text-white"><i>If you are conducting benthic monitoring</i></strong> (i.e., your concerns include “General Environmental
          Health: Benthic”), additional measurements are necessary to provide context for your findings. Manually select the
          following parameters from the lists on this page:
        </p>
        <ul>
          <li>
            For benthic sampling in wadeable streams, select temperature, conductivity, and dissolved oxygen.
          </li>
          <li>
            For benthic sampling in estuarine or marine waters, select sample penetration depth, sediment volume, sediment
            texture, temperature, salinity, and dissolved oxygen.
          </li>
        </ul>
      `,
    });
    records.push({
      sectionNumber: '12',
      sectionLevel: '1',
      sectionLabel: 'Parameters By Location',
      sectionName: 'parametersByLocation',
      sectionSort: 12,
      instructions:
        '<p>The table below displays all sampling locations entered on the Monitoring Locations screen. Click the "Edit" button in each row of interest to open a pop-up window, then use the check boxes to the left of the parameter names to indicate whether a parameter is measured at that location. Click the “Select All” button to automatically check all parameter names for all sampling locations in the table.</p>',
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
        'The text boxes below list the required activities related to record handling. In each box, enter a brief description of the relevant activities for your monitoring project.',
    });
    records.push({
      sectionNumber: '15',
      sectionLevel: '1',
      sectionLabel: 'Sampling Design Summary',
      sectionName: 'sampleDesignSummary',
      sectionSort: 13,
      instructions:
        'Use the following prompts to describe how your sampling plan will meet the project objectives (as described on the Project Description screen).',
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
