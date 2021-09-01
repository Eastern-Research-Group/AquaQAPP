require('dotenv').config();
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const config = require('./config/config');

const app = express();
app.use(compression()); // adds gzip compression to responses
// helmet adds/configures security-related headers - need to add custom exception for google analytics
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'default-src': [
          "'self'",
          "'unsafe-inline'",
          '*.googletagmanager.com',
          '*.google-analytics.com',
          '*.arcgis.com',
        ],
        'script-src': ["'self'", "'unsafe-inline'", '*.googletagmanager.com', '*.google-analytics.com', '*.arcgis.com'],
        'img-src': [
          "'self'",
          "'unsafe-inline'",
          '*.googletagmanager.com',
          '*.google-analytics.com',
          '*.arcgis.com',
          '*.arcgisonline.com',
          'data:image/png',
          'data:image/svg+xml',
          'data:image/svg',
        ],
      },
    },
  })
);
app.use(express.json()); // enables json responses for API

// Only enable CORS on local environment
if (process.env.NODE_ENV === 'local') {
  app.use(cors());
}

// History allows for both vue-router and express server to serve URLs
app.use(history());

require('./config/passport');
require('./routes')(app);

app.listen(config.port);
console.log(`Server started on port ${config.port}`);
