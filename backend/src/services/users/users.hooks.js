const {authenticate} = require('@feathersjs/authentication').hooks;
const isAdmin = require('../../hooks/is-admin');
const isSameUserOrAdmin = require('../../hooks/is-same-user-or-admin');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password'), authenticate('jwt'), isAdmin()],
    update: [hashPassword('password'), authenticate('jwt'), isSameUserOrAdmin()],
    patch: [hashPassword('password'), authenticate('jwt'), isSameUserOrAdmin()],
    remove: [authenticate('jwt'), isAdmin()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
