import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import eventReducer from "./events/eventSlice";
import createEventReducer from "./events/createEventSlice";
import userEventReducer from "./events/userEventSlice";
import authReducer from "./auth/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  event: eventReducer,
  userEvent: userEventReducer,
  auth: authReducer,
  createEvent: createEventReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
