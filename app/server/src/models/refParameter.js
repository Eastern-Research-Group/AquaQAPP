module.exports = (sequelize, DataTypes) => {
  const RefParameter = sequelize.define(
    'RefParameter',
    {
      label: {
        type: DataTypes.STRING,
      },
      parameter: {
        type: DataTypes.STRING,
      },
      method: {
        type: DataTypes.STRING,
      },
      waterType: {
        type: DataTypes.STRING,
      },
      fresh: {
        type: DataTypes.BOOLEAN,
      },
      salt: {
        type: DataTypes.BOOLEAN,
      },
      monitoringCategory: {
        type: DataTypes.STRING,
      },
      units: {
        type: DataTypes.STRING,
      },
      accuracy: {
        type: DataTypes.STRING,
      },
      precision: {
        type: DataTypes.STRING,
      },
      expectedRange: {
        type: DataTypes.STRING,
      },
      sampleCollectionMethod: {
        type: DataTypes.STRING,
      },
      sampleContainer: {
        type: DataTypes.STRING,
      },
      sampleVolume: {
        type: DataTypes.STRING,
      },
      samplePreservation: {
        type: DataTypes.STRING,
      },
      maxHoldingTime: {
        type: DataTypes.STRING,
      },
      mdl: {
        type: DataTypes.STRING,
      },
      accuracyChecks: {
        type: DataTypes.STRING,
      },
      precisionChecks: {
        type: DataTypes.STRING,
      },
      percentFieldQC: {
        type: DataTypes.STRING,
      },
      instrument: {
        type: DataTypes.STRING,
      },
      typeOfInspection: {
        type: DataTypes.STRING,
      },
      calibrationFrequency: {
        type: DataTypes.STRING,
      },
      calibrationStandard: {
        type: DataTypes.STRING,
      },
      correctiveAction: {
        type: DataTypes.STRING,
      },
      checkDescription: {
        type: DataTypes.STRING,
      },
      frequency: {
        type: DataTypes.STRING,
      },
      acceptanceCriteria: {
        type: DataTypes.STRING,
      },
      correctiveActions: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return RefParameter;
};
