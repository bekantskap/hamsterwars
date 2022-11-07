import { combineReducers, configureStore } from '@reduxjs/toolkit';
import hamsterReducer from './hamster';
import idReducer from './id';
import renderReducer from './render';
import matchReducer from './match';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  hamster: hamsterReducer,
  id: idReducer,
  render: renderReducer,
  match: matchReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
