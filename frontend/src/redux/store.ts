import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import Cookies from "js-cookie";

import { reducer } from "./reducer";
// cấu hình tên + vị trí lưu persist ( storage : localStorage)

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: [thunk],
});
export { store };
export const persistor = persistStore(store);
