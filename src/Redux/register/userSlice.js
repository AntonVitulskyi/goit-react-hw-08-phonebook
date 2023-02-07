import { createSlice } from '@reduxjs/toolkit';
import { authUserRequest, loginUserRequest, logOutRequest, registerUserRequest } from './operations';

const initialState = {
  userData: null,
  token: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
    // Register

      .addCase(registerUserRequest.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
       
      })
      .addCase(registerUserRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(registerUserRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login

      .addCase(loginUserRequest.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        
      })
      .addCase(loginUserRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(loginUserRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Auth User

      .addCase(authUserRequest.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authUserRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(authUserRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Log Out

      .addCase(logOutRequest.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOutRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.userData = null;
      })
      .addCase(logOutRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
});

export const userReducer = userSlice.reducer;