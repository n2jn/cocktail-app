import cocktailDb from '.';
import {Drink, Ingredient} from './type';

const searchApi = cocktailDb.injectEndpoints({
  endpoints: build => ({
    searchCocktailByName: build.query<Drink[] | null, string>({
      query: name => `search.php?s=${name}`,
      transformResponse: (baseQueryReturnValue: {drinks: Drink[]}) =>
        baseQueryReturnValue.drinks,
    }),
    searchIngredientByName: build.query<Ingredient[] | null, string>({
      query: name => `search.php?i=${name}`,
      transformResponse: (baseQueryReturnValue: {drinks: Ingredient[]}) =>
        baseQueryReturnValue.drinks,
    }),
    searchCocktailByLetter: build.query<Drink[] | null, string>({
      query: letter => `search.php?f=${letter}`,
      transformResponse: (baseQueryReturnValue: {drinks: Drink[]}) =>
        baseQueryReturnValue.drinks,
    }),
  }),
  overrideExisting: true,
});

export const {
  useSearchCocktailByNameQuery,
  useSearchCocktailByLetterQuery,
  useSearchIngredientByNameQuery,
} = searchApi;
