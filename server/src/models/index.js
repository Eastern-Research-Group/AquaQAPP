const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config');

const db = {};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL)
  : new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options);

// Create sequelize models from each model file
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Create sequelize associations
db.Qapp.hasMany(db.QappDatum, { foreignKey: 'qappId', as: 'data' });
db.QappDatum.belongsTo(db.Question, { foreignKey: 'questionId', as: 'question' });
db.Section.belongsTo(db.Question, {
  foreignKey: 'sectionNumber',
  sourceKey: 'sectionNumber',
  targetKey: 'sectionNumber',
  as: 'section',
});
db.Question.belongsTo(db.Section, {
  foreignKey: 'sectionNumber',
  sourceKey: 'sectionNumber',
  targetKey: 'sectionNumber',
  as: 'section',
});
db.Qapp.hasMany(db.CompletedQappSection, { foreignKey: 'qappId', as: 'completedSections' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
