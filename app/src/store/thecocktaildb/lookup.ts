import cocktailDb from '.';
import {Drink, Ingredient} from './type';

const lookupApi = cocktailDb.injectEndpoints({
  endpoints: build => ({
    lookupCocktailById: build.query<Drink | null, string>({
      query: id => `lookup.php?i=${id}`,
      transformResponse: (baseQueryReturnValue: {drinks: Drink[]}) =>
        baseQueryReturnValue.drinks[0] ?? null,
    }),
    lookupIngredientById: build.query<Ingredient | null, string>({
      query: id => `lookup.php?iid=${id}`,
      transformResponse: (baseQueryReturnValue: {drinks: Ingredient[]}) =>
        baseQueryReturnValue.drinks[0] ?? null,
    }),
  }),
  overrideExisting: true,
});

export const {useLookupCocktailByIdQuery, useLookupIngredientByIdQuery} =
  lookupApi;
