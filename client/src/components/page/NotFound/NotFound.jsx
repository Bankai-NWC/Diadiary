import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const theme = useTheme();
  const navigate = useNavigate();
  const image =
    theme.palette.mode === 'light'
      ? './images/not-found-light.png'
      : './images/not-found-dark.png';

  return ( 
    <Container maxWidth="lg">
      <Stack
        flexDirection="column"
        height="100vh"
        justifyContent="space-around"
        alignItems="center"
      >
        <Stack pt={4}>
          <Typography
            textAlign="center"
            sx={{ fontSize: 'clamp(5rem, 2.5vw, 10rem)' }}
          >
            Oops!
          </Typography>
          <Typography
            textAlign="center"
            textTransform="uppercase"
            sx={{ fontSize: 'clamp(1rem, 2.5vw, 3rem)' }}
          >
            Page not found
          </Typography>
        </Stack>
        <Stack>
          <Box
            component="img"
            src={image}
            alt="Preview"
            sx={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              display: 'block',
            }}
          />
        </Stack>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
      </Stack>
    </Container>
  );
}

export default NotFound;
