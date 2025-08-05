import {
  Alert,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import GoogleLogo from '../../../../assets/google.svg';
import { auth } from '../../../../firebase';
import { setAlert } from '../../../../store/slices/alertSlice';
import { setUser } from '../../../../store/slices/userSlice';

const provider = new GoogleAuthProvider();

const RegisterForm = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const res = await axios.post(`${API_URL}/auth/firebase-auth`, {
        idToken,
      });
      dispatch(
        setAlert({
          message: 'Registration successful. Redirecting to login...',
          type: 'success',
        }),
      );
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        dispatch(
          setAlert({
            message: 'A user with this email address already exists.',
            type: 'error',
          }),
        );
      } else {
        dispatch(
          setAlert({
            message: 'Registration error: ' + error.message,
            type: 'error',
          }),
        );
      }
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await axios.post(`${API_URL}/auth/firebase-auth`, {
        idToken,
      });
      dispatch(setUser(res.data));
      navigate('/dashboard');
      dispatch(
        setAlert({
          message: 'You have successfully logged into your account.',
          type: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        setAlert({
          message: 'Error when logging in via Google: ' + error.message,
          type: 'error',
        }),
      );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
      }}
    >
      <Zoom in={!!alert.message} unmountOnExit>
        <Alert
          severity={alert.severity}
          sx={{ position: 'absolute', top: 200 }}
        >
          {alert.message}
        </Alert>
      </Zoom>

      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Sign up
      </Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <TextField
          id="email"
          label="E-mail"
          variant="standard"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Stack>
      <Stack sx={{ marginTop: 2, width: '100%' }} spacing={2}>
        <Button variant="contained" fullWidth onClick={handleRegister}>
          Sign up
        </Button>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ marginTop: 1 }}
        >
          Already have account?&nbsp;
          <RouterLink to="/login" style={{ textDecoration: 'none' }}>
            Sign in
          </RouterLink>
        </Typography>
        <Divider sx={{ my: 1 }}>OR</Divider>
        <Button startIcon={<GoogleLogo />} onClick={handleGoogle}>
          Sign in with Google
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
