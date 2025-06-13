import { Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React from 'react';

function CustomTimePicker(props) {
  return (
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
        {props.label}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={props.value}
          onChange={props.handleChange}
          views={['hours', 'minutes']}
          ampm={false}
          format="HH:mm"
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default CustomTimePicker;
