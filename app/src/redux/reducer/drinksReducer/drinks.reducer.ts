import actionType from './drinks.actionType';
import initialState from './drinks.initialState';

const drinksReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionType.DRINKS_LOAD_START:
      return {
        ...state,
        isLoading: true,
        drinks: null,
        errorMessage: null,
      };
    case actionType.DRINKS_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        drinks: payload,
        errorMessage: null,
      };
    case actionType.DRINKS_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        drinks: null,
        errrorMessage: payload,
      };
    default:
      return state;
  }
};

export default drinksReducer;
