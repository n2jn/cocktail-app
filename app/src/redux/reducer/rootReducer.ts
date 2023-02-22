import {combineReducers} from 'redux';
import drinksReducer from './drinksReducer/drinks.reducer';

const rootReducer = () => {
  combineReducers({
    drinks: drinksReducer,
  });
};

export default rootReducer;
