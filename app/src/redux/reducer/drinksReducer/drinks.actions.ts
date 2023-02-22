import actionType from './drinks.actionType';

const drinkLoadStart = () => ({
    type: actionType.DRINKS_LOAD_START
})

const drinkLoadSuccess = (drinks) => ({
    type: actionType.DRINKS_LOAD_SUCCESS,
    payload: drinks
})

const drinkLoadError = (errorMessage: string) => ({
    type: actionType.DRINKS_LOAD_SUCCESS,
    payload: errorMessage
})

export default {
    drinkLoadStart,
    drinkLoadSuccess,
    drinkLoadError
}