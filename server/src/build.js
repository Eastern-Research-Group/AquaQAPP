const { execSync } = require('child_process');

if (process.env.HEROKU_ENV === 'dev') {
  execSync('npm run build:dev');
} else {
  // migrate without undoing to only apply schema updates without wiping out database
  execSync('sequelize db:migrate');

  // undo seeds and execute non-dev seeders for lookup data (do not insert any dummy data and do not delete user-entered data)
  execSync('sequelize db:seed:undo:all');
  execSync('sequelize db:seed --seed questions');
  execSync('sequelize db:seed --seed ref-concerns');
  execSync('sequelize db:seed --seed ref-horizontal-collection-method');
  execSync('sequelize db:seed --seed ref-horizontal-coord-ref-system');
  execSync('sequelize db:seed --seed ref-location-types');
  execSync('sequelize db:seed --seed ref-parameters');
  execSync('sequelize db:seed --seed ref-role');
  execSync('sequelize db:seed --seed sections');
  execSync('sequelize db:seed --seed examples');
  // run production build
  execSync('npm run build:prod');
}

// copy other asset files from public to dist
execSync('cp client/public/AquaQAPP_User_Guide.pdf client/dist');
execSync('cp client/public/robots.txt client/dist');
execSync('cp client/public/favicon.ico client/dist');
execSync('cp client/public/img/icons client/dist/img/icons -r');
