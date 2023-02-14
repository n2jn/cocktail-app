import cocktailDb from '.';
import {Drink} from './type';

const randomApi = cocktailDb.injectEndpoints({
  endpoints: build => ({
    getRandomCocktail: build.query<Drink[] | null, void>({
      query: () => `random.php`,
      transformResponse: (baseQueryReturnValue: {drinks: Drink[]}) =>
        baseQueryReturnValue.drinks,
    }),
  }),
  overrideExisting: true,
});

export const {useGetRandomCocktailQuery} = randomApi;
