import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import GamePage from './components/GamePage/GamePage';
import OnlineGame from './components/OnlineGame/OnlineGame';

export default function App() {
  return (
    <Container maxWidth="lg">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/onlinegame" element={<OnlineGame />} />
        {/* <Route path="/womens" element={<Womens />} /> */}
        {/* <Route path="/electronics" element={<Electronics />} /> */}
        <Route path="/game" element={<GamePage />} />
        {/* <Route path="/:id" element={<OneCard />} /> */}
      </Routes>
    </Container>

  );
}
