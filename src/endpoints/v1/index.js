'use strict';
const debug = require('abacus-debug')(process.env.APP_NAME + '-endpoints');
const _ = require('lodash');
module.exports = (config) => {
  const router = require('express').Router();

  const handlers = require('../../handlers/v1')(config);

  const jsonParser = require('body-parser').json();

  const routes = require('./routes');

  routes.forEach((definition) => {
    const path = definition.path;
    // Replace / with _
    const _path = path.replace(/^\//, '').split('/').join('_');
    definition.verbs.forEach((verb) => {
      router[verb](
        path,
        jsonParser,
        handlers.gm(dotpath, verb)
      );
    });
  });
}
