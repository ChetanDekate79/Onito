// store.ts
import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    // Add other reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
