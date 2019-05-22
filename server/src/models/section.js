module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    'Section',
    {
      sectionNumber: DataTypes.STRING,
      sectionLevel: DataTypes.STRING,
      sectionLabel: DataTypes.STRING,
      sectionSort: DataTypes.INTEGER,
    },
    {}
  );
  /* section.associate = function(models) {
    // associations can be defined here
  }; */
  return Section;
};
