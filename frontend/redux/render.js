import { createSlice, current } from '@reduxjs/toolkit';

export const renderSlice = createSlice({
  name: 'renders',
  initialState: false,
  // Här gör ett objekt med olika renders och sätt state = state till dem som inte ska ändras.
  reducers: {
    setDesc: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setDesc } = renderSlice.actions;

export default renderSlice.reducer;
