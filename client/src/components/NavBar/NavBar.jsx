import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import '@fontsource/roboto/500.css';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: 20,
};

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box mr={5}>
            <NavLink to="/" style={linkStyle}>Main</NavLink>
          </Box>
          {/* <Box mr={5}>
            <NavLink to="/jewelery" style={linkStyle}>Jewelery</NavLink>
          </Box>
          <Box mr={5}>
            <NavLink to="/electronics" style={linkStyle}>Electronics</NavLink>
          </Box>
          <Box mr={5}>
            <NavLink to="/mens" style={linkStyle}>Mens</NavLink>
          </Box> */}
          <Box mr={5}>
            <NavLink to="/onlinegame" style={linkStyle}>Online</NavLink>
          </Box>
          <Box ml={20}>
            <NavLink to="/game" style={linkStyle}>Game</NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
