import RobotoBold from '@fonts/Roboto_Bold.ttf';
import RobotoMedium from '@fonts/Roboto_Medium.ttf';
import RobotoRegular from '@fonts/Roboto_Regular.ttf';
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React from 'react';

dayjs.extend(duration);

Font.register({
  family: 'Roboto',
  src: RobotoRegular,
  fonts: [
    {
      src: RobotoRegular,
      fontWeight: 'normal',
    },
    {
      src: RobotoMedium,
      fontWeight: 'medium',
    },
    {
      src: RobotoBold,
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  headerPage: {
    height: 44,
    width: '100%',
    backgroundColor: '#2196f3',
    alignItems: 'baseline',
    paddingHorizontal: 30,
  },
  link: {
    fontFamily: 'Roboto',
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 12,
    marginTop: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginVertical: 5,
    marginHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    minHeight: 18,
  },
  header: {
    backgroundColor: '#eee',
    fontWeight: 'bold',
  },
  section: { marginBottom: 10, paddingHorizontal: 30 },
  divider: {
    height: 0.5,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 30,
    marginTop: 1,
  },
  disclaimer: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#9e9e9e',
  },
});

function MonthStatsPDF({ chartData, userData }) {
  const data = {
    name:
      userData.name || userData.surname
        ? `${userData.name} ${userData.surname}`
        : 'Not specified',
  };

  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <View
            style={[
              styles.headerPage,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
          >
            <Link
              src="https://github.com/Bankai-NWC/Diadiary"
              style={styles.link}
            >
              DIADIARY
            </Link>
            <Text style={[styles.text, { color: '#fff', marginTop: 0 }]}>
              {`${dayjs(chartData.month.dates[0]).format('DD/MM/YYYY')} - ${dayjs(chartData.month.dates[chartData.month.dates.length - 1]).format('DD/MM/YYYY')}`}
            </Text>
          </View>
          <View
            style={[
              styles.section,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 0,
              },
            ]}
          >
            <Text style={styles.text}>
              {userData.name || userData.surname
                ? `${userData.name} ${userData.surname}`
                : 'Not specified'}
            </Text>

            <Text style={styles.text}>
              Insulins:{' '}
              {userData.bolusInsulin && userData.basalInsulin
                ? `${userData.bolusInsulin}/${userData.basalInsulin}`
                : userData.bolusInsulin
                  ? `${userData.bolusInsulin}`
                  : userData.basalInsulin
                    ? `${userData.basalInsulin}`
                    : 'Not specified'}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View>
            <View style={styles.table}>
              {/* Header */}
              <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, { width: '20%' }]}>Date</Text>
                <Text style={[styles.cell, { width: '20%' }]}>
                  Avg. glucose (mmol/L)
                </Text>
                <Text style={[styles.cell, { width: '20%' }]}>Total XE</Text>
                <Text style={[styles.cell, { width: '20%' }]}>
                  Total Bolus (units)
                </Text>
                <Text style={[styles.cell, { width: '20%' }]}>
                  Total Basal (units)
                </Text>
              </View>

              {chartData?.month?.dates?.map((date, index) => (
                <View key={date} style={styles.row}>
                  <Text style={[styles.cell, { width: '20%' }]}>
                    {dayjs(date).format('DD/MM/YYYY')}
                  </Text>
                  <Text style={[styles.cell, { width: '20%' }]}>
                    {chartData.month?.dayStats.glucoseAvg?.[index] || '-'}
                  </Text>
                  <Text style={[styles.cell, { width: '20%' }]}>
                    {chartData.month?.dayStats.breadUnitsTotal?.[index] || '-'}
                  </Text>
                  <Text style={[styles.cell, { width: '20%' }]}>
                    {chartData.month?.dayStats.bolusInsulinTotal?.[index] ||
                      '-'}
                  </Text>
                  <Text style={[styles.cell, { width: '20%' }]}>
                    {chartData.month?.dayStats.basalInsulinTotal?.[index] ||
                      '-'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 30,
            }}
            fixed
          >
            <View
              style={{
                width: '50%',
                marginRight: 5,
              }}
            >
              {/* Glucose */}
              <View
                style={[styles.table, { width: '100%', marginHorizontal: 0 }]}
              >
                <View style={[styles.row, styles.header]}>
                  <Text style={[styles.cell, { flexBasis: '100%' }]}>
                    Glucose
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    Average
                  </Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.glucose.avg || '-'} mmol/L
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>Min.</Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.glucose.min || '-'} mmol/L
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>Max.</Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.glucose.max || '-'} mmol/L
                  </Text>
                </View>
              </View>
              {/* Bread units */}
              <View
                style={[styles.table, { width: '100%', marginHorizontal: 0 }]}
              >
                <View style={[styles.row, styles.header]}>
                  <Text style={[styles.cell, { flexBasis: '100%' }]}>
                    Bread units
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>Total</Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.breadUnits.total} XE
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    Avg. Morning
                  </Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.breadUnits.avgMorning} XE
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    Avg. Day
                  </Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.breadUnits.avgDay} XE
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    Avg. Evening
                  </Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.breadUnits.avgEvening} XE
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: '50%',
                marginLeft: 5,
              }}
            >
              {/* Bolus */}
              <View
                style={[styles.table, { width: '100%', marginHorizontal: 0 }]}
              >
                <View style={[styles.row, styles.header]}>
                  <Text style={[styles.cell, { flexBasis: '100%' }]}>
                    Bolus insulin
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>Total</Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.insulin.bolus.total} units
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    Average Dose
                  </Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.insulin.bolus.avg} units
                  </Text>
                </View>
              </View>
              {/* Basal */}
              <View
                style={[styles.table, { width: '100%', marginHorizontal: 0 }]}
              >
                <View style={[styles.row, styles.header]}>
                  <Text style={[styles.cell, { flexBasis: '100%' }]}>
                    Basal insulin
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>Total</Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.insulin.basal.total} units
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    Average Dose
                  </Text>
                  <Text style={[styles.cell, { flexBasis: '50%' }]}>
                    {chartData.month.monthStats.insulin.basal.avg} units
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={{ color: '#e53935', fontSize: 10 }}>
            *{' '}
            <Text style={styles.disclaimer}>
              The data in this report was entered by the user. DIADIARY is not
              responsible for its accuracy or for any medical decisions based on
              this information.
            </Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default MonthStatsPDF;
