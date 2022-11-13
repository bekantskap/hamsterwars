import { createSlice, current } from '@reduxjs/toolkit';

export const renderSlice = createSlice({
  name: 'renders',
  initialState: false,
  reducers: {
    setDesc: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setDesc } = renderSlice.actions;

export default renderSlice.reducer;
