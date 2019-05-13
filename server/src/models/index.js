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
db.Outline.belongsTo(db.Question, {
  foreignKey: 'outlineNumber',
  sourceKey: 'outlineNumber',
  targetKey: 'outlineNumber',
  as: 'outline',
});
db.Question.belongsTo(db.Outline, {
  foreignKey: 'outlineNumber',
  sourceKey: 'outlineNumber',
  targetKey: 'outlineNumber',
  as: 'outline',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
