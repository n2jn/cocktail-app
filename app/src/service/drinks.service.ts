import apiClient from '../helper/apiClient';

class DrinksServices {
  getDrinkByName = (name: string) => apiClient().get(`search.php?s=${name}`);
  getDrinkByLetter = (letter: string) =>
    apiClient().get(`search.php?f=${letter}`);
  getDrinkById = (id: string) => apiClient().get(`lookup.php?i=${id}`);
  getDrinkByIngredient = (ingredient: string) =>
    apiClient().get(`filter.php?i=${ingredient}`);
  getDrinkByGlass = (glass: string) => apiClient().get(`filter.php?g=${glass}`);
  getDrinkByCategory = (category: string) =>
    apiClient().get(`filter.php?c=${category}`);

  getRandomDrink = () => apiClient().get('random.php');
  getAllAlcoholicDrinks = () => apiClient().get('filter.php?a=Alcoholic');
  getAllNonAlcoholicDrinks = () =>
    apiClient().get('filter.php?a=Non_Alcoholic');
}

export default new DrinksServices();
