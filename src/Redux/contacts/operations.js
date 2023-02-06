import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const contactsBackend = axios.create({
  baseURL: "https://connections-api.herokuapp.com/contacts",
});

const authInterceptor = config => {
  config.headers['Authorization'] = localStorage.getItem('token');
  return config;
}

contactsBackend.interceptors.request.use(authInterceptor)

const ContactsAPI = {
  async getContactsRequest() {
    const { data } = await contactsBackend.get();
    return await data;
  },
  async addContactRequest(contactData) {
    const { data } = await contactsBackend.post('', contactData);
    return data;
  },
  async deleteContactRequest(contactId) {
    const { data } = await contactsBackend.delete(contactId);
    return await data;
  },
};

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

