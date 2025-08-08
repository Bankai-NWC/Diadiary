import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

function TotalInsulin({dailyTotalInsulin, title}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: '100%',
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
        <Typography variant="h5">{title}</Typography>
      </Stack>
      <Divider />
      <Stack
        flex={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1">{dailyTotalInsulin}</Typography>
      </Stack>
    </Paper>
  );
}

export default TotalInsulin;
