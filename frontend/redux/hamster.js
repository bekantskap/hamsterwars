import { createSlice, current } from '@reduxjs/toolkit';

export const hamsterSlice = createSlice({
  name: 'hamsters',
  initialState: [],

  reducers: {
    setHamster: (state, action) => {
      state.splice(0, state.length);
      action.payload.map(m => {
        state.push({
          id: m.id,
          name: m.name,
          age: m.age,
          favFood: m.favFood,
          loves: m.loves,
          imgName: m.imgName,
          wins: m.wins,
          defeats: m.defeats,
          games: m.games,
        });
      });
    },
    updateHamster: (state, action) => {
      const { id, wins, losses, games } = action.payload;
      const hamster = state.find(h => h.id === id);
      hamster.wins = wins;
      hamster.defeats = losses;
      hamster.games = games;
    },
    resetHamster: state => {
      state.splice(0, state.length);
    },
    deleteHamster: (state, action) => {
      console.log(action.payload);
      return [...state.filter(i => i.id !== action.payload.id)];
    },
  },
});

export const { setHamster, resetHamster, deleteHamster, updateHamster } =
  hamsterSlice.actions;

export default hamsterSlice.reducer;
