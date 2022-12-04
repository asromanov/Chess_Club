import { Chessboard } from 'react-chessboard';
import React from 'react';
import './main.css';

export default function Main() {
  const chessBoardLocation = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px',

  };
  return (
    <div className="MainContainer">
      <div style={chessBoardLocation}>
        <Chessboard id="BasicBoard" />
      </div>
      <div className="ButtonContainer">
        <button type="button" className="button-41">Игра по сети</button>
        <button type="button" className="button-42">Игра с компьютером</button>
        <button type="button" className="button-43">Тренировка</button>
      </div>
    </div>
  );
}
