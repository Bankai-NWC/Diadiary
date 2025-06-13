import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { auth } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import { clearUser } from '../../../store/slices/userSlice';

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
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
    alert('Вы вышли из аккаунта');
  };

  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Toolbar disableGutters>
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
                      {/* <ListItemIcon>
                          <Icon iconName={item.icon} />
                        </ListItemIcon> */}
                      <ListItemText primary={'Profile'} />
                    </ListItemButton>
                  </ListItem>
                </RouterLink>
                <RouterLink to="/dashboard" style={{ textDecoration: 'none' }}>
                  <ListItem sx={{ marginTop: 2 }} disablePadding>
                    <ListItemButton>
                      {/* <ListItemIcon>
                          <Icon iconName={item.icon} />
                        </ListItemIcon> */}
                      <ListItemText primary={'Dashboard'} />
                    </ListItemButton>
                  </ListItem>
                </RouterLink>
                <RouterLink to="/add-entry" style={{ textDecoration: 'none' }}>
                  <ListItem sx={{ marginTop: 2 }} disablePadding>
                    <ListItemButton>
                      {/* <ListItemIcon>
                          <Icon iconName={item.icon} />
                        </ListItemIcon> */}
                      <ListItemText primary={'Add entry'} />
                    </ListItemButton>
                  </ListItem>
                </RouterLink>
              </List>
            </Box>
          </Drawer>
          <Box sx={isAuth ? { flexGrow: 1, ml: 1 } : { flexGrow: 1, ml: 2 }}>
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
  );
}
