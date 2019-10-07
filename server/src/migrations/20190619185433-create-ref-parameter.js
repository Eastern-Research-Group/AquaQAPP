module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RefParameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      label: {
        type: Sequelize.STRING,
      },
      parameter: {
        type: Sequelize.STRING,
      },
      method: {
        type: Sequelize.STRING,
      },
      waterType: {
        type: Sequelize.STRING,
      },
      fresh: {
        type: Sequelize.BOOLEAN,
      },
      salt: {
        type: Sequelize.BOOLEAN,
      },
      monitoringCategory: {
        type: Sequelize.STRING,
      },
      units: {
        type: Sequelize.STRING,
      },
      accuracy: {
        type: Sequelize.STRING,
      },
      precision: {
        type: Sequelize.STRING,
      },
      expectedRange: {
        type: Sequelize.STRING,
      },
      sampleCollectionMethod: {
        type: Sequelize.STRING,
      },
      sampleContainer: {
        type: Sequelize.STRING,
      },
      sampleVolume: {
        type: Sequelize.STRING,
      },
      samplePreservation: {
        type: Sequelize.STRING,
      },
      maxHoldingTime: {
        type: Sequelize.STRING,
      },
      mdl: {
        type: Sequelize.STRING,
      },
      labName: {
        type: Sequelize.STRING,
      },
      accuracyChecks: {
        type: Sequelize.STRING,
      },
      precisionChecks: {
        type: Sequelize.STRING,
      },
      percentFieldQC: {
        type: Sequelize.STRING,
      },
      instrument: {
        type: Sequelize.STRING,
      },
      calibrationFrequency: {
        type: Sequelize.STRING,
      },
      calibrationStandard: {
        type: Sequelize.STRING,
      },
      correctiveAction: {
        type: Sequelize.STRING,
      },
      numberSamplingLocations: {
        type: Sequelize.STRING,
      },
      rationaleNumberSamples: {
        type: Sequelize.STRING,
      },
      siteLocationRationale: {
        type: Sequelize.STRING,
      },
      frequency: {
        type: Sequelize.STRING,
      },
      numberTypeQCSamples: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('RefParameters');
  },
};
