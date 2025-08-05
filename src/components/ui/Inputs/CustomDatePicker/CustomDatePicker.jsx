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
        {props.required ? <span style={{ color: 'red' }}>&nbsp;*</span> : ''}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="DD/MM/YYYY"
          value={props.value}
          onChange={props.handleChange}
          maxDate={props.maxDate}
          slotProps={{
            textField: {
              error: !!props.error,
              helperText: props.helperText ? props.helperText : '',
              placeholder: props.placeholder,
              sx: { width: '246px' },
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default CustomDatePicker;
