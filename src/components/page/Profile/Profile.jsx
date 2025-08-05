import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

import { auth } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import { setAlert } from '../../../store/slices/alertSlice';
import { setUser } from '../../../store/slices/userSlice';

function Profile() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const {
    name,
    surname,
    gender,
    dateOfIllness,
    basalInsulin,
    bolusInsulin,
    anamnesis,
  } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    gender: '',
    dateOfIllness: dayjs(),
    basalInsulin: '',
    bolusInsulin: '',
    anamnesis: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      name: name || '',
      surname: surname || '',
      gender: gender || '',
      dateOfIllness: dateOfIllness ? dayjs(dateOfIllness) : dayjs(),
      basalInsulin: basalInsulin || '',
      bolusInsulin: bolusInsulin || '',
      anamnesis: anamnesis || '',
    });
  }, [
    name,
    surname,
    gender,
    dateOfIllness,
    basalInsulin,
    bolusInsulin,
    anamnesis,
  ]);

  const handleChange = field => event => {
    const value = event?.target?.value ?? event;
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEditClick = async updatedFields => {
    if (editMode) {
      try {
        const idToken = await auth.currentUser.getIdToken();

        const response = await axios.patch(
          `${API_URL}/api/user/update`,
          updatedFields,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );

        if (response.status === 200) {
          dispatch(setUser(response.data.user));
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
          dispatch(
            setAlert({ message: 'Data successfully updated', type: 'success' }),
          );
          setEditMode(false);
        }
      } catch (error) {
        console.error(error);
        dispatch(setAlert({ message: 'Error updating data', type: 'error' }));
      }
    } else {
      setEditMode(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Diadiary | Profile</title>
      </Helmet>
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {`${name ? name : ''} ${surname ? surname : ''}`}
          </Typography>
          <Button onClick={() => handleEditClick(formData)}>
            {editMode ? 'Save' : 'Edit'}
          </Button>
        </Stack>
        <Divider sx={{ my: 1 }} />

        {/* Gender */}
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
            Gender
          </Typography>
          {editMode ? (
            <RadioGroup
              row
              value={formData.gender}
              onChange={handleChange('gender')}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
          ) : (
            <Typography variant="body1" sx={{ fontSize: 18 }}>
              {formData.gender || 'Not specified'}
            </Typography>
          )}
        </Stack>
        <Divider sx={{ my: 1 }} />

        {/* Date of illness */}
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}
          paddingBlock={2}
        >
          <Typography variant="body1" sx={{ fontSize: 18 }}>
            Date of illness
          </Typography>
          {editMode ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formData.dateOfIllness}
                onChange={newValue => handleChange('dateOfIllness')(newValue)}
              />
            </LocalizationProvider>
          ) : (
            <Typography variant="body1" sx={{ fontSize: 18 }}>
              {formData.dateOfIllness
                ? dayjs(formData.dateOfIllness).format('YYYY-MM-DD')
                : 'Not specified'}
            </Typography>
          )}
        </Stack>
        <Divider sx={{ my: 1 }} />

        {/* Insulin */}
        <Stack paddingBlock={2}>
          <Stack
            direction={{ sm: 'row', xs: 'column' }}
            spacing={2}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body1" sx={{ fontSize: 18 }}>
              Bolus insulin
            </Typography>
            {editMode ? (
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="bolus-insulin-label">Bolus insulin</InputLabel>
                <Select
                  labelId="bolus-insulin-label"
                  id="bolus-insulin-select"
                  value={formData.bolusInsulin}
                  onChange={handleChange('bolusInsulin')}
                  label="bolus-insulin"
                >
                  <MenuItem value="Humalog">Humalog</MenuItem>
                  <MenuItem value="NovoRapid">NovoRapid</MenuItem>
                  <MenuItem value="Apidra">Apidra</MenuItem>
                  <MenuItem value="Fiasp">Fiasp</MenuItem>
                  <MenuItem value="Lyumjev">Lyumjev</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {formData.bolusInsulin || 'Not specified'}
              </Typography>
            )}
          </Stack>
          {editMode && <Box sx={{ mt: 4 }} />}
          <Stack
            direction={{ sm: 'row', xs: 'column' }}
            spacing={2}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body1" sx={{ fontSize: 18 }}>
              Basal insulin
            </Typography>
            {editMode ? (
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="long-insulin-label">Basal insulin</InputLabel>
                <Select
                  labelId="long-insulin-label"
                  id="long-acting-insulin-select"
                  value={formData.basalInsulin}
                  onChange={handleChange('basalInsulin')}
                  label="Long-acting insulin"
                >
                  <MenuItem value="Lantus">Lantus</MenuItem>
                  <MenuItem value="Toujeo">Toujeo</MenuItem>
                  <MenuItem value="Tresiba">Tresiba</MenuItem>
                  <MenuItem value="Levemir">Levemir</MenuItem>
                  <MenuItem value="Basaglar">Basaglar</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {formData.basalInsulin || 'Not specified'}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />

        {/* Anamnesis */}
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
          }}
          paddingBlock={2}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: 18, textAlign: { xs: 'center' } }}
          >
            Anamnesis
          </Typography>
          <Stack
            direction="row"
            width={{ sm: 3 / 4, xs: 1 }}
            maxHeight={300}
            sx={{ justifyContent: { sm: 'flex-end', xs: 'center' } }}
          >
            {editMode ? (
              <TextField
                multiline
                rows={4}
                fullWidth
                value={formData.anamnesis}
                onChange={handleChange('anamnesis')}
              />
            ) : (
              <Typography
                variant="body1"
                textAlign="justify"
                sx={{
                  fontSize: 18,
                  textAlign: 'justify',
                  maxWidth: { sm: 3 / 4, xs: 1 },
                  textWrap: 'wrap',
                  textJustify: 'inter-word',
                  hyphens: 'auto',
                }}
              >
                {formData.anamnesis || 'Not specified'}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />
      </Container>
    </>
  );
}

export default Profile;
