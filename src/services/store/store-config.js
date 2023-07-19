import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jsonServerApi } from "../api";
import loginReducer from '../store/loginSlice'

export const store = configureStore({
  reducer: {
    fullname: loginReducer,
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerApi.middleware),
});

setupListeners(store.dispatch);

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
