import React from 'react';
import {
  AppBar, Box, Button, Toolbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import '@fontsource/roboto/500.css';
import { logoutUserAsync } from '../../redux/actions/authActions';

const linkStyle = {
  textTransform: 'none',
  textDecoration: 'none',
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: 16,
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
          background: '-webkit-linear-gradient(90deg, rgb(229, 236, 235), rgb(12, 13, 13) 11%, rgb(59, 60, 54) 100%)',
          background: '-moz-linear-gradient(90deg, rgb(229, 236, 235), rgb(12, 13, 13) 11%, rgb(59, 60, 54) 100%)',
          background: 'linear-gradient(90deg, rgb(229, 236, 235), rgb(12, 13, 13) 11%, rgb(59, 60, 54) 100%)',
        }}
      >
        <Toolbar>
          <Box mr={5}>
            <img src="logo.png" alt="logo" style={{ width: '70px', heigth: '70px', paddingTop: '.2rem' }} />
          </Box>
          <Box mr={5}>
            <NavLink to="/" style={linkStyle}>Главная</NavLink>
          </Box>
          {user?.id ? (
            <>
              <Box mr={5}>
                <NavLink to="/onlinegame" style={linkStyle}>Тренировка</NavLink>
              </Box>
              <Box mr={5}>
                <NavLink to="/train" style={linkStyle}>Компьютер</NavLink>
              </Box>
              <Box mr={5}>
                <NavLink to="/game" style={linkStyle}>Онлайн</NavLink>
              </Box>
              <Box mr={5}>
                <Button
                  style={linkStyle}
                  key="logout"
                  onClick={() => { dispatch(logoutUserAsync()); navigate('/'); }}
                >
                  Выход
                </Button>
              </Box>
              <Box>
                <div style={linkStyle}>
                  Добро пожаловать,
                  {' '}
                  {user?.name}
                  !
                </div>
              </Box>

            </>
          ) : (
            <>
              <Box mr={5}>
                <NavLink to="/login" style={linkStyle}>Вход</NavLink>
              </Box>
              <Box mr={5}>
                <NavLink to="/signup" style={linkStyle}>Регистрация</NavLink>
              </Box>

            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
