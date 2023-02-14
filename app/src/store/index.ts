import thecocktaildbApi from './thecocktaildb';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    [thecocktaildbApi.reducerPath]: thecocktaildbApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(thecocktaildbApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
