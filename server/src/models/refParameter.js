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
      monitoringCategory: {
        type: DataTypes.STRING,
      },
      labName: {
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
      calibrationFrequency: {
        type: DataTypes.STRING,
      },
      calibrationStandard: {
        type: DataTypes.STRING,
      },
      correctiveAction: {
        type: DataTypes.STRING,
      },
      waterType: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return RefParameter;
};
