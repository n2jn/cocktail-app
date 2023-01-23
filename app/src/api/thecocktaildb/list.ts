import {cocktailDb} from '.';

type Filters = 'categories' | 'glass' | 'ingredient' | 'alcoholic';

export type StrFilterType<T extends Filters> = `str${Capitalize<T>}`;

export type FilterDataType<T extends Filters> = {
  [K in StrFilterType<T>]: string;
};

const transformFilterDataResponse = <T extends Filters>(baseQueryReturnValue: {
  drinks: FilterDataType<T>[];
}) => baseQueryReturnValue.drinks;

const lookupApi = cocktailDb.injectEndpoints({
  endpoints: builder => ({
    getIngredientsFilterData: builder.query<
      FilterDataType<'ingredient'>[],
      void
    >({
      query: count => `list.php?i=${count}`,
      transformResponse: transformFilterDataResponse,
    }),
    getGlassesFilterData: builder.query<FilterDataType<'glass'>[], void>({
      query: count => `list.php?g=${count}`,
      transformResponse: transformFilterDataResponse,
    }),
    getCategoriesFilterData: builder.query<
      FilterDataType<'categories'>[],
      void
    >({
      query: count => `list.php?c=${count}`,
      transformResponse: transformFilterDataResponse,
    }),
    getAlcoholicFilterData: builder.query<FilterDataType<'alcoholic'>[], void>({
      query: count => `list.php?a=${count}`,
      transformResponse: transformFilterDataResponse,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetIngredientsFilterDataQuery,
  useGetAlcoholicFilterDataQuery,
  useGetGlassesFilterDataQuery,
  useGetCategoriesFilterDataQuery,
} = lookupApi;
