import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import GamePage from './components/GamePage/GamePage';
import OnlineGame from './components/OnlineGame/OnlineGame';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignUpPage/SignUpPage';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import '@fontsource/roboto/400.css';

export default function App() {
  const authUser = useSelector((state) => state.authUser);
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
