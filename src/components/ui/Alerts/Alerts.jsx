import { Alert, Slide, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearAlert } from '../../../store/slices/alertSlice';

function Alerts() {
  const dispatch = useDispatch();
  const alertState = useSelector(state => state.alert.alert);

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    if (alertState) {
      setAlertMessage(alertState.message);
      setAlertSeverity(alertState.type || 'success');
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [alertState]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

    dispatch(clearAlert());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      slots={{ transition: Slide }}
      slotProps={{ transition: { direction: 'left' } }}
      sx={{ position: 'absolute', mt: 8, overflow: 'hidden' }}
      onClose={handleClose}
    >
      <Alert severity={alertSeverity} onClose={handleClose} sx={{maxWidth: '300px'}}>{alertMessage}</Alert>
    </Snackbar>
  );
}

export default Alerts;
