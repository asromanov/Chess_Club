import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import GamePage from './components/GamePage/GamePage';
import OnlineGame from './components/OnlineGame/OnlineGame';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignUpPage/SignUpPage';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import '@fontsource/roboto/400.css';
import { checkAuthAsync } from './redux/actions/authActions';
import { socketInit } from './redux/actions/wsActions';

export default function App() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Проверка авторизации
    dispatch(checkAuthAsync());
  }, []);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(socketInit());
    }
  }, [authUser?.id]);
  return (
    <Container maxWidth="lg">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<ProtectedRoute isAllowed={!authUser?.id} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authUser?.id} />} />
        <Route path="/onlinegame" element={<OnlineGame />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Container>
  );
}
