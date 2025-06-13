import { Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

function CustomDatePicker(props) {
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
        <DatePicker value={props.value} onChange={props.handleChange} />
      </LocalizationProvider>
    </Stack>
  );
}

export default CustomDatePicker;
