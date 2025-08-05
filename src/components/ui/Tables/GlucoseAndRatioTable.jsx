import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

function GlucoseAndRatioTable({ dailyAverageGlucose, ic }) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Average Glucose</Typography>
            </TableCell>
            <TableCell component="th" align="right">
              <Typography variant="body1">
                {dailyAverageGlucose === 0 ? 0 : dailyAverageGlucose} mmol/L
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Insulin-to-carb ratio</Typography>
            </TableCell>
            <TableCell component="th" align="right">
              <Typography variant="body1">
                {ic === 0 ? 0 : ic} un. insulin to 1 XE
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GlucoseAndRatioTable;
