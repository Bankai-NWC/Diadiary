import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

function AvgGlucose({dailyAverageGlucose}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: { md: 385, sm: '100%', xs: '100%' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        direction="row"
        alignItems="baseline"
        spacing={1}
        sx={{ pl: 1, py: 1 }}
      >
        <Typography variant="h5">Average Glucose</Typography>
      </Stack>
      <Divider />
      <Stack
        flex={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1">
          {dailyAverageGlucose !== 0 ? dailyAverageGlucose : '--'}
        </Typography>
      </Stack>
      {/* Сделать короткую справку по среднему уровню глюкозы */}
    </Paper>
  );
}

export default AvgGlucose;
