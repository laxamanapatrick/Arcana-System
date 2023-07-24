import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jsonServerApi } from "../api";
import loginReducer from "../store/loginSlice";
import permissionsReducer from "../store/permissionSlice";
import sidebarNavigationReducer from "./navigationSlice";

const rootReducer = combineReducers({
  fullname: loginReducer,
  permissions: permissionsReducer,
  sidebarNavigation: sidebarNavigationReducer,
  [jsonServerApi.reducerPath]: jsonServerApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerApi.middleware),
});

setupListeners(store.dispatch);

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
