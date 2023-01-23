import {cocktailDb} from '.';
import {AlcoholicFilterType, Drink} from './type';

const filterApi = cocktailDb.injectEndpoints({
  endpoints: build => ({
    getCocktailByIngredient: build.query<Drink[] | null, string>({
      query: id => `filter.php?i=${id}`,
    }),
    getCocktailWithOrWithoutAlchool: build.query<
      Drink[] | null,
      AlcoholicFilterType
    >({
      query: filter => `filter.php?a=${filter}`,
    }),
    getCocktailByCategory: build.query<Drink[] | null, string>({
      query: id => `filter.php?c=${id}`,
    }),
    getCocktailByGlass: build.query<Drink[] | null, string>({
      query: id => `filter.php?g=${id}`,
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
