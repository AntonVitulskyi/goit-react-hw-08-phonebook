import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactsAPI} from "Redux/register/operations";

export const getContactsRequest = createAsyncThunk(
  'contacts/get',
  async (_, thunkApi) => {
    try {
      const response = await ContactsAPI.getContactsRequest();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContactRequest = createAsyncThunk(
  'contacts/add',
  async (contactData, thunkApi) => {
    try {
      const response = await ContactsAPI.addContactRequest(contactData);
      return response;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContactRequest = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkApi) => {
    try {
      const response = await ContactsAPI.deleteContactRequest(contactId);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

