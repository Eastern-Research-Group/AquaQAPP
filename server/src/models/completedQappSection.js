module.exports = (sequelize, DataTypes) => {
  const CompletedQappSection = sequelize.define(
    'CompletedQappSection',
    {
      qappId: DataTypes.UUID,
      sectionId: DataTypes.INTEGER,
    },
    {}
  );

  return CompletedQappSection;
};
