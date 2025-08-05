import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';

function MonthStats({ chartData }) {
  return (
    <TableContainer component={Paper}>
      <Box
        display="flex"
        sx={{
          paddingBlock: 1,
          paddingInline: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          fontWeight="bold"
        >
          Glucose
        </Typography>
        <Tooltip
          title={
            <>
              Average - your average blood glucose reading for the last month.
              <br />
              <br />
              Min. - the lowest blood glucose reading recorded for you this month.
              <br />
              <br />
              Max. - the highest blood glucose reading recorded for you this month.
            </>
          }
        >
          <IconButton>
            <InfoOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component="th">Average</TableCell>
            <TableCell align="right">
              {chartData.month.monthStats.glucose.avg} mmol/L
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Min.</TableCell>
            <TableCell align="right">
              {chartData.month.monthStats.glucose.min} mmol/L
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Max.</TableCell>
            <TableCell align="right">
              {chartData.month.monthStats.glucose.max} mmol/L
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MonthStats;
