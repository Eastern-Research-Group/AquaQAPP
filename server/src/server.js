require('dotenv').config();
const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const config = require('./config/config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(history());

require('./config/passport');
require('./routes')(app);

app.listen(config.port);
console.log(`Server started on port ${config.port}`);
