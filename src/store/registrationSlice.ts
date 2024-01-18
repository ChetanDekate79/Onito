// registrationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegistrationState {
  step1Data: Step1FormData | null;
  step2Data: Step2FormData | null;
  submittedUsers: SubmittedUser[];
}

interface Step1FormData {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  govtIdType?: string;
  govtId?: string;
}

interface Step2FormData {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
}

interface SubmittedUser {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  govtIdType?: string;
  govtId?: string;
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
}

const initialState: RegistrationState = {
  step1Data: null,
  step2Data: null,
  submittedUsers: [],
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep1Data: (state, action: PayloadAction<Step1FormData>) => {
      state.step1Data = action.payload;
    },
    setStep2Data: (state, action: PayloadAction<Step2FormData>) => {
      state.step2Data = action.payload;
    },
    submitUser: (state) => {
      if (state.step1Data && state.step2Data) {
        const submittedUser: SubmittedUser = {
          ...state.step1Data,
          ...state.step2Data,
        };
    
        // Handle optional fields for Step2Form
        if (state.step2Data.address === undefined) {
          submittedUser.address = ''; // Set a default value or handle it as needed
        }
        if (state.step2Data.state === undefined) {
          submittedUser.state = ''; // Set a default value or handle it as needed
        }
        if (state.step2Data.city === undefined) {
          submittedUser.city = ''; // Set a default value or handle it as needed
        }
        if (state.step2Data.country === undefined) {
          submittedUser.country = ''; // Set a default value or handle it as needed
        }
        if (state.step2Data.pincode === undefined) {
          submittedUser.pincode = ''; // Set a default value or handle it as needed
        }
    
        state.submittedUsers.push(submittedUser);
    
        // Clear step data after submission
        state.step1Data = null;
        state.step2Data = null;
      }
    },
    
  },
});

export const { setStep1Data, setStep2Data, submitUser } = registrationSlice.actions;

export default registrationSlice.reducer;
