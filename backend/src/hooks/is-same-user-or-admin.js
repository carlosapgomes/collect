// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if ((context.params.user && context.id) &&
      (
        (context.params.user.isAdmin === 1) ||
        ((parseInt(context.id,10) === context.params.user.id)))
    ) {
      return context;
    }
    throw new Error('Acesso negado');
  };
};
