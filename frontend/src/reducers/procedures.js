function procedures(state = [], action) {
  switch (action.type) {
    case 'GET_ALL_PROCEDURES_SUCCEEDED':
      return action.procedures;
    default:
      return state;
  }
}

export default procedures;
