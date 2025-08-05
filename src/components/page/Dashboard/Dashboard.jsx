import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
} from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { pdf } from '@react-pdf/renderer';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { auth } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import { useProcessedEntries } from '../../../hooks/useProcessedEntries';
import MonthStatsPDF from '../../ui/PDF/MonthStatsPDF';

const DayOverview = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Charts/LineCharts/DayOverview'));
      }, 1200);
    }),
);
const DayCorrelation = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Charts/BarCharts/DayCorrelation'));
      }, 1200);
    }),
);
const DayGlucoseStatus = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Charts/PieCharts/DayGlucoseStatus'));
      }, 1200);
    }),
);
const GlucoseAndRatioTable = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Tables/GlucoseAndRatioTable'));
      }, 1200);
    }),
);
const XEDistributionTable = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Tables/XEDistributionTable'));
      }, 1200);
    }),
);
const MonthOverview = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Charts/LineCharts/MonthOverview'));
      }, 1200);
    }),
);
const GlucoseEpisodes = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Charts/PieCharts/GlucoseEpisodes'));
      }, 1200);
    }),
);
const TotalInsulins = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Charts/PieCharts/TotalInsulins'));
      }, 1200);
    }),
);
const GlucoseMonth = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Tables/GlucoseMonth'));
      }, 1200);
    }),
);
const BreadUnitsMonth = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Tables/BreadUnitsMonth'));
      }, 1200);
    }),
);
const BolusInsulinMonth = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Tables/BolusInsulinMonth'));
      }, 1200);
    }),
);
const BasalInsulinMonth = lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../../ui/Tables/BasalInsulinMonth'));
      }, 1200);
    }),
);

