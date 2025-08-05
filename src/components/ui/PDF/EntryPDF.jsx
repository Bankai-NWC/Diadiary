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
import React, { useEffect } from 'react';

import RobotoBold from '../../../fonts/Roboto_Bold.ttf';
import RobotoMedium from '../../../fonts/Roboto_Medium.ttf';
import RobotoRegular from '../../../fonts/Roboto_Regular.ttf';

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
  header: {
    height: 44,
    width: '100%',
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  section: { marginBottom: 10, paddingHorizontal: 30 },
  title: { fontSize: 24, marginBottom: 10 },
  divider: {
    height: 0.5,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 30,
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 14,
    marginTop: 10,
  },
  link: {
    fontFamily: 'Roboto',
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 'bold',
  },
  disclaimer: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#9e9e9e',
  },
});

function EntryPDF({ entry, userData }) {
  const data = {
    name:
      userData.name || userData.surname
        ? `${userData.name} ${userData.surname}`
        : 'Not specified',
    gender: userData.gender ? userData.gender : 'Not specified',
    dateOfIlliness: userData.dateOfIllness
      ? dayjs(userData.dateOfIllness).format('DD/MM/YYYY')
      : 'Not specified',
    insulins:
      userData.bolusInsulin && userData.basalInsulin
        ? `${userData.bolusInsulin}/${userData.basalInsulin}`
        : userData.bolusInsulin
          ? `${userData.bolusInsulin}`
          : userData.basalInsulin
            ? `${userData.basalInsulin}`
            : 'Not specified',
    anamnesis: userData.anamnesis ? userData.anamnesis : 'Not specified',
    date: `${dayjs(entry.date).format('DD/MM/YYYY')}, ${entry.time}`,
    glucose: `${entry.glucose} mmol/L`,
    breadUnits: entry.breadUnits ? `${entry.breadUnits} XE` : 'Not specified',
    bolusDose: entry.bolusInsulin
      ? `${entry.bolusInsulin} units`
      : 'Not specified',
    basalDose: entry.basalInsulin
      ? `${entry.basalInsulin} units`
      : 'Not specified',
    activity: entry.activity ? entry.activity : 'Not specified',
    activityDuration: entry.activityDuration
      ? `${dayjs.duration(entry.activityDuration, 'minutes').format('HH:mm')} minutes`
      : 'Not specified',
    symptoms: entry.symptoms ? entry.symptoms : 'Not specified',
    notes: entry.notes ? entry.notes : 'Not specified',
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
          <View style={styles.header}>
            <Link
              src="https://github.com/Bankai-NWC/Diadiary"
              style={styles.link}
            >
              DIADIARY
            </Link>
          </View>

          <View style={styles.section}>
            <Text style={styles.text}>{data.name}</Text>
            <Text style={styles.text}>Gender: {data.gender}</Text>
            <Text style={styles.text}>
              Date of illness: {data.dateOfIlliness}
            </Text>
            <Text style={styles.text}>Insulins: {data.insulins}</Text>
            <Text style={styles.text}>Anamnesis: {data.anamnesis}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.text}>Date: {data.date}</Text>
            <Text style={styles.text}>Glucose: {data.glucose}</Text>
            <Text style={styles.text}>Bread units: {data.breadUnits}</Text>
            <Text style={styles.text}>Bolus insulin: {data.bolusDose}</Text>
            <Text style={styles.text}>Basal insulin: {data.basalDose}</Text>
            <Text style={styles.text}>Activity: {data.activity}</Text>
            <Text style={styles.text}>
              Activity duration: {data.activityDuration}
            </Text>
            <Text style={styles.text}>Symptoms: {data.symptoms}</Text>
            <Text style={styles.text}>Notes: {data.notes}</Text>
          </View>
        </View>

        {/* Нижняя сноска */}
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

export default EntryPDF;
