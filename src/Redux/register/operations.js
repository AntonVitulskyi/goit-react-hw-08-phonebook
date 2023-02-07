import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/'

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
}

export const UserAPI = {
async register(formData){
const {data} = await axios.post('/users/signup', {...formData});
return await data;
},
async login(formData){
    const {data} = await axios.post('/users/login', {...formData});
    return await data;
},
async getUserDetailsRequest(){
    const {data} = await axios.get('/users/current');
    return await data;
},
async userLogOutRequest(){
    const {data} = await axios.post('/users/logout');
    return await data;
}
}

export const ContactsAPI = {
  async getContactsRequest() {
    const { data } = await  axios.get('/contacts');
    return await data;
  },
  async addContactRequest(contactData) {
    const { data } = await  axios.post('/contacts', contactData);
    return data;
  },
  async deleteContactRequest(contactId) {
    const { data } = await axios.delete(`/contacts/${contactId}`);
    return await data;
   
  },
};

export const registerUserRequest = createAsyncThunk(
  'user/register',
  async (formData, thunkApi) => {
    try {
      const response = await UserAPI.register(formData);
      setAuthHeader(response.token)
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUserRequest = createAsyncThunk(
  'user/login',
  async (formData, thunkApi) => {
    try {
      const response = await UserAPI.login(formData);
      setAuthHeader(response.token)
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authUserRequest = createAsyncThunk(
  'user/auth',
  async (_, thunkApi) => {
    try {
      setAuthHeader(thunkApi.getState().auth.token)
      const response = await UserAPI.getUserDetailsRequest();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logOutRequest = createAsyncThunk(
  'user/logOut',
  async (_, thunkApi) => {
    try {
      const response = await UserAPI.userLogOutRequest();
      clearAuthHeader()
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

