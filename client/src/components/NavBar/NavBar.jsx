import React from 'react';
import {
  AppBar, Box, Button, Toolbar,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '@fontsource/roboto/500.css';
import { logoutUserAsync } from '../../redux/actions/authActions';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: 20,
};

export default function NavBar() {
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        id="NavBar"
        position="static"
        sx={{
          background: '-webkit-linear-gradient(90deg, rgb(244, 244, 244), rgb(22, 22, 22))',
          background: '-moz-linear-gradient(90deg, rgb(244, 244, 244), rgb(22, 22, 22))',
          background: 'linear-gradient(90deg, rgb(244, 244, 244), rgb(22, 22, 22))',
        }}
      >
        <Toolbar>
          <Box mr={5}>
            <img src="logo.png" alt="logo" style={{ width: '70px', heigth: '70px' }} />
          </Box>
          <Box mr={5}>
            <NavLink to="/" style={linkStyle}>Main</NavLink>
          </Box>
          <Box mr={5}>
            <NavLink to="/login" style={linkStyle}>Login</NavLink>
          </Box>
          <Box mr={5}>
            <NavLink to="/signup" style={linkStyle}>Sign Up</NavLink>
          </Box>
          <Box mr={5}>
            <Button
              style={linkStyle}
              key="logout"
              onClick={() => dispatch(logoutUserAsync())}
            >
              Logout
            </Button>
          </Box>
          <Box mr={5}>
            <NavLink to="/onlinegame" style={linkStyle}>Online</NavLink>
          </Box>
          <Box ml={20}>
            <NavLink to="/game" style={linkStyle}>Game</NavLink>
          </Box>
          <Box ml={5}>
            <NavLink to="/onlineuser" style={linkStyle}>Online Players</NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
