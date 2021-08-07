// Initializes the `sys` service on path `/sys`
const { Sys } = require('./sys.class');
const hooks = require('./sys.hooks');

module.exports = function (app) {
  //const options = {
  //paginate: app.get('paginate')
  //};

  // Initialize our service with any options it requires
  app.use('/sys', new Sys());

  // Get our initialized service so that we can register hooks
  const service = app.service('sys');

  service.hooks(hooks);
};
