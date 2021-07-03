const { authenticate } = require('@feathersjs/authentication').hooks;

const isEnabled = require('../../hooks/is-enabled');
const isAdmin = require('../../hooks/is-admin');

module.exports = {
  before: {
    all: [ authenticate('jwt'),isEnabled() ],
    find: [],
    get: [],
    create: [isAdmin()],
    update: [isAdmin()],
    patch: [isAdmin()],
    remove: [isAdmin()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
