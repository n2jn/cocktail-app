const initState = {
  error: null,
};

export function errorReducer(state = initState, action) {
  const {error} = action;

  if (error) {
    return {
      error: error,
    };
  }

  return state;
}
