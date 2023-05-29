import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './apiSlices/userApiSlice';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
  devTools: true,
});

export default store;