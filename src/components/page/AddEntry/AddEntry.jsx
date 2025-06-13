import { Button, Container, Divider, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { auth } from '../../../firebase';
import CustomDatePicker from '../../ui/Inputs/CustomDatePicker/CustomDatePicker';
import CustomTextField from '../../ui/Inputs/CustomTextField/CustomTextField';
import CustomTimePicker from '../../ui/Inputs/CustomTimePicker/CustomTimePicker';

function AddEntry() {
  const [formData, setFormData] = useState({
    date: dayjs(),
    time: dayjs(),
    glucose: null,
    insulin: null,
    breadUnits: null,
    weight: null,
    activity: '',
    activityDuration: dayjs("00:00", "HH:mm"),
    symptoms: '',
    notes: '',
  });

  const handleChange = field => event => {
    const value = event?.target?.value ?? event;
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveEntry = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken();

      const duration = formData.activityDuration;
      const activityDurationMinutes = duration.hour() * 60 + duration.minute();

      const payload = {
        date: formData.date.toISOString(),
        time: formData.time.format('HH:mm'),
        glucose: parseFloat(formData.glucose),
        insulin: parseFloat(formData.insulin),
        breadUnits: parseFloat(formData.breadUnits),
        weight: parseFloat(formData.weight),
        activity: formData.activity,
        activityDuration: activityDurationMinutes,
        symptoms: formData.symptoms,
        notes: formData.notes,
      };

      await axios.post('http://localhost:5000/api/entries', payload, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginBlock: 10, textAlign: 'center' }}>
      <Divider sx={{ my: 1 }}>Date and time</Divider>
      <CustomDatePicker
        label={'Date'}
        value={formData.date}
        handleChange={newValue => handleChange('date')(newValue)}
      />
      <CustomTimePicker
        label={'Time'}
        value={formData.time}
        handleChange={newValue => handleChange('time')(newValue)}
      />
      <Divider sx={{ my: 1 }}>Health indicators</Divider>
      <CustomTextField
        label={'Glucose'}
        value={formData.glucose}
        handleChange={newValue => handleChange('glucose')(newValue)}
        placeholder="Example: 5.6"
        type="number"
        min={0}
        max={40}
        step={0.1}
        units={'mmol/L'}
      />
      <CustomTextField
        label={'Insulin dose'}
        value={formData.insulin}
        handleChange={newValue => handleChange('insulin')(newValue)}
        placeholder="Example: 5"
        type="number"
        min={0}
        max={100}
        step={0.1}
        units={'units'}
      />
      <CustomTextField
        label={'Bread units'}
        value={formData.breadUnits}
        handleChange={newValue => handleChange('breadUnits')(newValue)}
        placeholder="Example: 12"
        type="number"
        min={0}
        max={50}
        step={0.5}
        units={'XE'}
      />
      <CustomTextField
        label={'Weight'}
        value={formData.weight}
        handleChange={newValue => handleChange('weight')(newValue)}
        placeholder="Example: 70"
        type="number"
        min={0}
        max={300}
        step={0.5}
        units={'kg'}
      />
      <Divider sx={{ my: 1 }}>Physical activity</Divider>
      <CustomTextField
        label={'Activity'}
        value={formData.activity}
        handleChange={newValue => handleChange('activity')(newValue)}
        placeholder="Example: Running"
        type="text"
      />
      <CustomTimePicker
        label={'Activity duration'}
        value={formData.activityDuration}
        handleChange={newValue => handleChange('activityDuration')(newValue)}
      />
      <Divider sx={{ my: 1 }}>Subjective well-being</Divider>
      <CustomTextField
        label={'Symptoms'}
        value={formData.symptoms}
        handleChange={newValue => handleChange('symptoms')(newValue)}
        placeholder="Example: Weakness, dizziness"
        type="text"
        multiline={true}
        rows={4}
      />
      <CustomTextField
        label={'Notes'}
        value={formData.notes}
        handleChange={newValue => handleChange('notes')(newValue)}
        placeholder="Example: Feeling good"
        type="text"
        multiline={true}
        rows={4}
      />
      <Divider sx={{ my: 1 }} />
      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleSaveEntry}
        >
          Save
        </Button>
        <Button color="primary" variant="contained" size="large">
          Cancel
        </Button>
      </Stack>
    </Container>
  );
}

export default AddEntry;
