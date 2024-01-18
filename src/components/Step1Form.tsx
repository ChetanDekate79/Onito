import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { setStep1Data } from './registrationSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver } from 'react-hook-form';
import * as yup from 'yup';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

interface Step1FormProps {
  // onNext: () => void;
  onSubmit: (data: Step1FormData) => void;
}

export interface Step1FormData {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  govtIdType: string;
  govtId: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  age: yup.number().required('Age is required').positive('Age must be a positive number'),
  sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
  mobile: yup.string().required('Mobile is required').matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  govtIdType: yup.string().oneOf(['Aadhar', 'PAN'], 'Invalid ID Type'),
  govtId: yup.string().test('govtId', 'Invalid Government ID', function (value) {
    const govtIdType = this.parent.govtIdType;
    if (govtIdType === 'Aadhar') {
      return /^[2-9]\d{11}$/.test(value || '');
    } else if (govtIdType === 'PAN') {
      return /^[A-Z0-9]{10}$/.test(value || '');
    }
    return true; // If govtIdType is not Aadhar or PAN, validation is considered successful
  }),
});

const Step1Form: React.FC<Step1FormProps> = ({  onSubmit: propOnSubmit }) => {

  const dispatch = useDispatch();
  const step1Data = useSelector((state: RootState) => state.registration.step1Data);

  const { handleSubmit, control } = useForm<Step1FormData>({
    defaultValues: step1Data as Partial<Step1FormData>,
    resolver: yupResolver(schema) as Resolver<Step1FormData>,
  });

  const onSubmit: SubmitHandler<Step1FormData> = (data) => {
    dispatch(setStep1Data(data));
    propOnSubmit(data); // Call the prop function here
    // onNext();
  };

  const handleNextButtonClick = () => {
    handleSubmit(onSubmit)();
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Personal Details</h3>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Name" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="age"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="number"
                label="Age"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="sex"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select {...field} label="Sex" error={!!fieldState.error} fullWidth>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="mobile"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Mobile"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="govtIdType"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <InputLabel>Government ID Type</InputLabel>
                <Select {...field} label="Government ID Type" error={!!fieldState.error} fullWidth>
                  <MenuItem value="">Select ID Type</MenuItem>
                  <MenuItem value="Aadhar">Aadhar</MenuItem>
                  <MenuItem value="PAN">PAN</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="govtId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Government ID"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: '16px' }} />

      <Button variant="contained" color="primary" onClick={handleNextButtonClick}>
        Next
      </Button>
    </form>
  );
};

export default Step1Form;
