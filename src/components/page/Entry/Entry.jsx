import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import {
  Button,
  Container,
  Divider,
  Skeleton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { auth } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import { setAlert } from '../../../store/slices/alertSlice';
import CustomDatePicker from '../../ui/Inputs/CustomDatePicker/CustomDatePicker';
import CustomTextField from '../../ui/Inputs/CustomTextField/CustomTextField';
import CustomTimePicker from '../../ui/Inputs/CustomTimePicker/CustomTimePicker';
import EntryPDF from '../../ui/PDF/EntryPDF';

dayjs.extend(customParseFormat);

function Entry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    name,
    surname,
    gender,
    dateOfIllness,
    basalInsulin,
    bolusInsulin,
    anamnesis,
  } = useAuth();

  const userData = {
    name,
    surname,
    gender,
    dateOfIllness,
    basalInsulin,
    bolusInsulin,
    anamnesis,
  };

  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [formData, setFormData] = useState({
    date: dayjs(),
    time: dayjs(),
    glucose: 0,
    breadUnits: 0,
    bolusInsulin: 0,
    basalInsulin: 0,
    activity: '',
    activityDuration: dayjs().hour(0).minute(0),
    symptoms: '',
    note: '',
  });
  const [editMode, setEditMode] = useState(false);
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

  const actions = [
    { icon: <DeleteOutlineIcon />, name: 'Delete' },
    { icon: <EditIcon />, name: 'Edit' },
    { icon: <SaveIcon />, name: 'Downlaod' },
    { icon: <FileCopyIcon />, name: 'Copy' },
  ];

  const handleActionClick = async action => {
    switch (action.name) {
      case 'Copy':
        navigator.clipboard.writeText(
          `Date: ${dayjs(entry?.date).format('DD/MM/YYYY')}\nTime: ${entry?.time}\nGlucose: ${entry?.glucose} mmol/L\nShort Insulin: ${entry?.bolusInsulin ? entry?.bolusInsulin : 'N/A'} units\nLong Insulin: ${entry?.basalInsulin ? entry?.basalInsulin : 'N/A'} units\nActivity: ${entry?.activity}\nSymptoms: ${entry?.symptoms}\nNotes: ${entry?.notes}`,
        );
        dispatch(
          setAlert({ message: 'Entry copied to clipboard', type: 'success' }),
        );
        break;
      case 'Downlaod':
        const blob = await pdf(
          <EntryPDF entry={entry} userData={userData} />,
        ).toBlob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `diary(${dayjs(entry.date).format('DD_MM_YYYY')}).pdf`;
        link.click();

        URL.revokeObjectURL(url);
        dispatch(setAlert({ message: 'Entry downloaded', type: 'success' }));
        break;
      case 'Edit':
        setEditMode(true);
        break;
      case 'Delete':
        try {
          const idToken = await auth.currentUser.getIdToken();
          const response = await axios.delete(
            `http://localhost:5000/api/entries/${id}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            },
          );
          dispatch(
            setAlert({ message: response.data.message, type: 'success' }),
          );
          navigate('/dashboard');
        } catch (error) {
          dispatch(
            setAlert({ message: 'Error deleting entry', type: 'error' }),
          );
        }
        break;
      default:
        console.warn('Unknown action:', action.name);
    }
  };

  const handleSave = async () => {
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

      await axios.patch(`http://localhost:5000/api/entries/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const response = await axios.get(
        `http://localhost:5000/api/entries/${id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );

      setEntry(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  const handleChange = field => event => {
    const value = event?.target?.value ?? event;
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const fetchEntry = async () => {
          try {
            const idToken = await user.getIdToken();
            const response = await axios.get(
              `http://localhost:5000/api/entries/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${idToken}`,
                },
              },
            );

            setEntry(response.data);
            console.log('Fetched entry:', response.data);
          } catch (error) {
            console.error('Error fetching entry:', error);
          }
        };

        fetchEntry();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (entry) {
      setFormData({
        date: dayjs(entry.date) || dayjs(),
        time: entry.time ? dayjs(entry.time, 'HH:mm') : dayjs(),
        glucose: entry.glucose ?? 0,
        breadUnits: entry.breadUnits ?? 0,
        bolusInsulin: entry.bolusInsulin ?? 0,
        basalInsulin: entry.basalInsulin ?? 0,
        activity: entry.activity || '',
        activityDuration: entry.activityDuration
          ? dayjs(entry.activityDuration)
          : dayjs().hour(0).minute(0),
        symptoms: entry.symptoms || '',
        note: entry.note || '',
      });
    }
  }, [entry]);

  return (
    <>
      <Helmet>
        <title>Diadiary | Entry</title>
      </Helmet>
      {entry ? (
        <Container sx={{ mt: 10, mb: 2 }} maxWidth="md">
          <Divider sx={{ my: 1 }}>Date and time</Divider>
          {editMode ? (
            <CustomDatePicker
              label={'Date'}
              value={formData.date}
              maxDate={dayjs()}
              handleChange={newValue => handleChange('date')(newValue)}
              required={true}
              error={!!errors.date}
              helperText={errors.date ? errors.date : ''}
            />
          ) : (
            <Stack direction="row" justifyContent={'space-between'}>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Date
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {dayjs(entry.date).format('DD/MM/YYYY')}
              </Typography>
            </Stack>
          )}

          {editMode ? (
            <CustomTimePicker
              label={'Time'}
              value={formData.time}
              handleChange={newValue => handleChange('time')(newValue)}
              required={true}
              error={!!errors.time}
              helperText={errors.time ? errors.time : ''}
            />
          ) : (
            <Stack direction="row" justifyContent={'space-between'}>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Time
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {entry.time}
              </Typography>
            </Stack>
          )}

          <Divider sx={{ my: 1 }}>Health indicators</Divider>
          {editMode ? (
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
          ) : (
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Glucose
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {entry.glucose} mmol/L
              </Typography>
            </Stack>
          )}

          {editMode ? (
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
          ) : (
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Bread units
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {entry.breadunits ? `${entry.breadunits} XE` : 'N/A'}
              </Typography>
            </Stack>
          )}

          <Divider sx={{ my: 1 }}>Insulins dose</Divider>
          {editMode ? (
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
          ) : (
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Bolus insulin
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {entry.bolusInsulin ? `${entry.bolusInsulin} units` : 'N/A'}
              </Typography>
            </Stack>
          )}

          {editMode ? (
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
          ) : (
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Basal insulin
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {entry.basalInsulin ? `${entry.basalInsulin} units` : 'N/A'}
              </Typography>
            </Stack>
          )}

          <Divider sx={{ my: 1 }}>Physical activity</Divider>
          {editMode ? (
            <CustomTextField
              label={'Activity'}
              value={formData.activity}
              handleChange={newValue => handleChange('activity')(newValue)}
              placeholder="Example: Running"
              type="text"
            />
          ) : (
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Activity
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {entry.activity ? `${entry.activity}` : 'N/A'}
              </Typography>
            </Stack>
          )}

          {editMode ? (
            <CustomTimePicker
              label={'Activity duration'}
              value={formData.activityDuration}
              handleChange={newValue =>
                handleChange('activityDuration')(newValue)
              }
            />
          ) : (
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Activity duration
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {entry.activityDuration ? `${entry.activityDuration}` : 'N/A'}
              </Typography>
            </Stack>
          )}

          <Divider sx={{ my: 1 }}>Subjective well-being</Divider>
          {editMode ? (
            <CustomTextField
              label={'Symptoms'}
              value={formData.symptoms}
              handleChange={newValue => handleChange('symptoms')(newValue)}
              placeholder="Example: Feeling good, Weakness, dizziness"
              type="text"
              multiline={true}
              rows={4}
            />
          ) : (
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Symptoms
              </Typography>
              <Typography
                variant="body1"
                textAlign="justify"
                sx={{
                  fontSize: 18,
                  maxWidth: 3 / 4,
                  textJustify: 'inter-word',
                  hyphens: 'auto',
                }}
              >
                {entry.symptoms ? `${entry.symptoms}` : 'N/A'}
              </Typography>
            </Stack>
          )}

          {editMode ? (
            <CustomTextField
              label={'Notes'}
              value={formData.notes}
              handleChange={newValue => handleChange('notes')(newValue)}
              placeholder="Example: Lunch: soup 250 grams, pasta with meat 300 grams, apple juice 200 grams"
              type="text"
              multiline={true}
              rows={4}
            />
          ) : (
            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                Notes
              </Typography>
              <Typography
                variant="body1"
                textAlign="justify"
                sx={{
                  fontSize: 18,
                  maxWidth: 3 / 4,
                  textJustify: 'inter-word',
                  hyphens: 'auto',
                }}
              >
                {entry.notes ? `${entry.notes}` : 'N/A'}
              </Typography>
            </Stack>
          )}

          {editMode ? (
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              fullWidth
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <></>
          )}

          {!editMode ? (
            <SpeedDial
              ariaLabel="Menu actions"
              sx={{ position: 'fixed', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map(action => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  slotProps={{
                    tooltip: { title: action.name, placement: 'left' },
                  }}
                  onClick={() => handleActionClick(action)}
                />
              ))}
            </SpeedDial>
          ) : (
            <></>
          )}
        </Container>
      ) : (
        <Container maxWidth="md" sx={{ marginTop: 10 }}>
          <Stack spacing={2}>
            <Skeleton variant="rounded" sx={{ height: 77 }} />
            <Skeleton variant="rounded" sx={{ height: 77 }} />
            <Skeleton variant="rounded" sx={{ height: 154 }} />
            <Skeleton variant="rounded" sx={{ height: 154 }} />
          </Stack>
        </Container>
      )}
    </>
  );
}

export default Entry;
