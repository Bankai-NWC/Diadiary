import { Button, Container, Divider, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { auth } from '../../../firebase';
import CustomDatePicker from '../../ui/Inputs/CustomDatePicker/CustomDatePicker';
import CustomTextField from '../../ui/Inputs/CustomTextField/CustomTextField';
import CustomTimePicker from '../../ui/Inputs/CustomTimePicker/CustomTimePicker';

function AddEntry() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: dayjs(),
    time: dayjs(),
    glucose: '',
    bolusInsulin: '',
    basalInsulin: '',
    breadUnits: '',
    activity: '',
    activityDuration: dayjs().hour(0).minute(0),
    symptoms: '',
    notes: '',
    characterizedBy: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    if (!formData.glucose) {
      newErrors.glucose = 'Glucose level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = field => event => {
    const value = event?.target?.value ?? event;
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveEntry = async () => {
    if (!validateForm()) return;

    try {
      const idToken = await auth.currentUser.getIdToken();

      const duration = formData.activityDuration;
      const activityDurationMinutes = duration.hour() * 60 + duration.minute();

      const payload = {
        date: formData.date.toISOString(),
        time: formData.time.format('HH:mm'),
        glucose: parseFloat(formData.glucose),
        bolusInsulin: parseFloat(formData.bolusInsulin),
        basalInsulin: parseFloat(formData.basalInsulin),
        breadUnits: parseFloat(formData.breadUnits),
        activity: formData.activity,
        activityDuration: activityDurationMinutes,
        symptoms: formData.symptoms,
        notes: formData.notes,
        characterizedBy:
          parseFloat(formData.glucose) < 3.0
            ? 'Severely Low'
            : parseFloat(formData.glucose) > 3.0 &&
                parseFloat(formData.glucose) <= 3.9
              ? 'Low'
              : parseFloat(formData.glucose) > 3.9 &&
                  parseFloat(formData.glucose) <= 9.6
                ? 'Normal'
                : parseFloat(formData.glucose) > 9.6 &&
                    parseFloat(formData.glucose) <= 13.9
                  ? 'High'
                  : 'Very High',
      };

      await axios.post(`${API_URL}/api/entries`, payload, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      setFormData({
        date: dayjs(),
        time: dayjs(),
        glucose: '',
        bolusInsulin: '',
        basalInsulin: '',
        breadUnits: '',
        activity: '',
        activityDuration: dayjs().hour(0).minute(0),
        symptoms: '',
        notes: '',
      });
      setErrors({});
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Diadiary | New Entry</title>
      </Helmet>
      <Container
        maxWidth="md"
        sx={{ marginTop: 10, marginBottom: 2, textAlign: 'center' }}
      >
        <Divider sx={{ my: 1 }}>Date and time</Divider>
        <CustomDatePicker
          label={'Date'}
          value={formData.date}
          maxDate={dayjs()}
          handleChange={newValue => handleChange('date')(newValue)}
          required={true}
          error={!!errors.date}
          helperText={errors.date ? errors.date : ''}
        />
        <CustomTimePicker
          label={'Time'}
          value={formData.time}
          handleChange={newValue => handleChange('time')(newValue)}
          required={true}
          error={!!errors.time}
          helperText={errors.time ? errors.time : ''}
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
          required={true}
          error={!!errors.glucose}
          helperText={errors.glucose ? errors.glucose : ''}
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
        <Divider sx={{ my: 1 }}>Insulins dose</Divider>
        <CustomTextField
          label={'Bolus insulin'}
          value={formData.bolusInsulin}
          handleChange={newValue => handleChange('bolusInsulin')(newValue)}
          placeholder="Example: 5"
          type="number"
          min={0}
          max={100}
          step={0.1}
          units={'units'}
        />
        <CustomTextField
          label={'Basal insulin'}
          value={formData.basalInsulin}
          handleChange={newValue => handleChange('basalInsulin')(newValue)}
          placeholder="Example: 20"
          type="number"
          min={0}
          max={100}
          step={0.1}
          units={'units'}
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
          placeholder="Example: Feeling good, Weakness, dizziness"
          type="text"
          multiline={true}
          rows={4}
        />
        <CustomTextField
          label={'Notes'}
          value={formData.notes}
          handleChange={newValue => handleChange('notes')(newValue)}
          placeholder="Example: Lunch: soup 250 grams, pasta with meat 300 grams, apple juice 200 grams"
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
          <Button
            component={RouterLink}
            to="/dashboard"
            color="primary"
            variant="outlined"
            size="large"
          >
            Cancel
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default AddEntry;
