module.exports = (sequelize, DataTypes) => {
  const RefProcedure = sequelize.define(
    'RefProcedure',
    {
      activity: DataTypes.STRING,
      placeholder: DataTypes.TEXT,
      detailsLabel: DataTypes.TEXT,
      procedureSort: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
  return RefProcedure;
};
