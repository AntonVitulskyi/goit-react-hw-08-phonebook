import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const contactsApi = axios.create({
  baseURL: "https://connections-api.herokuapp.com/contacts",
});

export const fetchContactsOperation = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await contactsApi.get();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContactOperation = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
      try {
        const { data } = await contactsApi.post('', contact);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const deleteContactOperation = createAsyncThunk(
  "contacts/deleteContact",
  async (contactID, thunkAPI) => {
    try {
      const { data } = await contactsApi.delete(contactID);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



