import { createSelector } from '@reduxjs/toolkit';

export const getContactsItems = state => state.contacts.items;
export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;

export const selectContacts = state => state.phonebook.contacts;
export const selectIsLoading = state => state.phonebook.isLoading;
export const selectError = state => state.phonebook.error;
export const selectUserData = state => state.auth.userData;
export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectFilter, selectContacts],
  (filter, contacts) => {
    if (contacts !== null)
      return contacts.filter(contact =>
        contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
      );
  }
);