dayjs.extend(utc);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const { name, surname, basalInsulin, bolusInsulin } = useAuth();

  const [entries, setEntries] = useState([]);
  const [chartData, setChartData] = useState({
    day: {
      dates: [],
      glucoseValues: [],
      bolusInsulin: [],
      basalInsulin: [],
      breadUnits: [],
      characterizedBy: {
        severelyLow: 0,
        low: 0,
        normal: 0,
        high: 0,
        veryHigh: 0,
      },
    },
    month: {
      dates: [],
      valuesByDay: {},
      allGlucoseValues: [],
      allBreadUnitsValues: [],
      allBolusInsulinValues: [],
      allBasalInsulinValues: [],
      monthStats: {
        glucose: {
          min: 0,
          max: 0,
          avg: 0,
          numOfHypo: 0,
          numOfHyper: 0,
        },
        breadUnits: {
          total: 0,
          avgMorning: 0,
          avgDay: 0,
          avgEvening: 0,
          byTime: { morning: [], day: [], evening: [] },
        },
        insulin: {
          bolus: {
            total: 0,
            avg: 0,
          },
          basal: {
            total: 0,
            avg: 0,
          },
        },
      },
      dayStats: {
        glucoseAvg: [],
        breadUnitsTotal: [],
        bolusInsulinTotal: [],
        basalInsulinTotal: [],
      },
    },
  });
  const [value, setValue] = useState(0);
  const [breadUnitsStatistics, setBreadUnitsStatistics] = useState({
    total: 0,
    morning: 0,
    day: 0,
    evening: 0,
  });
  const [ic, setIC] = useState(0);
  const groupedMonthData = useProcessedEntries(entries);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDownloadPDF = async () => {
    const blob = await pdf(
      <MonthStatsPDF
        chartData={chartData}
        userData={{ name, surname, basalInsulin, bolusInsulin }}
      />,
    ).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `month_statistic.pdf`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const allDayChartData = [
    ...(chartData.day.glucoseValues || []),
    ...(chartData.day.breadUnits || []),
    ...(chartData.day.bolusInsulin || []),
    ...(chartData.day.basalInsulin || []),
  ];
  const allMonthChartData = [
    ...(chartData.month.dayStats.glucoseAvg || []),
    ...(chartData.month.dayStats.breadUnitsTotal || []),
    ...(chartData.month.dayStats.bolusInsulinTotal || []),
    ...(chartData.month.dayStats.basalInsulinTotal || []),
  ];
  const dailyLineChartMin = Math.min(...allDayChartData) - 2;
  const dailyLineChartMax = Math.max(...allDayChartData) + 2;
  const monthLineChartMin = Math.min(...allMonthChartData) - 2;
  const monthLineChartMax = Math.max(...allMonthChartData) + 2;
  const glucoseValues = chartData.day.glucoseValues;
  const dailyAverageGlucose =
    glucoseValues.length > 0
      ? (
          glucoseValues.reduce((acc, val) => acc + val, 0) /
          glucoseValues.length
        ).toFixed(1)
      : 0;

  const fetchEntries = async (page = 1, limit = 999999, filterParams = {}) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const idToken = await auth.currentUser.getIdToken();

      const params = {
        page,
        limit,
        ...filterParams,
      };

      const response = await axios.get('http://localhost:5000/api/entries', {
        params: params,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      setEntries(response.data.entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchEntries(1, 9999);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!entries.length) return;
    const today = dayjs(dayjs()).startOf('day');

    const todayEntries = entries.filter(entry => {
      const entryDateUTC = dayjs(entry.date).utc();
      const entryLocal = entryDateUTC.local();

      return entryLocal.isSame(today, 'day');
    });

    const times = [];
    const glucoseValues = [];
    const bolusInsulin = [];
    const basalInsulin = [];
    const breadUnits = [];

    let severelyLow = 0;
    let low = 0;
    let normal = 0;
    let high = 0;
    let veryHigh = 0;

    const sortedTodayEntries = [...todayEntries].sort((a, b) =>
      a.time.localeCompare(b.time),
    );

    sortedTodayEntries.forEach(entry => {
      const entryTime = new Date(
        `${entry.date.split('T')[0]}T${entry.time.substring(0, 5)}:00`,
      ).getTime();

      times.push(
        new Date(
          `${entry.date.split('T')[0]}T${entry.time.substring(0, 5)}:00`,
        ),
      );
      glucoseValues.push(entry.glucose ?? null);
      bolusInsulin.push(entry.bolusInsulin ?? null);
      basalInsulin.push(entry.basalInsulin ?? null);
      breadUnits.push(entry.breadUnits ?? null);

      if (entry.characterizedBy === 'Severely Low') severelyLow++;
      else if (entry.characterizedBy === 'Low') low++;
      else if (entry.characterizedBy === 'Normal') normal++;
      else if (entry.characterizedBy === 'High') high++;
      else veryHigh++;

      setBreadUnitsStatistics(prev => ({
        ...prev,
        total: prev.total + (entry.breadUnits || 0),
      }));

      if (entryTime <= new Date().setHours(12, 0, 0, 0)) {
        setBreadUnitsStatistics(prev => ({
          ...prev,
          morning: prev.morning + (entry.breadUnits || 0),
        }));
      } else if (
        entryTime <= new Date().setHours(17, 0, 0, 0) &&
        entryTime > new Date().setHours(12, 0, 0, 0)
      ) {
        setBreadUnitsStatistics(prev => ({
          ...prev,
          day: prev.day + (entry.breadUnits || 0),
        }));
      } else {
        setBreadUnitsStatistics(prev => ({
          ...prev,
          evening: prev.evening + (entry.breadUnits || 0),
        }));
      }

      if (
        entry.breadUnits !== 0 &&
        entry.bolusInsulin !== 0 &&
        entry.bolusInsulin !== null &&
        entry.breadUnits !== null
      ) {
        setIC((entry.breadUnits / entry.bolusInsulin).toFixed(2));
      }
    });

    setChartData(prev => ({
      ...prev,
      day: {
        dates: times,
        glucoseValues,
        bolusInsulin,
        basalInsulin,
        breadUnits,
        characterizedBy: {
          severelyLow,
          low,
          normal,
          high,
          veryHigh,
        },
      },
    }));
  }, [entries]);

  useEffect(() => {
    setChartData(prev => ({
      ...prev,
      month: groupedMonthData,
    }));
  }, [groupedMonthData]);

  useEffect(() => {
    console.log('Month chartData:', chartData.month);
    console.log('Entries:', entries);
  }, [chartData.month]);

  return (
    <>
      <Helmet>
        <title>Diadiary | Dashboard</title>
      </Helmet>
      <Container
        maxWidth="lg"
        sx={{ mt: 9, mb: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 } }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="dashboard tabs"
          >
            <Tab label="Day" {...a11yProps(0)} />
            <Tab label="Month" {...a11yProps(1)} />
          </Tabs>
          {value === 1 ? (
            <Tooltip title="Download">
              <IconButton
                onClick={() => handleDownloadPDF()}
                sx={{ width: '48px' }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          )}
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid container size={12}>
              <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                <Suspense
                  fallback={
                    <Skeleton
                      variant="rounded"
                      sx={{
                        height: {
                          xs: 407,
                          sm: 407,
                          md: 385,
                          lg: 380,
                        },
                      }}
                    />
                  }
                >
                  <DayOverview
                    chartData={chartData}
                    dailyLineChartMin={dailyLineChartMin}
                    dailyLineChartMax={dailyLineChartMax}
                  />
                </Suspense>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                {/* PieChart */}
                <Suspense
                  fallback={<Skeleton variant="rounded" height={380} />}
                >
                  <DayGlucoseStatus chartData={chartData} />
                </Suspense>
              </Grid>
              <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 8 }}>
                <Grid size={12}>
                  <Suspense
                    fallback={
                      <Skeleton
                        variant="rounded"
                        sx={{
                          height: 117.5,
                        }}
                      />
                    }
                  >
                    <GlucoseAndRatioTable
                      dailyAverageGlucose={dailyAverageGlucose}
                      ic={ic}
                    />
                  </Suspense>
                </Grid>
                <Grid size={12}>
                  <Suspense
                    fallback={
                      <Skeleton
                        variant="rounded"
                        sx={{
                          height: 231.5,
                        }}
                      />
                    }
                  >
                    <XEDistributionTable
                      breadUnitsStatistics={breadUnitsStatistics}
                    />
                  </Suspense>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Suspense
                  fallback={<Skeleton variant="rounded" height={364.02} />}
                >
                  <DayCorrelation chartData={chartData} />
                </Suspense>
              </Grid>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Suspense
                fallback={
                  <Skeleton
                    variant="rounded"
                    sx={{ height: { xs: 487.02, sm: 459.02, lg: 459.02 } }}
                  />
                }
              >
                <MonthOverview
                  chartData={chartData}
                  monthLineChartMax={monthLineChartMax}
                  monthLineChartMin={monthLineChartMin}
                />
              </Suspense>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Suspense
                fallback={<Skeleton variant="rounded" sx={{ height: 320 }} />}
              >
                <GlucoseEpisodes chartData={chartData} />
              </Suspense>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Suspense
                fallback={<Skeleton variant="rounded" sx={{ height: 320 }} />}
              >
                <TotalInsulins chartData={chartData} />
              </Suspense>
            </Grid>
            <Grid size={12}>
              <Suspense
                fallback={
                  <Skeleton variant="rounded" sx={{ height: 216.05 }} />
                }
              >
                <GlucoseMonth chartData={chartData} />
              </Suspense>
            </Grid>
            <Grid size={12}>
              <Suspense
                fallback={
                  <Skeleton variant="rounded" sx={{ height: 269.06 }} />
                }
              >
                <BreadUnitsMonth chartData={chartData} />
              </Suspense>
            </Grid>
            <Grid size={12}>
              <Suspense
                fallback={
                  <Skeleton variant="rounded" sx={{ height: 163.03 }} />
                }
              >
                <BolusInsulinMonth chartData={chartData} />
              </Suspense>
            </Grid>
            <Grid size={12}>
              <Suspense
                fallback={
                  <Skeleton variant="rounded" sx={{ height: 163.03 }} />
                }
              >
                <BasalInsulinMonth chartData={chartData} />
              </Suspense>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Container>
    </>
  );
}
