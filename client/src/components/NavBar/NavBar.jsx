import React from 'react';
import {
  AppBar, Box, Button, Toolbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import '@fontsource/roboto/500.css';
import { logoutUserAsync } from '../../redux/actions/authActions';
import { userLoggedOut } from '../../redux/actions/friendsActions';

const linkStyle = {
  textTransform: 'none',
  textDecoration: 'none',
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: 20,
};

export default function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }} style={linkStyle}>
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
            <img src="logo.png" alt="logo" style={{ width: '70px', heigth: '70px', paddingTop: '.2rem' }} />
          </Box>
          <Box mr={5}>
            <NavLink to="/" style={linkStyle}>Main</NavLink>
          </Box>
          {user?.id ? (
            <>
              <Box mr={5}>
                <NavLink to="/onlinegame" style={linkStyle}>Online</NavLink>
              </Box>
              <Box mr={5}>
                <NavLink to="/game" style={linkStyle}>Game</NavLink>
              </Box>
              <Box mr={5}>
                <NavLink to="/friends" style={linkStyle}>Online Players</NavLink>
              </Box>
              <Box mr={5}>
                <Button
                  style={linkStyle}
                  key="logout"
                  onClick={() => { dispatch(logoutUserAsync()); dispatch(userLoggedOut()); navigate('/'); }}
                >
                  Logout
                </Button>
              </Box>
              <Box ml={100}>
                <div style={linkStyle}>
                  Welcome,
                  {' '}
                  {user?.name}
                  !
                </div>
              </Box>

            </>
          ) : (
            <>
              <Box mr={5}>
                <NavLink to="/login" style={linkStyle}>Login</NavLink>
              </Box>
              <Box mr={5}>
                <NavLink to="/signup" style={linkStyle}>Sign Up</NavLink>
              </Box>

            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
