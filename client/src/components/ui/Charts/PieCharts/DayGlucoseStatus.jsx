import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts';
import React from 'react';

function DayGlucoseStatus({ chartData }) {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const legendDirection = isXl ? 'vertical' : isMd ? 'horizontal' : 'column';

  const chartColors = {
    severelyLow: theme.palette.custom.red[300],
    low: theme.palette.custom.orange[300],
    normal: theme.palette.custom.green[300],
    high: theme.palette.custom.yellow[700],
    veryHigh: theme.palette.custom.red[400],
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: 380,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="column" alignItems="baseline" sx={{ pl: 1, py: 1 }}>
        <Typography variant="h5">Glucose Status</Typography>
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
        {chartData.day.glucoseValues.length > 0 ? (
          <PieChart
            series={[
              {
                data: [
                  {
                    label: 'Severely Low',
                    value: chartData.day.characterizedBy.severelyLow,
                    color: chartColors.severelyLow,
                  },
                  {
                    label: 'Low',
                    value: chartData.day.characterizedBy.low,
                    color: chartColors.low,
                  },
                  {
                    label: 'Normal',
                    value: chartData.day.characterizedBy.normal,
                    color: chartColors.normal,
                  },
                  {
                    label: 'High',
                    value: chartData.day.characterizedBy.high,
                    color: chartColors.high,
                  },
                  {
                    label: 'Very High',
                    value: chartData.day.characterizedBy.veryHigh,
                    color: chartColors.veryHigh,
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
            slotProps={{
              legend: {
                direction: legendDirection,
                position: {
                  vertical: 'middle',
                  horizontal: 'right',
                },
                padding: 16,
              },
            }}
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

export default DayGlucoseStatus;
