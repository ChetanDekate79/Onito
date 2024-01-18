// Step2Form.tsx

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, Grid, InputLabel, Autocomplete } from '@mui/material';

interface Step2FormProps {
  onSubmit: (data: Step2FormData) => void;
}

export interface Step2FormData {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
}

const schema = yup.object().shape({
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
  country: yup.string(),
  pincode: yup.string(),
});

const Step2Form: React.FC<Step2FormProps> = ({ onSubmit }) => {
  console.log('Step2Form is rendered');

  const { handleSubmit, control, setValue } = useForm<Step2FormData>({
    resolver: yupResolver(schema),
  });

  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        const data = await response.json();
        const countryNames = data.map((country: any) => country.name);
        setCountries(countryNames);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleFormSubmit: SubmitHandler<Step2FormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
       <h3>Address Details</h3>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Address" variant="outlined" fullWidth {...field} />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="state"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="State" variant="outlined" fullWidth {...field} />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="City" variant="outlined" fullWidth {...field} />
          )}
        />
      </Grid>
    </Grid>
    <div style={{ marginTop: '16px' }} />

  
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <InputLabel htmlFor="country"> </InputLabel>
              <Autocomplete
                {...field}
                options={countries}
                renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
                onChange={(_, value) => setValue('country', value ?? '')}
              />
            </>
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="pincode"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              label="Pincode"
              variant="outlined"
              fullWidth
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ''}
            />
          )}
        />
      </Grid>
    </Grid>
  
    {/* Repeat similar changes for other fields */}
    <div style={{ marginTop: '16px' }} />

  
    <Button variant="contained" color="primary" type="submit">
      Submit
    </Button>
  </form>
  
  );
};

export default Step2Form;
