const config = require('./config');

const devConfig = process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
    }
  : {
      username: config.db.user,
      password: config.db.password,
      database: config.db.database,
      host: config.db.options.host,
      port: config.db.options.port,
      dialect: config.db.options.dialect,
    };

module.exports = {
  development: devConfig,
};
