import cocktailDb from '.';

export type Filters = 'categories' | 'glass' | 'ingredient1' | 'alcoholic';

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
      FilterDataType<'ingredient1'>[],
      void
    >({
      query: () => `list.php?i=list`,
      transformResponse: transformFilterDataResponse,
    }),
    getGlassesFilterData: builder.query<FilterDataType<'glass'>[], void>({
      query: () => `list.php?g=list`,
      transformResponse: transformFilterDataResponse,
    }),
    getCategoriesFilterData: builder.query<
      FilterDataType<'categories'>[],
      void
    >({
      query: () => `list.php?c=list`,
      transformResponse: transformFilterDataResponse,
    }),
    getAlcoholicFilterData: builder.query<FilterDataType<'alcoholic'>[], void>({
      query: () => `list.php?a=list`,
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
