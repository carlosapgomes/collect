// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.params.query &&
      (typeof context.params.query.$paginate !== 'undefined')) {
      if (context.params.query.$paginate === 'false' ||
        context.params.query.$paginate === false) {
        context.params.paginate = false;
      }
      delete context.params.query.$paginate;
    }
    return context;
  };
};
