import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LineAxisOutlinedIcon from '@mui/icons-material/LineAxisOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';
import PostAddIcon from '@mui/icons-material/PostAdd';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { auth } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import { setAlert } from '../../../store/slices/alertSlice';
import { clearUser } from '../../../store/slices/userSlice';
import CustomSwitch from '../Inputs/CustomSwitch/CustomSwitch';

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuth, avatarUrl } = useAuth();

  const handleToogleDrawer = () => {
    setOpen(open => !open);
  };

  const handleToSignInPage = () => {
    navigate('/login');
  };

  const handleToSignUpPage = () => {
    navigate('/register');
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    sessionStorage.removeItem('user');
    navigate('/');
    dispatch(
      setAlert({
        message: 'You have been logged out of your account.',
        type: 'success',
      }),
    );
  };

  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            disableGutters
          >
            {isAuth ? (
              <IconButton
                color="inherit"
                onClick={handleToogleDrawer}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <></>
            )}
            <Drawer anchor="left" open={open} onClose={handleToogleDrawer}>
              <Box sx={{ width: 250 }} onClick={handleToogleDrawer}>
                <List>
                  <RouterLink to="/profile" style={{ textDecoration: 'none' }}>
                    <ListItem sx={{ marginTop: 2 }} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <AccountBoxOutlinedIcon />
                        </ListItemIcon>
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.primary' }}
                        >
                          Profile
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </RouterLink>
                  <RouterLink
                    to="/dashboard"
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem sx={{ marginTop: 2 }} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <LineAxisOutlinedIcon />
                        </ListItemIcon>
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.primary' }}
                        >
                          Dashboard
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </RouterLink>
                  <RouterLink to="/entries" style={{ textDecoration: 'none' }}>
                    <ListItem sx={{ marginTop: 2 }} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <ListAltIcon />
                        </ListItemIcon>
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.primary' }}
                        >
                          Entries
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </RouterLink>
                  <RouterLink
                    to="/add-entry"
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem sx={{ marginTop: 2 }} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <PostAddIcon />
                        </ListItemIcon>
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.primary' }}
                        >
                          New Entry
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </RouterLink>
                </List>
              </Box>
            </Drawer>
            <Box
              sx={
                isAuth
                  ? {
                      flexGrow: 1,
                      ml: 1,
                      display: { xs: 'flex', md: 'flex' },
                    }
                  : {
                      flexGrow: 1,
                      ml: 2,
                      display: { xs: 'flex', md: 'flex' },
                    }
              }
            >
              <RouterLink
                to={isAuth ? '/dashboard' : '/'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography variant="h5">DIADIARY</Typography>
              </RouterLink>
            </Box>

            {isAuth ? (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mr: 2 }}
              >
                <CustomSwitch />
                <RouterLink
                  to="/profile"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Tooltip title="Profile" arrow>
                    <Avatar
                      sx={{
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                      }}
                      src={avatarUrl}
                      alt={avatarUrl.toUpperCase()}
                    />
                  </Tooltip>
                </RouterLink>
                <Button color="inherit" onClick={handleLogout}>
                  Sign out
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
                <CustomSwitch />
                <Button
                  color="inherit"
                  onClick={handleToSignInPage}
                  sx={{ mr: 2 }}
                >
                  Sign in
                </Button>
                <Button
                  color="inherit"
                  onClick={handleToSignUpPage}
                  sx={{ mr: 2 }}
                >
                  Sign up
                </Button>
              </Stack>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  );
}
