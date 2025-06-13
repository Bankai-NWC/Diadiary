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
import { setUser } from '../../../../store/slices/userSlice';

const provider = new GoogleAuthProvider();

const RegisterForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ severity: '', message: '' });
  const alertTimeoutRef = useRef(null);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const res = await axios.post(
        'http://localhost:5000/api/auth/firebase-auth',
        { idToken },
      );

      setAlert({
        severity: 'success',
        message: 'Registration successful. Redirecting to login...',
      });
      alertTimeoutRef.current = setTimeout(() => {
        setAlert({ severity: '', message: '' });
        navigate('/login');
      }, 3000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('A user with this email address already exists.');
        setAlert({
          severity: 'error',
          message: 'A user with this email address already exists.',
        });
        alertTimeoutRef.current = setTimeout(() => {
          setAlert({ severity: '', message: '' });
        }, 3000);
      } else {
        setAlert({
          severity: 'error',
          message: 'Registration error: ' + error.message,
        });
        alertTimeoutRef.current = setTimeout(() => {
          setAlert({ severity: '', message: '' });
        }, 3000);
        console.log('Registration error: ' + error.message);
      }
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await axios.post(
        'http://localhost:5000/api/auth/firebase-auth',
        { idToken },
      );
      dispatch(setUser(res.data));

      navigate('/dashboard');
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Error when logging in via Google: ' + error.message,
      });
      alertTimeoutRef.current = setTimeout(() => {
        setAlert({ severity: '', message: '' });
      }, 3000);
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
