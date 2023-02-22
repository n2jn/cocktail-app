import {configureStore} from '@reduxjs/toolkit';
import thunks from 'redux-thunk';
import rootReducer from '../reducer/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunks),
});

export default store;
