import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

function CustomCard(props) {
  const theme = useTheme();

  const chartColors = {
    severelyLow: theme.palette.custom.red[300],
    low: theme.palette.custom.orange[300],
    normal: theme.palette.custom.green[300],
    high: theme.palette.custom.yellow[700],
    veryHigh: theme.palette.custom.red[400],
  };

  const propsItems = [
    {
      label: 'Glucose',
      value: `${props.glucose} mmol/L`,
    },
    {
      label: 'Bread units',
      value: props.breadUnits ? `${props.breadUnits} XE` : 'N/A',
    },
    {
      label: 'Bolus insulin',
      value: props.bolusInsulin ? `${props.bolusInsulin} units` : 'N/A',
    },
    {
      label: 'Basal insulin',
      value: props.basalInsulin ? `${props.basalInsulin} units` : 'N/A',
    },
  ];

  return (
    <Paper variant="outlined" sx={{ marginTop: 2 }}>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ flex: 1, alignItems: 'baseline' }}
        >
          <Typography variant="h6" gutterBottom>
            {dayjs(props.date).format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="subtitle1" color="grey.600" gutterBottom>
            {props.time}
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Chip
            label={props.characterizedBy}
            variant="outlined"
            color={
              props.characterizedBy === 'Severely Low'
                ? theme.palette.custom.red[300]
                : props.characterizedBy === 'Low'
                  ? chartColors.low
                  : props.characterizedBy === 'Normal'
                    ? chartColors.normal
                    : props.characterizedBy === 'High'
                      ? chartColors.high
                      : chartColors.veryHigh
            }
            sx={{
              width: { xs: 'auto', sm: '96px' },
              color: theme => {
                switch (props.characterizedBy) {
                  case 'Severely Low':
                    return theme.palette.custom.red[900];
                  case 'Low':
                    return theme.palette.custom.orange[700];
                  case 'Normal':
                    return theme.palette.custom.green[700];
                  case 'High':
                    return theme.palette.custom.yellow[900];
                  default:
                    return theme.palette.custom.red[900];
                }
              },
              borderColor: theme => {
                switch (props.characterizedBy) {
                  case 'Severely Low':
                    return theme.palette.custom.red[900];
                  case 'Low':
                    return theme.palette.custom.orange[700];
                  case 'Normal':
                    return theme.palette.custom.green[700];
                  case 'High':
                    return theme.palette.custom.yellow[900];
                  default:
                    return theme.palette.custom.red[900];
                }
              },
              backgroundColor: theme => {
                switch (props.characterizedBy) {
                  case 'Severely Low':
                    return theme.palette.custom.red[10];
                  case 'Low':
                    return theme.palette.custom.orange[10];
                  case 'Normal':
                    return theme.palette.custom.green[10];
                  case 'High':
                    return theme.palette.custom.yellow[10];
                  default:
                    return theme.palette.custom.red[10];
                }
              },
            }}
          />
        </Box>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ py: 2 }}
      >
        {propsItems.map((item, index, array) => (
          <React.Fragment key={index}>
            <Box
              sx={{
                flex: 1,
                display: {
                  xs:
                    item.label === 'Bolus insulin'
                      ? 'none'
                      : item.label === 'Basal insulin'
                        ? 'none'
                        : 'flex',
                  sm: 'flex',
                },
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
              }}
            >
              <Typography variant="body1" textAlign="center">
                {item.label}:{' '}
                <Typography
                  component="span"
                  sx={{ fontWeight: 'bold' }}
                  display="inline"
                >
                  {item.value}
                </Typography>
              </Typography>
            </Box>

            {index !== array.length - 1 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: {
                    xs:
                      item.label === 'Bolus insulin'
                        ? 'none'
                        : item.label === 'Basal insulin'
                          ? 'none'
                          : item.label === 'Bread units'
                            ? 'none'
                            : 'flex',
                    sm: 'flex',
                  },
                  alignSelf: 'stretch',
                  borderColor: 'grey.300',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Stack>
      <Button component={RouterLink} to={`/entries/${props.id}`} fullWidth>
        View more
      </Button>
    </Paper>
  );
}

export default React.memo(CustomCard);
