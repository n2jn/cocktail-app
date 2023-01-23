import {configureStore} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/';
const headers = {
  'Content-Type': 'application/json',
};

export const cocktailDb = createApi({
  reducerPath: 'cocktailApi',
  baseQuery: fetchBaseQuery({baseUrl: url, headers}),
  endpoints: () => ({}),
});

export default configureStore({
  reducer: {
    [cocktailDb.reducerPath]: cocktailDb.reducer,
  },
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare().concat(cocktailDb.middleware),
});
