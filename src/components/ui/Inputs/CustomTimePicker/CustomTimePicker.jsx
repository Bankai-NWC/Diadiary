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
        {props.required ? <span style={{ color: 'red' }}>&nbsp;*</span> : ''}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={props.value}
          onChange={props.handleChange}
          views={['hours', 'minutes']}
          ampm={false}
          format="HH:mm"
          slotProps={{
            textField: {
              error: !!props.error,
              helperText: props.helperText ? props.helperText : '',
              placeholder: props.placeholder,
              sx: { width: '246px' },
            },
            layout: {
              sx: {
                '.MuiMultiSectionDigitalClock-root': {
                  width: '163px',
                },
                '.MuiPickersLayout-contentWrapper': {
                  gridColumn: '2 / 2',
                },
                '.MuiMultiSectionDigitalClockSection-root': {
                  width: '50%',
                  overflowY: 'auto',
                },
                '.MuiMultiSectionDigitalClock-root > div:nth-of-type(3)': {
                  display: 'none',
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default CustomTimePicker;
