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
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import GoogleLogo from '../../../../assets/google.svg';
import { auth } from '../../../../firebase';
import { setUser } from '../../../../store/slices/userSlice';

const provider = new GoogleAuthProvider();

const LoginForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ severity: '', message: '' });
  const alertTimeoutRef = useRef(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
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
      dispatch(setUser(res.data));
      sessionStorage.setItem('user', JSON.stringify(res.data));

      navigate('/dashboard');
    } catch (error) {
      let errorMessage = error.message;

      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Incorrect e-mail or password';
      } else {
        errorMessage = `Login error: ${error.message}`;
      }

      setAlert({
        severity: 'error',
        message: errorMessage,
      });
      alertTimeoutRef.current = setTimeout(() => {
        setAlert({ severity: '', message: '' });
      }, 3000);
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
      sessionStorage.setItem('user', JSON.stringify(res.data));

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
        Sign in
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
        <Button variant="contained" fullWidth onClick={handleLogin}>
          Sign in
        </Button>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ marginTop: 1 }}
        >
          Don't have an account yet?&nbsp;
          <RouterLink to="/register" style={{ textDecoration: 'none' }}>
            Sign up
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

export default LoginForm;
