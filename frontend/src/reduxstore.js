import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './apiSlices/userApiSlice';
import chessReducer from './apiSlices/chessSlice';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    chess:chessReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
  devTools: true,
});

export default store;