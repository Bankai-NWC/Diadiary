import {
  Container,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

function AddEntry() {
  const [formData, setFormData] = useState({
    date: dayjs(),
    time: dayjs(),
    glucose: null,
    insulin: null,
    breadUnits: null,
    weight: null,
    activity: '',
    activityDuration: dayjs(),
  });

  // useEffect(() => {
  //     setFormData({
  //       date: date || dayjs(),
  //     });
  //   }, [
  //     date,
  //   ]);

  const handleChange = field => event => {
    const value = event?.target?.value ?? event;
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
      {/* <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Add New Entry
      </Typography> */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        This page will allow you to add a new entry to your health journal.
        Please fill out the form with the relevant details.
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        paddingBlock={2}
      >
        <Typography variant="body1" sx={{ fontSize: 18 }}>
          Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={formData.date}
            onChange={newValue => handleChange('date')(newValue)}
          />
        </LocalizationProvider>
      </Stack>
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        paddingBlock={2}
      >
        <Typography variant="body1" sx={{ fontSize: 18 }}>
          Time
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            value={formData.time}
            onChange={newValue => handleChange('time')(newValue)}
            views={['hours', 'minutes']}
            ampm={false}
            format='HH:mm'
          />
        </LocalizationProvider>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        paddingBlock={2}
      >
        <Typography variant="body1" sx={{ fontSize: 18 }}>
          Glucose
        </Typography>
        <TextField
          value={formData.glucose}
          onChange={newValue => handleChange('glucose')(newValue)}
          placeholder='Example: 5.6'
          type="number"
          min={0}
          max={40}
          sx={{ width: '246px' }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">mmol/L</InputAdornment>
              ),
              inputProps: {
                step: '0.1',
              },
            },
          }}
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        paddingBlock={2}
      >
        <Typography variant="body1" sx={{ fontSize: 18 }}>
          Insulin dose
        </Typography>
        <TextField
          value={formData.insulin}
          onChange={newValue => handleChange('insulin')(newValue)}
          placeholder='Example: 5'
          type="number"
          min={0}
          max={100}
          sx={{ width: '246px' }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">units</InputAdornment>
              ),
              inputProps: {
                step: '0.1',
              },
            },
          }}
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        paddingBlock={2}
      >
        <Typography variant="body1" sx={{ fontSize: 18 }}>
          Weight
        </Typography>
        <TextField
          value={formData.weight}
          onChange={newValue => handleChange('weight')(newValue)}
          placeholder='Example: 70'
          type="number"
          min={0}
          sx={{ m: 1, width: '246px' }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">kg</InputAdornment>
              ),
            },
          }}
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        paddingBlock={2}
      >
        <Typography variant="body1" sx={{ fontSize: 18 }}>
          Activity
        </Typography>
        <TextField
          placeholder="Example: Running"
          value={formData.activity}
          onChange={newValue => handleChange('activity')(newValue)}
          sx={{ m: 1, width: '246px' }}
        />
      </Stack>
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        paddingBlock={2}
      >
        <Typography variant="body1" sx={{ fontSize: 18 }}>
          Activity duration
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            value={formData.activityDuration}
            onChange={newValue => handleChange('activityDuration')(newValue)}
            views={['hours', 'minutes']}
            ampm={false}
            format='HH:mm'
          />
        </LocalizationProvider>
      </Stack>
      <Divider sx={{ my: 1 }} />
    </Container>
  );
}

export default AddEntry;
