import { createSlice } from '@reduxjs/toolkit';
import { addContactRequest, deleteContactRequest, getContactsRequest } from './operations';


const initialState = {
  contacts: null,
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  reducers: {},
  extraReducers: builder =>
    builder

      // Get Contacts

      .addCase(getContactsRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getContactsRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(getContactsRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add New Contact

      .addCase(addContactRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(addContactRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Contact

      .addCase(deleteContactRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedContactId = action.payload.id;
        state.contacts = state.contacts.filter(
          contact => contact.id !== deletedContactId
        );
      })
      .addCase(deleteContactRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const contactsReducer = contactsSlice.reducer;
