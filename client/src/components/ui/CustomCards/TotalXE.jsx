import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

function TotalXE({ dailyTotalBreadUnits }) {
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
        <Typography variant="h5">Total XE</Typography>
      </Stack>
      <Divider />
      <Stack direction="column" flex={1} maxHeight="50%" alignItems="center" justifyContent="center">
        <Typography variant="h1">
          {dailyTotalBreadUnits !== 0 ? dailyTotalBreadUnits : '--'}
        </Typography>
      </Stack>
      {/* Сделайть подсчет углеводов */}
    </Paper>
  );
}

export default TotalXE;
