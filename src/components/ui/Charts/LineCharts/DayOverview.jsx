import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts';
import React from 'react';

function DayOverviewChart({ chartData, dailyLineChartMin, dailyLineChartMax }) {
  const theme = useTheme();

  const chartColors = {
    glucose: theme.palette.custom.red[300],
    breadUnits: theme.palette.custom.yellow[700],
    bolusInsulin: theme.palette.custom.blue[400],
    basalInsulin: theme.palette.custom.purple[500],
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
      <Stack
        direction="row"
        alignItems="baseline"
        spacing={1}
        sx={{ pl: 1, py: 1 }}
      >
        <Typography variant="h5">Overview</Typography>
      </Stack>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: chartData.day.glucoseValues.length > 0 ? 2 : 0,
        }}
      >
        {chartData.day.glucoseValues.length > 0 ? (
          <LineChart
            grid={{ vertical: true, horizontal: true }}
            xAxis={[
              {
                scaleType: 'time',
                data: chartData.day.dates,
                min: chartData.day.dates[0],
                max: chartData.day.dates[chartData.day.dates.length - 1],
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
                label: 'Glucose',
                data: chartData.day.glucoseValues,
                yAxisKey: 'glucoseAxis',
                showMark: true,
                color: chartColors.glucose,
              },
              {
                label: 'XE',
                data: chartData.day.breadUnits,
                yAxisKey: 'breadAxis',
                showMark: true,
                color: chartColors.breadUnits,
              },
              {
                label: 'Bolus Insulin',
                data: chartData.day.bolusInsulin,
                yAxisKey: 'bolusInsulinAxis',
                showMark: true,
                color: chartColors.bolusInsulin,
              },
              {
                label: 'Basal Insulin',
                data: chartData.day.basalInsulin,
                yAxisKey: 'basalInsulinAxis',
                showMark: true,
                color: chartColors.basalInsulin,
              },
            ]}
            yAxis={[
              {
                id: 'glucoseAxis',
                min: dailyLineChartMin,
                max: dailyLineChartMax,
                tickInterval: 'auto',
              },
              {
                id: 'breadAxis',
                scaleType: 'linear',
                tickInterval: 'auto',
              },
              {
                id: 'bolusInsulinAxis',
                scaleType: 'linear',
                tickInterval: 'auto',
              },
              {
                id: 'basalInsulinAxis',
                scaleType: 'linear',
                tickInterval: 'auto',
              },
            ]}
            height={300}
            margin={{ left: 15, right: 45 }}
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

export default DayOverviewChart;
