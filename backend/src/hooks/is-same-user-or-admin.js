// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if ((context.params.user) &&
      (
        (context.params.user.isAdmin === 1) ||
        ((context.id) && (context.id === context.user.id)))
    ) {
      return context;
    }
    throw new Error('Acesso negado');
  };
};
