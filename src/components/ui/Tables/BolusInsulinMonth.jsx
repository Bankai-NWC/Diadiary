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

function BolusInsulinMonth({ chartData }) {
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
          Bolus Insulin
        </Typography>
        <Tooltip
          title={
            <>
              Total - total insulin consumed for the month.
              <br />
              <br />
              Average dose - average insulin dose per injection for the month.
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
              {chartData.month.monthStats.insulin.bolus.total} un.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Average Dose</TableCell>
            <TableCell align="right">
              {chartData.month.monthStats.insulin.bolus.avg} un.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BolusInsulinMonth;
