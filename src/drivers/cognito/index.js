const adapter = require('./adapter');
const services = require('./services');

module.exports = services(adapter);
