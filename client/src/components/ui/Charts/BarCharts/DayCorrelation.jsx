import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts';
import React from 'react';

function DayCorrelation({ chartData }) {
  const theme = useTheme();

  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const chartHeight = isLg ? 280 : isMd ? 220 : isSm ? 280 : isXs ? 280 : 220;
  const boxHeight = isLg ? 365 : isMd ? 365 : isSm ? 380 : isXs ? 380 : 380;

  const showChart =
    chartData.day.breadUnits.filter(
      item => item !== null && item !== undefined && item !== 0,
    ).length > 0 ||
    chartData.day.bolusInsulin.filter(
      item => item !== null && item !== undefined && item !== 0,
    ).length > 0 ||
    chartData.day.basalInsulin.filter(
      item => item !== null && item !== undefined && item !== 0,
    ).length > 0;

  return (
    <Paper
      variant="outlined"
      sx={{
        pb: 0.5,
        minHeight: boxHeight,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="column" alignItems="baseline" sx={{ pl: 1, py: 1 }}>
        <Typography variant="h5">Correlation of XE & Insulin</Typography>
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
        {showChart ? (
          <BarChart
            margin={{ left: -15 }}
            xAxis={[
              {
                scaleType: 'band',
                data: chartData.day.dates,
                valueFormatter: date => {
                  if (!date || isNaN(date.getTime())) return 'N/A';
                  return date.toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                },
                tickInterval: 'hour',
              },
            ]}
            series={[
              {
                data: chartData.day.bolusInsulin,
                label: 'Bolus Insulin',
                labelMarkType: 'line',
                color: theme.palette.custom.blue[400],
              },
              {
                data: chartData.day.basalInsulin,
                label: 'Basal Insulin',
                labelMarkType: 'line',
                color: theme.palette.custom.purple[500],
              },
              {
                data: chartData.day.breadUnits,
                label: 'XE',
                labelMarkType: 'line',
                color: theme.palette.custom.yellow[700],
              },
            ]}
            height={chartHeight}
            slotProps={{
              legend: {
                direction: 'horizontal',
                position: {
                  vertical: 'middle',
                  horizontal: 'center',
                },
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

export default DayCorrelation;
