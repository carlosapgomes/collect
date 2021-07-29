// Initializes the `procedures` service on path `/procedures`
const {Procedures} = require('./procedures.class');
const createModel = require('../../models/procedures.model');
const hooks = require('./procedures.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: {
      'default': 3,
      'max': 3
    },
  };

  // Initialize our service with any options it requires
  app.use('/procedures', new Procedures(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('procedures');

  service.hooks(hooks);
};
