import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import React from 'react';

function GlucoseEpisodes({ chartData }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="column" alignItems="baseline" sx={{ pl: 1, py: 1 }}>
        <Typography variant="h5">Glucose Episodes</Typography>
      </Stack>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {chartData.month.monthStats.glucose.numOfHypo !== 0 ||
        chartData.month.monthStats.glucose.numOfHyper !== 0 ? (
          <PieChart
            series={[
              {
                data: [
                  {
                    label: 'Hypoglycemia count',
                    value: chartData.month.monthStats.glucose.numOfHypo,
                  },
                  {
                    label: 'Hyperglycemia count',
                    value: chartData.month.monthStats.glucose.numOfHyper,
                  },
                ],
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
                },
                valueFormatter: item => `${item.value}`,
              },
            ]}
            height={200}
            width={200}
          />
        ) : (
          <Typography
            variant="h3"
            component="p"
            sx={{ fontWeight: 'bold', color: 'grey.400' }}
            textAlign="center"
          >
            No data to display
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default GlucoseEpisodes;
