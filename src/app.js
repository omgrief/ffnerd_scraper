'use strict';
require('dotenv').config();

if (!process.env.APP_NAME) {
  process.env.APP_NAME = 'ffnerd-scraper';
}

const debug = require('abacus-debug')(process.env.APP_NAME + '-app');
const config = require('./config');

//Environment Check
config.environment_variables.forEach((envVar) => {
  if (!process.env[envVar]) {
    debug('Missing Environment Variable: %s', envVar);
    process.exit(1);
  }
});

//Initialize Webapp
const webapp = require('abacus-webapp');
const app = webapp();


//Load Endpoints
app.use('/v1', require('./endpoints/v1')(config));

process.env.PORT = process.env.PORT || 3000;

app.listen(process.env.PORT);

debug("App listening on port: ", process.env.PORT);

//for testing
module.exports.app = app;
