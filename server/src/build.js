const { exec } = require('child_process');

if (process.env.HEROKU_ENV === 'dev') {
  exec('npm run build:dev');
} else {
  exec('npm run build:prod');
}
