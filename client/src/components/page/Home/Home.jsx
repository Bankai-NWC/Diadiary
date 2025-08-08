import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import SwiperCoverflow from '../../ui/Swiper/SwiperCoverflow';

function Home() {
  const currentTheme = useSelector(state => state.theme.theme);
  const theme = useTheme();
  const color =
    currentTheme === 'light' ? '#d0ebffdc' : theme.palette.background.paper;

  return (
    <>
      <Helmet>
        <title>Diadiary | Home</title>
      </Helmet>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          backgroundImage: 'url("./images/home-background.svg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPositionY: 'bottom',
          paddingInline: 2,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            paddingInline: { md: 0, xl: 0 },
          }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={{ xs: 'center', md: 'space-between' }}
            alignItems="center"
            sx={{ paddingTop: 15, width: '100%' }}
          >
            <Stack
              spacing={0.5}
              sx={{ position: 'relative', zIndex: 5 }}
              maxWidth="75%"
            >
              <Typography
                variant="h3"
                fontSize={48}
                color="#fff"
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                DIADIARY
              </Typography>
              <Typography
                variant="body1"
                fontSize={20}
                color="#fff"
                width={{ xs: '100%', md: 375 }}
              >
                With DIADIARY, saving and tracking your diabetes data is
                convenient
              </Typography>
            </Stack>
            <Stack
              flexDirection="row"
              sx={{ pr: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 } }}
              maxWidth="100%"
            >
              <Box
                component="img"
                src="./images/preview-statistic.png"
                alt="Preview"
                sx={{
                  position: 'relative',
                  width: { xs: '40vw', md: '18vw' },
                  height: 'auto',
                  maxWidth: '100%',
                  display: 'block',
                  transform: {
                    xs: 'translate(45px, 75px)',
                    md: 'rotate(-8deg)',
                  },
                  zIndex: 2,
                }}
              />
              <Box
                component="img"
                src="./images/preview-newAdd.png"
                alt="Preview"
                sx={{
                  position: 'relative',
                  width: { xs: '40vw', md: '18vw' },
                  height: 'auto',
                  maxWidth: '100%',
                  display: 'block',
                  transform: {
                    xs: 'translate(-45px, 75px) scale(0.93)',
                    md: 'rotate(10deg)',
                  },
                  zIndex: 0,
                }}
              />
            </Stack>
          </Box>
        </Container>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          paddingInline: { md: 2, xl: 0 },
          paddingBlock: { md: 0, xl: 8 },
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          gap={4}
          sx={{
            marginTop: 8,
            paddingBlock: { xs: 8, md: 0 },
            width: '100%',
          }}
        >
          <Stack
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={204}
          >
            <CloudDoneOutlinedIcon htmlColor="#2196F3" sx={{ fontSize: 128 }} />
            <Stack
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                Data Security
              </Typography>
              <Typography textAlign="center">
                Your data can be accessed from any device
              </Typography>
            </Stack>
          </Stack>
          <Stack
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={204}
          >
            <AutoGraphOutlinedIcon htmlColor="#2196F3" sx={{ fontSize: 128 }} />
            <Stack
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                STATISTICS
              </Typography>
              <Typography textAlign="center">
                Convenient detailed data visualization
              </Typography>
            </Stack>
          </Stack>
          <Stack
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={204}
          >
            <PictureAsPdfOutlinedIcon
              htmlColor="#2196F3"
              sx={{ fontSize: 128 }}
            />
            <Stack
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ textTransform: 'uppercase' }}
              >
                PDF EXPORT
              </Typography>
              <Typography textAlign="center">
                Export indicators in PDF format in one click
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
      <Box sx={{ width: '100%', background: color }}>
        <Container
          maxWidth="lg"
          sx={{
            paddingInline: { md: 2, xl: 0 },
            paddingBlock: 6,
          }}
        >
          <Stack
            flexDirection={{ xs: 'column', md: 'row' }}
            maxWidth="100%"
            gap={2}
          >
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={500}>
                DIADIARY — your digital assistant for Type 1 Diabetes
              </Typography>
              <Typography variant="body1">
                Is a simple and user-friendly application designed specifically
                for people living with Type 1 Diabetes. We understand how
                important it is to keep accurate and visual records of blood
                glucose levels, insulin doses, carbohydrate intake (bread
                units), and overall well-being. That’s why we’ve created a tool
                that makes this process easy and intuitive.
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Log your blood sugar, insulin (both basal and bolus),
                  carbohydrates, and well-being anytime."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Get visual charts and reports to monitor trends and identify
                  patterns."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Store all your data in a secure cloud, accessible from any
                  device."
                  />
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          paddingInline: { md: 0, xl: 0 },
          paddingBlock: 6,
        }}
      >
        <Stack width="100%">
          <Typography
            variant="h3"
            component="h5"
            fontWeight={500}
            textAlign="center"
            textTransform="uppercase"
          >
            ScreenShots
          </Typography>
        </Stack>
        <SwiperCoverflow />
      </Container>
    </>
  );
}

export default Home;
