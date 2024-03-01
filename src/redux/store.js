import { combineReducers, configureStore } from '@reduxjs/toolkit';
import infoReducer from './slice/infoSlice';
import bookmarkReducer from './slice/bookmarkSlice';

const rootReducer = combineReducers({
  info: infoReducer,
  bookmark: bookmarkReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;