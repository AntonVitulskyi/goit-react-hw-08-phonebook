import { addContactOperation, deleteContactOperation, fetchContactsOperation } from './operations';

const { createSlice } = require('@reduxjs/toolkit');

const pending = state => {
  state.isLoading = true;
};

const fulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

const rejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(addContactOperation.pending, pending)
      .addCase(addContactOperation.fulfilled,  (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContactOperation.rejected, rejected)

      .addCase(fetchContactsOperation.pending, pending)
      .addCase(fetchContactsOperation.fulfilled, fulfilled)
      .addCase(fetchContactsOperation.rejected, rejected)

      .addCase(deleteContactOperation.pending, pending)
      .addCase(deleteContactOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteContactOperation.rejected, rejected)
  },
});

 const { reducer } = contactSlice;

export default reducer;
