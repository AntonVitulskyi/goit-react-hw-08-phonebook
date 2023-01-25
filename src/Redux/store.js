import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactSlice';
import { filterReducer } from './filter/filterSlice';
import { userReducer } from './register/userSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    phonebook: contactsReducer,
    filter: filterReducer,
  },
});
