import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import OnlinePlayersPage from './components/OnlinePlayersPage/OnlinePlayersPage';
import Footer from './components/Footer/Footer';
import Apps from './components/Socket/Apps';
import GameInit from './components/GameInit/GameInit';

export default function App() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    if (authUser?.id) {
      dispatch(socketInit());
    }
  }, [authUser]);

  // useEffect(() => {
  //   if (game.isActive) {
  //     navigate('/onlinegame');
  //   }
  // }, [game.isActive]);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<ProtectedRoute isAllowed={!authUser?.id} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authUser?.id} />} />
        <Route path="/onlinegame" element={<OnlineGame />} />
        <Route path="/gameinit" element={<GameInit />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/friends" element={<OnlinePlayersPage />} />
        <Route path="/xxx" element={<Apps />} />

      </Routes>
      <Footer />
    </>
  );
}
