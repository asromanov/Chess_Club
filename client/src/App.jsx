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
import PlayWithFriend from './components/Socket/PlayWithFriend';

export default function App() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<ProtectedRoute isAllowed={!authUser?.id} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authUser?.id} />}>
          <Route path="/onlinegame" element={<OnlineGame />} />
          <Route path="/train" element={<GamePage />} />
          <Route path="/game" element={<PlayWithFriend />} />
        </Route>
      </Routes>
    </div>
  );
}
