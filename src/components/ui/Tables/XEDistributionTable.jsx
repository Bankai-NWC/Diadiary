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

function XEDistributionTable({ breadUnitsStatistics }) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Total XE</Typography>
            </TableCell>
            <TableCell component="th" align="right">
              <Typography variant="body1">
                {breadUnitsStatistics.total === 0
                  ? 0
                  : breadUnitsStatistics.total}{' '}
                XE
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Morning XE</Typography>
            </TableCell>
            <TableCell component="th" align="right">
              <Typography variant="body1">
                {breadUnitsStatistics.morning === 0
                  ? 0
                  : breadUnitsStatistics.morning}{' '}
                XE
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Day XE</Typography>
            </TableCell>
            <TableCell component="th" align="right">
              <Typography variant="body1">
                {breadUnitsStatistics.day === 0
                  ? 0
                  : breadUnitsStatistics.day}{' '}
                XE
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Evening XE</Typography>
            </TableCell>
            <TableCell component="th" align="right">
              <Typography variant="body1">
                {breadUnitsStatistics.evening === 0
                  ? 0
                  : breadUnitsStatistics.evening}{' '}
                XE
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default XEDistributionTable;
