const {authenticate} = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const checkAdmin = () => async (context, next) => {
  console.log('checkAdmin called');
  console.log(JSON.stringify(context, null, 2));
  if (context.params.user) {
    if (context.params.user.isAdmin !== 1) {
      throw new Error('Usuário não é adminstrador');
    }
  } else {
    throw new Error('Não autenticado');
  }
  if (typeof next === 'function') {
    await next();
  }
  console.log('authorized');
  return;
};
const checkAdminOrSameUser = () => async (context, next) => {
  //console.log('checkAdminOrSameUser called');
  //console.log(JSON.stringify(context, null, 2));
  if (context.params.user) {
    if ((context.params.user.isAdmin === 1) ||
      ((context.id) && (context.id === context.user.id))) {
      //console.log('authorized');
      return;
    }
  } else {
    throw new Error('Não autorizado');
  }
  if (typeof next === 'function') {
    await next();
  }
  return;
};

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password'), authenticate('jwt'), checkAdmin()],
    update: [hashPassword('password'), authenticate('jwt'), checkAdminOrSameUser()],
    patch: [hashPassword('password'), authenticate('jwt'), checkAdminOrSameUser()],
    remove: [authenticate('jwt'), checkAdmin()]
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
