// Initializes the `proctypes` service on path `/proctypes`
const { Proctypes } = require('./proctypes.class');
const createModel = require('../../models/proctypes.model');
const hooks = require('./proctypes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: {
      'default': 10,
      'max': 10
    },
  };

  // Initialize our service with any options it requires
  app.use('/proctypes', new Proctypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('proctypes');

  service.hooks(hooks);
};
