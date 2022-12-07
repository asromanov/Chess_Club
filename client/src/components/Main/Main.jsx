import { Chessboard } from 'react-chessboard';
import React from 'react';
import './main.css';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  const chessBoardLocation = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '120px',

  };
  return (
    <div className="MainContainer">
      <div style={chessBoardLocation}>
        <Chessboard id="BasicBoard" />
      </div>
      <div className="ButtonContainer">
        <button type="button" className="button-41" onClick={() => navigate('/game')}>Игра по сети</button>
        <button type="button" className="button-42" onClick={() => navigate('/train')}>Игра с компьютером</button>
        <button type="button" className="button-43" onClick={() => navigate('/onlinegame')}>Тренировка</button>
      </div>
    </div>
  );
}
