import cocktailDb from '.';
import {AlcoholicFilterType, Drink} from './type';

const filterApi = cocktailDb.injectEndpoints({
  endpoints: build => ({
    getCocktailByIngredient: build.query<Drink[] | null, string>({
      query: id => `filter.php?i=${id}`,
      transformResponse: (baseQueryReturnValue: {drinks: Drink[]}) =>
        baseQueryReturnValue.drinks,
    }),
    getCocktailWithOrWithoutAlchool: build.query<
      Drink[] | null,
      AlcoholicFilterType
    >({
      query: filter => `filter.php?a=${filter}`,
      transformResponse: (baseQueryReturnValue: {drinks: Drink[]}) =>
        baseQueryReturnValue.drinks,
    }),
    getCocktailByCategory: build.query<Drink[] | null, string>({
      query: id => `filter.php?c=${id}`,
      transformResponse: (baseQueryReturnValue: {drinks: Drink[]}) =>
        baseQueryReturnValue.drinks,
    }),
    getCocktailByGlass: build.query<Drink[] | null, string>({
      query: id => `filter.php?g=${id}`,
      transformResponse: (baseQueryReturnValue: {drinks: Drink[]}) =>
        baseQueryReturnValue.drinks,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCocktailByIngredientQuery,
  useGetCocktailWithOrWithoutAlchoolQuery,
  useGetCocktailByCategoryQuery,
  useGetCocktailByGlassQuery,
} = filterApi;
