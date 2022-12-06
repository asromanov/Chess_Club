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

  function makeRandomMove() {
    const possibleMoves = game.current.moves();
    if (game.current.isGameOver() || game.current.isDraw() || possibleMoves.length === 0) {
      // setFen(game.current.fen());
      return;
    } // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.current.move(possibleMoves[randomIndex]);
    setFen(game.current.fen());
  }

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const promotions = game.current.moves({ verbose: true }).filter((m) => m.promotion);
    let promotionTo;
    if (promotions.some((p) => `${p.from}:${p.to}` === `${sourceSquare}:${targetSquare}`)) {
      promotionTo = prompt('Превратите пешку в: r (ладью), b (слона), q (ферзя), или n (коня).');
      if (!(promotionTo === 'r' || promotionTo === 'b' || promotionTo === 'q' || promotionTo === 'n')) {
        alert('Если не выбирете, ваша пешка автоматически станет ферзем.');
        promotionTo = 'q';
      }
    }

    const move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: promotionTo,
    });
    if (move === null) return; // проверка на легальный ход
    // console.log(move);
    // если легальный, устанавливаем новую позиуцию
    setFen(game.current.fen());

    // makeRandomMove();
    setTimeout(makeRandomMove, 200);
  };

  console.log(game.current);
  console.log(fen);

  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setFen('start');
  };

  return (
    <div style={{
      display: 'flex', marginTop: '100px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
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
