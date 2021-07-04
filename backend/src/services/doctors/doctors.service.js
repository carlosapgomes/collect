// Initializes the `doctors` service on path `/doctors`
const { Doctors } = require('./doctors.class');
const createModel = require('../../models/doctors.model');
const hooks = require('./doctors.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/doctors', new Doctors(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('doctors');

  service.hooks(hooks);
};
