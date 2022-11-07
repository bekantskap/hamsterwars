import { createSlice, current } from '@reduxjs/toolkit';

export const idSlice = createSlice({
  name: 'ids',
  initialState: [],

  reducers: {
    setIds: (state, action) => {
      state.push(action.payload);
    },
    resetIds: state => {
      state.splice(0, state.length);
    },
    deleteId: (state, action) => {
      return [...state.filter(i => i !== action.payload)];
    },
  },
});

export const { setIds, resetIds, deleteId } = idSlice.actions;

export default idSlice.reducer;
