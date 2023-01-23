import {cocktailDb} from '.';
import {Drink} from './type';

// const transformFilterDataResponse = <T extends Filters>(baseQueryReturnValue: {
//   drinks: FilterDataType<T>[];
// }) => baseQueryReturnValue.drinks;

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
