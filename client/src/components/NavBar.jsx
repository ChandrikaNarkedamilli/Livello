import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import Diversity1Icon from '@mui/icons-material/Diversity1';

const NavBar = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0} sx={{background: 'linear-gradient(900deg,rgb(16, 21, 21))',boxShadow: 'none', backgroundColor: 'transparent', backdropFilter: 'blur(8px)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: 0 }}>
        
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            // textShadow: '0 0 8px #00ffff',
            fontWeight: 'bold',
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Diversity1Icon sx={{ fontSize: 28, color: 'white' }} />
            Profile Hub
          </Box>
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin"
                  sx={{
                    textShadow: '0 0 6px #00ffff',
                    '&:hover': { textShadow: '0 0 12px #00ffff' },
                  }}
                >
                  Admin
                </Button>
              )}

              <Button
                color="inherit"
                component={Link}
                to={'/profile'}
                sx={{
                  textShadow: '0 0 6px #00ffff',
                  '&:hover': { textShadow: '0 0 12px #00ffff' },
                }}
              >
                Profile
              </Button>

              <IconButton onClick={handleMenuOpen}>
                {user.profilePicture ? (
                  <Avatar src={`http://localhost:3000/uploads/${user.profilePicture}`} />
                ) : (
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {user.name?.[0]?.toUpperCase()}
                  </Avatar>
                )}
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  textShadow: '0 0 6px #00ffff',
                  '&:hover': { textShadow: '0 0 12px #00ffff' },
                }}
              >
                Login
              </Button>
              
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
