import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { githubApi } from "../services/githubApi.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import searchParamsReducer from "./searchParamsSlice.ts";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useSelector } from "react-redux"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["searchParams"],
};

const reducers = combineReducers({
  searchParams: searchParamsReducer,
  [githubApi.reducerPath]: githubApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

const persist = persistStore(store);
export { store, persist };

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
