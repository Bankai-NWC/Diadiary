import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Alerts from '@ui/Alerts/Alerts';
import Navbar from '@ui/Navbar/Navbar';

export default function Layout() {
  return (
    <Container maxWidth={false} disableGutters>
      <Navbar />
      <Alerts />
      <Outlet />
    </Container>
  );
}
