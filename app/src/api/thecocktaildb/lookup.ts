import {cocktailDb} from '.';
import {Drink, Ingredient} from './type';

const lookupApi = cocktailDb.injectEndpoints({
  endpoints: build => ({
    lookupCocktailById: build.query<Drink[] | null, number>({
      query: id => `lookup.php?i=${id}`,
    }),
    lookupIngredientById: build.query<Ingredient[] | null, number>({
      query: id => `lookup.php?iid=${id}`,
    }),
  }),
  overrideExisting: true,
});

export const {useLookupCocktailByIdQuery, useLookupIngredientByIdQuery} =
  lookupApi;
