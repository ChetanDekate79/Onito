// store.ts
import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    // Add other reducers if any
  },
});

export default store;
