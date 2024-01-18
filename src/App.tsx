import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setStep1Data, setStep2Data, submitUser } from './store/registrationSlice';
import Step1Form, { Step1FormData } from './components/Step1Form';
import Step2Form, { Step2FormData } from './components/Step2Form';
import Datatable from './components/Datatable';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const step1Data = useSelector((state: RootState) => state.registration.step1Data);
  const step2Data = useSelector((state: RootState) => state.registration.step2Data);
  const submittedUsers = useSelector((state: RootState) => state.registration.submittedUsers);

  const [currentStep, setCurrentStep] = useState(1);

  const handleStep1Submit = (data: Step1FormData) => {
    dispatch(setStep1Data(data));
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: Step2FormData) => {
    dispatch(setStep2Data(data));
    dispatch(submitUser());
    setCurrentStep(1); // Assuming you want to go back to Step 1 after submission
  };

  return (
    <div >
      <h1>Registration Form</h1>
      {currentStep === 1 && <Step1Form onSubmit={handleStep1Submit} />}
      {currentStep === 2 && step1Data && <Step2Form onSubmit={handleStep2Submit} />}

      <h2>Submitted Users</h2>
      <Datatable data={submittedUsers} />
      <div style={{marginTop: "30px"}}> 
      Design and Developed by <strong>Chetan Dekate</strong>
      </div>
    </div>
  );
};

export default App;
