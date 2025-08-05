import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import React from 'react';

function MonthOverview({ chartData, monthLineChartMin, monthLineChartMax }) {
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
        height: { xs: 487.02, sm: 459.02, lg: 459.02 },
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
          px: chartData.month.dates.length > 0 ? 2 : 0,
        }}
      >
        {chartData.month.dates.length > 0 ? (
          <LineChart
            grid={{ vertical: true, horizontal: true }}
            xAxis={[
              {
                scaleType: 'time',
                data: chartData.month.dates,
                min: chartData.month.dates[0],
                max: chartData.month.dates[chartData.month.dates.length - 1],
                valueFormatter: date => dayjs(date).format('DD MMM'),
                tickInterval: 'day',
                tickMinStep: 24 * 60 * 60 * 1000,
              },
            ]}
            series={[
              {
                label: 'Avarege Glucose',
                data: chartData.month.dayStats.glucoseAvg,
                yAxisId: 'glucoseAxis',
                showMark: true,
                color: chartColors.glucose,
              },
              {
                label: 'Total XE',
                data: chartData.month.dayStats.breadUnitsTotal,
                yAxisId: 'breadUnitsAxis',
                showMark: true,
                color: chartColors.breadUnits,
              },
              {
                label: 'Total Bolus',
                data: chartData.month.dayStats.bolusInsulinTotal,
                yAxisId: 'bolusAxis',
                showMark: true,
                color: chartColors.bolusInsulin,
              },
              {
                label: 'Total Basal',
                data: chartData.month.dayStats.basalInsulinTotal,
                yAxisId: 'basalAxis',
                showMark: true,
                color: chartColors.basalInsulin,
              },
            ]}
            yAxis={[
              {
                id: 'glucoseAxis',
                max: monthLineChartMax,
                min: monthLineChartMin,
                tickInterval: 'auto',
                tickMinStep: 1,
              },
              {
                id: 'breadUnitsAxis',
                max: monthLineChartMax,
                min: monthLineChartMin,
                tickInterval: 'auto',
              },
              {
                id: 'bolusAxis',
                max: monthLineChartMax,
                min: monthLineChartMin,
                tickInterval: 'auto',
              },
              {
                id: 'basalAxis',
                max: monthLineChartMax,
                min: monthLineChartMin,
                tickInterval: 'auto',
              },
            ]}
            height={380}
            margin={{ left: -10, right: 20 }}
          />
        ) : (
          <Typography
            variant="h3"
            component="p"
            sx={{ fontWeight: 'bold', color: 'grey.400' }}
          >
            No data to display
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default MonthOverview;
