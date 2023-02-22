import DrinksService from '../../../service/drinks.service';
import actions from './drinks.actions';

export const loadDrinkAsync = dispatch => {
  dispatch(actions.drinkLoadStart());

  DrinksService.getAllAlcoholicDrinks()
    .then(response => dispatch(actions.drinkLoadSuccess(response.data)))
    .catch(error => {
      // erreur management
      // quelle est l'action initial
      // quelle est l'erreur pour le declencher
      dispatch(actions.drinkLoadError(error));
    });
};
