'use strict';

const { promisify } = require('util');

const adapter = require('./adapter');
const services = require('./services');

module.exports = services(promisify, adapter);
