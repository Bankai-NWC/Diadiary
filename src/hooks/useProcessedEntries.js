import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useMemo } from 'react';

dayjs.extend(isBetween);

const getHourFromTimeString = timeString => {
  if (!timeString) return null;
  const [hoursStr] = timeString.split(':');
  return parseInt(hoursStr, 10);
};

const calculateAverage = arr => {
  const validValues = arr.filter(val => val != null);
  if (!validValues.length) return null;
  const sum = validValues.reduce((acc, val) => acc + val, 0);
  return Number((sum / validValues.length).toFixed(1));
};

const calculateTotal = arr => {
  const validValues = arr.filter(val => val != null);
  if (!validValues.length) return null;
  return Number(validValues.reduce((acc, val) => acc + val, 0).toFixed(1));
};

const initializeGroupedData = () => ({
  dates: [],
  valuesByDay: {},
  allGlucoseValues: [],
  allBreadUnitsValues: [],
  allBolusInsulinValues: [],
  allBasalInsulinValues: [],
  monthStats: {
    glucose: { min: 0, max: 0, avg: 0, numOfHypo: 0, numOfHyper: 0 },
    breadUnits: {
      total: 0,
      avgMorning: 0,
      avgDay: 0,
      avgEvening: 0,
      byTime: { morning: [], day: [], evening: [] },
    },
    insulin: { bolus: { total: 0, avg: 0 }, basal: { total: 0, avg: 0 } },
  },
  dayStats: {
    glucoseAvg: [],
    breadUnitsTotal: [],
    bolusInsulinTotal: [],
    basalInsulinTotal: [],
  },
});

export function useProcessedEntries(entries) {
  const groupedData = useMemo(() => {
    if (!entries || !entries.length) {
      return initializeGroupedData();
    }

    const grouped = initializeGroupedData();

    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');

    const entriesPerMonth = entries
      .filter(entry => {
        const entryDateUTC = dayjs(entry.date).utc();
        const entryLocal = entryDateUTC.local();
        return entryLocal.isBetween(startOfMonth, endOfMonth, null, '[]');
      })
      .reverse();

    entriesPerMonth.forEach(entry => {
      const entryDate = dayjs(entry.date).local();
      const localDateStr = entryDate.format('YYYY-MM-DD');
      const entryHour = getHourFromTimeString(entry.time);

      if (!grouped.valuesByDay[localDateStr]) {
        grouped.valuesByDay[localDateStr] = {
          glucose: [],
          breadUnits: [],
          bolusInsulin: [],
          basalInsulin: [],
        };
      }

      if (entry.glucose != null) {
        grouped.allGlucoseValues.push(entry.glucose);
        grouped.valuesByDay[localDateStr].glucose.push(entry.glucose);
      }
      if (entry.breadUnits != null) {
        grouped.allBreadUnitsValues.push(entry.breadUnits);
        grouped.valuesByDay[localDateStr].breadUnits.push(entry.breadUnits);
        if (entryHour != null) {
          if (entryHour >= 5 && entryHour < 12) {
            grouped.monthStats.breadUnits.byTime.morning.push(entry.breadUnits);
          } else if (entryHour >= 12 && entryHour < 17) {
            grouped.monthStats.breadUnits.byTime.day.push(entry.breadUnits);
          } else {
            grouped.monthStats.breadUnits.byTime.evening.push(entry.breadUnits);
          }
        }
      }
      if (entry.bolusInsulin != null) {
        grouped.allBolusInsulinValues.push(entry.bolusInsulin);
        grouped.valuesByDay[localDateStr].bolusInsulin.push(entry.bolusInsulin);
      }
      if (entry.basalInsulin != null) {
        grouped.allBasalInsulinValues.push(entry.basalInsulin);
        grouped.valuesByDay[localDateStr].basalInsulin.push(entry.basalInsulin);
      }
    });

    grouped.dates = Object.keys(grouped.valuesByDay)
      .sort()
      .map(dateStr => dayjs(dateStr).toDate());

    Object.values(grouped.valuesByDay).forEach(day => {
      grouped.dayStats.glucoseAvg.push(calculateAverage(day.glucose) || 0);
      grouped.dayStats.breadUnitsTotal.push(
        calculateTotal(day.breadUnits) || 0,
      );
      grouped.dayStats.bolusInsulinTotal.push(
        calculateTotal(day.bolusInsulin) || 0,
      );
      grouped.dayStats.basalInsulinTotal.push(
        calculateTotal(day.basalInsulin) || 0,
      );
    });

    if (grouped.allGlucoseValues.length > 0) {
      grouped.monthStats.glucose.max = Math.max(...grouped.allGlucoseValues);
      grouped.monthStats.glucose.min = Math.min(...grouped.allGlucoseValues);
      grouped.monthStats.glucose.avg =
        calculateAverage(grouped.allGlucoseValues) || 0;

      grouped.allGlucoseValues.forEach(value => {
        if (value > 10) grouped.monthStats.glucose.numOfHyper += 1;
        else if (value < 3.9) grouped.monthStats.glucose.numOfHypo += 1;
      });
    }

    if (grouped.allBreadUnitsValues.length > 0) {
      grouped.monthStats.breadUnits.total = calculateTotal(
        grouped.allBreadUnitsValues,
      );
      grouped.monthStats.breadUnits.avgMorning =
        calculateAverage(grouped.monthStats.breadUnits.byTime.morning) || 0;
      grouped.monthStats.breadUnits.avgDay =
        calculateAverage(grouped.monthStats.breadUnits.byTime.day) || 0;
      grouped.monthStats.breadUnits.avgEvening =
        calculateAverage(grouped.monthStats.breadUnits.byTime.evening) || 0;
    }

    if (grouped.allBolusInsulinValues.length > 0) {
      grouped.monthStats.insulin.bolus.total =
        calculateTotal(grouped.allBolusInsulinValues) || 0;
      grouped.monthStats.insulin.bolus.avg =
        Math.round(calculateAverage(grouped.allBolusInsulinValues) || 0) || 0;
    }

    if (grouped.allBasalInsulinValues.length > 0) {
      grouped.monthStats.insulin.basal.total =
        calculateTotal(grouped.allBasalInsulinValues) || 0;
      grouped.monthStats.insulin.basal.avg =
        Math.round(calculateAverage(grouped.allBasalInsulinValues) || 0) || 0;
    }

    return grouped;
  }, [entries]);

  return groupedData;
}
