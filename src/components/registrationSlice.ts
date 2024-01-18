// registrationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegistrationState {
  step: number;
  step1Data: {
    name: string;
    age: number;
    sex: string;
    mobile: string;
    govtIdType: string;
    govtId: string;
  };
  // Add more steps if needed
}

const initialState: RegistrationState = {
  step: 1,
  step1Data: {
    name: '',
    age: 0,
    sex: '',
    mobile: '',
    govtIdType: '',
    govtId: '',
  },
  // Initialize more steps if needed
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setStep1Data: (state, action: PayloadAction<RegistrationState['step1Data']>) => {
      state.step1Data = { ...state.step1Data, ...action.payload };
    },
    // Add more reducers for additional steps if needed
  },
});

export const { setStep, setStep1Data } = registrationSlice.actions;

export default registrationSlice.reducer;
