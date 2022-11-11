import { createSlice, current } from '@reduxjs/toolkit';

export const matchSlice = createSlice({
  name: 'matches',
  initialState: [],

  reducers: {
    setMatches: (state, action) => {
      console.log(action);
      state.splice(0, state.length);
      action.payload.map(m => {
        state.push({
          id: m._id,
          winnerId: m.winnerId,
          loserId: m.loserId,
        });
      });
    },
    getAllmatches: state => {
      return state;
    },
    resetMatches: state => {
      state.splice(0, state.length);
    },
    deleteMatches: (state, action) => {
      return [...state.filter(i => i !== action.payload)];
    },
  },
});

export const { setMatches, resetMatches, deleteMatches } = matchSlice.actions;

export default matchSlice.reducer;
