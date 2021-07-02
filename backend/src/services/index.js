const users = require('./users/users.service.js');
const procedures = require('./procedures/procedures.service.js');
const proctypes = require('./proctypes/proctypes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(procedures);
  app.configure(proctypes);
};
