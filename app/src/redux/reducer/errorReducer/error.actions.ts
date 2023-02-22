import actionTypes from './error.actionTypes';

const {SET_ERROR} = actionTypes;

export function setError(error) {
  return {
    type: SET_ERROR,
    error: error,
  };
}
