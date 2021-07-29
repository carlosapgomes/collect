const {authenticate} = require('@feathersjs/authentication').hooks;

const isEnabled = require('../../hooks/is-enabled');
const setPagination = require('../../hooks/set-pagination');

module.exports = {
  before: {
    all: [authenticate('jwt'), isEnabled()],
    find: [setPagination()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
