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

function BreadUnitsMonth({ chartData }) {
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
          Bread Units
        </Typography>
        <Tooltip
          title={
            <>
              Total - monthly sum of carbohydrate units.
              <br />
              <br />
              Avg. Morning - average carbohydrate units consumed in the morning.
              <br />
              <br />
              Avg. Day - average carbohydrate units consumed during daytime.
              <br />
              <br />
              Avg. Evening - average carbohydrate units consumed in the evening.
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
            <TableCell component="th">Total</TableCell>
            <TableCell align="right">
              {chartData.month.monthStats.breadUnits.total} XE
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Avg. Morning</TableCell>
            <TableCell align="right">
              {chartData.month.monthStats.breadUnits.avgMorning} XE
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Avg. Day</TableCell>
            <TableCell align="right">
              {chartData.month.monthStats.breadUnits.avgDay} XE
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Avg. Evening</TableCell>
            <TableCell align="right">
              {chartData.month.monthStats.breadUnits.avgEvening} XE
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BreadUnitsMonth;
