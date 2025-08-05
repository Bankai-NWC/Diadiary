import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

function CustomTextField(props) {
  return (
    <Stack
      direction={{ sm: 'row', xs: 'column' }}
      spacing={2}
      sx={{
        alignItems: props.multiline
          ? { xs: 'center', sm: 'flex-start' }
          : 'center',
        justifyContent: 'space-between',
      }}
      paddingBlock={2}
    >
      <Typography variant="body1" sx={{ fontSize: 18 }}>
        {props.label}
        {props.required ? <span style={{ color: 'red' }}>&nbsp;*</span> : ''}
      </Typography>
      <TextField
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        type={props.type}
        sx={{ width: props.multiline ? { xs: '246px', sm: 3 / 4 } : '246px' }}
        error={!!props.error}
        helperText={props.helperText ? props.helperText : ''}
        multiline={props.multiline}
        rows={props.rows}
        slotProps={{
          input: {
            endAdornment: props.units ? (
              <InputAdornment position="end" sx={{width: 1/3, display: "flex", justifyContent: "flex-end"}}>{props.units}</InputAdornment>
            ) : null,
            inputProps:
              props.type === 'number'
                ? {
                    step: props.step,
                    min: props.min,
                    max: props.max,
                  }
                : {},
          },
        }}
      />
    </Stack>
  );
}

export default CustomTextField;
