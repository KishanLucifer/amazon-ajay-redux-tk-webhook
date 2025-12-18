// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import thunk from "redux-thunk";
// import basketReducer from "../slices/basketSlice";
// import toastMessageReducer from "../slices/toastMessageSlice";

// const rootReducer = combineReducers({
//   basket: basketReducer,
//   toastMessage: toastMessageReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["toastMessage"], // Exclude toastMessage from persistence
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Disable serializable check for non-serializable data
//     }),
// });

// export const persistor = persistStore(store);

// // store.js
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import basketReducer from "../slices/basketSlice";
// import toastMessageReducer from "../slices/toastMessageSlice";

// const rootReducer = combineReducers({
//   basket: basketReducer,
//   toastMessage: toastMessageReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["toastMessage"], // Exclude toastMessage from persistence
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // This is for localStorage
import { persistReducer, persistStore } from "redux-persist";
import basketReducer from "./slices/basketSlice";
// import toastMessageReducer from "../slices/toastMessageSlice";

// Create a noop storage for server-side rendering (SSR)
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const isClient = typeof window !== "undefined"; // Check if running on the client side
const storageConfig = isClient ? storage : createNoopStorage(); // Use noop storage for SSR

const persistConfig = {
  key: "root",
  storage: storageConfig, // Use conditional storage
  blacklist: ["toastMessage"], // Exclude toastMessage from persistence
};

const rootReducer = combineReducers({
  basket: basketReducer,
  // toastMessage: toastMessageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = isClient ? persistStore(store) : null; // Only create persistor on client side
