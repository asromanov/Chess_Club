import React, { useState, useRef, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Button, CardActions } from '@mui/material';

export default function GamePage() {
  const [fen, setFen] = useState('start');

  const game = useRef(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
    });
    if (move === null) return; // проверка на легальный ход
    // console.log(move);
    // если легальный, устанавливаем новую позиуцию

    setFen(game.current.fen());
  };

  console.log(game);
  console.log(fen);

  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setFen('start');
  };

  return (
    <div style={{
      display: 'flex', marginTop: '50px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
    }}
    >
      {game.current && game.current.isGameOver() ? (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>Game Over</h1>
          <CardActions>
            <Button size="big" onClick={resetGame}>Play Again</Button>
          </CardActions>
        </div>
      ) : <span />}
      <Chessboard
        position={fen}
        onDrop={onDrop}
        boardStyle={{
          borderRadius: '5px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        }}
      />
    </div>
  );
}

