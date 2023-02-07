import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactSlice';
import { filterReducer } from './filter/filterSlice';
import { userReducer } from './register/userSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'user',
  storage,
  version: 1,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    phonebook: contactsReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
