import {
  Button,
  Container,
  Divider,
  Drawer,
  Pagination,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { auth } from '../../../firebase';
import CardList from '../../ui/CardList/CardList';

export default function Entries() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  const minDistance = 5;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState(dayjs().startOf('year'));
  const [endDate, setEndDate] = useState(dayjs());
  const [glucoseRange, setGlucoseRange] = useState([0, 50]);
  const [bolusInsulinRange, setbolusInsulinRange] = useState([0, 100]);
  const [basalInsulinRange, setbasalInsulinRange] = useState([0, 100]);

  const fetchEntries = async (page = 1, limit = 4, filterParams = {}) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const idToken = await auth.currentUser.getIdToken();

      const params = {
        page,
        limit,
        ...filterParams,
      };

      const response = await axios.get(`${API_URL}/api/entries`, {
        params: params,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      setEntries(response.data.entries);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filters = {};
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (glucoseRange[0] !== 0 || glucoseRange[1] !== 50) {
      filters.minGlucose = glucoseRange[0];
      filters.maxGlucose = glucoseRange[1];
    }
    if (bolusInsulinRange[0] !== 0 || bolusInsulinRange[1] !== 100) {
      filters.minShortInsulin = bolusInsulinRange[0];
      filters.maxShortInsulin = bolusInsulinRange[1];
    }
    if (basalInsulinRange[0] !== 0 || basalInsulinRange[1] !== 100) {
      filters.minLongInsulin = basalInsulinRange[0];
      filters.maxLongInsulin = basalInsulinRange[1];
    }

    console.log('Applying filters:', filters);
    fetchEntries(1, 4, filters);
    if (isXs) {
      setDrawerOpen(false);
    }
  };

  const resetFilters = () => {
    const filters = {};
    setStartDate(dayjs().subtract(1, 'year'));
    setEndDate(dayjs());
    setGlucoseRange([0, 50]);
    setbolusInsulinRange([0, 100]);
    setbasalInsulinRange([0, 100]);

    fetchEntries(1, 4, filters);

    if (isXs) {
      setDrawerOpen(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const filters = {};
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (glucoseRange[0] !== 0 || glucoseRange[1] !== 50) {
      filters.minGlucose = glucoseRange[0];
      filters.maxGlucose = glucoseRange[1];
    }
    if (bolusInsulinRange[0] !== 0 || bolusInsulinRange[1] !== 100) {
      filters.minShortInsulin = bolusInsulinRange[0];
      filters.maxShortInsulin = bolusInsulinRange[1];
    }
    if (basalInsulinRange[0] !== 0 || basalInsulinRange[1] !== 100) {
      filters.minLongInsulin = basalInsulinRange[0];
      filters.maxLongInsulin = basalInsulinRange[1];
    }

    fetchEntries(value, 4, filters);
  };

  const handleChangeGlucose = (event, newValue, activeThumb) => {
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 50 - minDistance);
        setGlucoseRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setGlucoseRange([clamped - minDistance, clamped]);
      }
    } else {
      setGlucoseRange(newValue);
    }
  };

  const handleChangeShortInsulin = (event, newValue, activeThumb) => {
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setbolusInsulinRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setbolusInsulinRange([clamped - minDistance, clamped]);
      }
    } else {
      setbolusInsulinRange(newValue);
    }
  };

  const handleChangeLongInsulin = (event, newValue, activeThumb) => {
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setbasalInsulinRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setbasalInsulinRange([clamped - minDistance, clamped]);
      }
    } else {
      setbasalInsulinRange(newValue);
    }
  };

  const toggleDrawer = state => {
    setDrawerOpen(state);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchEntries(currentPage, 4);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Helmet>
        <title>Diadiary | Entries</title>
      </Helmet>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 10,
          marginBottom: 2,
          width: '100%',
          paddingInline: { xs: 2, sm: 2, md: 2, lg: 0, xl: 0 },
        }}
      >
        {entries.length !== 0 ? (
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={0}
            sx={{ mb: 4 }}
          >
            {isXs ? (
              <>
                <Stack direction="row" justifyContent="flex-end">
                  <Button onClick={() => toggleDrawer(true)}>Filters</Button>
                  <Drawer
                    anchor="bottom"
                    open={drawerOpen}
                    onClose={() => toggleDrawer(false)}
                  >
                    <Stack
                      direction="column"
                      spacing={2}
                      sx={{ p: 2 }}
                      display="flex"
                    >
                      <Typography variant="h6" gutterBottom>
                        Filters
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mb: 2 }}
                        alignItems="center"
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Date from"
                            type="date"
                            maxDate={endDate}
                            value={startDate}
                            onChange={newValue => setStartDate(newValue)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            format="DD/MM/YYYY"
                          />
                        </LocalizationProvider>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mb: 2 }}
                        alignItems="center"
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Date to"
                            type="date"
                            minDate={startDate}
                            value={endDate}
                            onChange={newValue => setEndDate(newValue)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            format="DD/MM/YYYY"
                          />
                        </LocalizationProvider>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mb: 2 }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Stack
                          direction="column"
                          spacing={0.5}
                          sx={{ width: '95%' }}
                        >
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="text.secondary"
                          >
                            Glucose (mmol/L)
                          </Typography>
                          <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={glucoseRange}
                            onChange={handleChangeGlucose}
                            valueLabelDisplay="auto"
                            min={0}
                            max={50}
                            step={1}
                            disableSwap
                          />
                        </Stack>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mb: 2 }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Stack
                          direction="column"
                          spacing={0.5}
                          sx={{ width: '95%' }}
                        >
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="text.secondary"
                          >
                            Bolus insulin (units)
                          </Typography>
                          <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={bolusInsulinRange}
                            onChange={handleChangeShortInsulin}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                            step={1}
                            disableSwap
                          />
                        </Stack>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mb: 2 }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Stack
                          direction="column"
                          spacing={0.5}
                          sx={{ width: '95%' }}
                        >
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="text.secondary"
                          >
                            Basal insulin (units)
                          </Typography>
                          <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={basalInsulinRange}
                            onChange={handleChangeLongInsulin}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                            step={1}
                            disableSwap
                            sx={{ width: '100%' }}
                          />
                        </Stack>
                      </Stack>

                      <Button
                        variant="contained"
                        onClick={applyFilters}
                        disabled={entries.length === 0}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={resetFilters}
                        disabled={entries.length === 0}
                      >
                        Reset
                      </Button>
                    </Stack>
                  </Drawer>
                </Stack>
                <Divider sx={{ mt: 0.5, mb: 2 }} />
              </>
            ) : (
              <Stack
                direction="column"
                spacing={2}
                sx={{ mr: 4, pr: 2 }}
                display={{ xs: 'none', md: 'flex' }}
              >
                <Typography variant="h6" gutterBottom>
                  Filters
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mb: 2 }}
                  alignItems="center"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date from"
                      type="date"
                      maxDate={endDate}
                      value={startDate}
                      onChange={newValue => setStartDate(newValue)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mb: 2 }}
                  alignItems="center"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date to"
                      type="date"
                      minDate={startDate}
                      value={endDate}
                      onChange={newValue => setEndDate(newValue)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mb: 2 }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Stack direction="column" spacing={0.5} sx={{ width: '95%' }}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                    >
                      Glucose (mmol/L)
                    </Typography>
                    <Slider
                      getAriaLabel={() => 'Minimum distance'}
                      value={glucoseRange}
                      onChange={handleChangeGlucose}
                      valueLabelDisplay="auto"
                      min={0}
                      max={50}
                      step={1}
                      disableSwap
                    />
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mb: 2 }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Stack direction="column" spacing={0.5} sx={{ width: '95%' }}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                    >
                      Bolus insulin (units)
                    </Typography>
                    <Slider
                      getAriaLabel={() => 'Minimum distance'}
                      value={bolusInsulinRange}
                      onChange={handleChangeShortInsulin}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      step={1}
                      disableSwap
                    />
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mb: 2 }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Stack direction="column" spacing={0.5} sx={{ width: '95%' }}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                    >
                      Basal insulin (units)
                    </Typography>
                    <Slider
                      getAriaLabel={() => 'Minimum distance'}
                      value={basalInsulinRange}
                      onChange={handleChangeLongInsulin}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      step={1}
                      disableSwap
                      sx={{ width: '100%' }}
                    />
                  </Stack>
                </Stack>

                <Button
                  variant="contained"
                  onClick={applyFilters}
                  disabled={entries.length === 0}
                >
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  onClick={resetFilters}
                  disabled={entries.length === 0}
                >
                  Reset
                </Button>
              </Stack>
            )}

            <Stack
              direction="column"
              justifyContent="space-between"
              spacing={2}
              sx={{
                flexGrow: 1,
                position: 'relative',
                height: '85vh',
                gap: 2,
                bottom: 0,
              }}
            >
              <CardList loading={loading} entries={entries} />

              <Stack
                display={entries.length === 0 ? 'none' : 'flex'}
                sx={{
                  pb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {entries.length != 0 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Stack height={'85vh'} direction="column" justifyContent="center">
            <Typography
              variant="h3"
              component="p"
              sx={{ fontWeight: 'bold', color: 'divider' }}
              textAlign="center"
            >
              Entries not found
            </Typography>
          </Stack>
        )}
      </Container>
    </>
  );
}
