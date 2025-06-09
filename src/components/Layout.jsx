import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './ui/Navbar/Navbar';

export default function Layout() {
  return (
    <Container fixed>
      <Navbar />
      <Outlet />
    </Container>
  );
}
