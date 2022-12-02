import React, { useState, useRef, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Button, CardActions } from '@mui/material';
// import { Button, CardActions } from '@mui/material';

export default function GamePage() {
  const [fen, setFen] = useState('start');
  const [gameOver, setGameOver] = useState();

  const game = useRef(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);

  useEffect(() => {
    if ((game.current.inCheck()) && !(game.current.isCheckmate())) {
      alert('Шах!');
    }
    if (game.current.isCheckmate()) {
      setGameOver({
        info1: 'Мат, ',
        info2: `${game.current.turn() === 'w' ? 'черные' : 'белые'} выиграли`,
      });
    }
    if (game.current.isDraw()) {
      setGameOver({
        info1: 'Ничья ',
        info2: '',
      });
    }
    if (game.current.isStalemate()) {
      setGameOver({
        info1: 'Пат, ',
        info2: 'ничья',
      });
    }
    if (game.current.isInsufficientMaterial()) {
      setGameOver({
        info1: 'Недостаточно фигур, ',
        info2: 'ничья',
      });
    }
    if (game.current.isThreefoldRepetition()) {
      setGameOver({
        info1: 'Трехкратное повторение позиции, ',
        info2: 'ничья',
      });
    }
  }, [fen]);

  console.log(game);

  const onDrop = ({ sourceSquare, targetSquare, piece }) => {
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
    console.log(sourceSquare, targetSquare, piece);
    // если легальный, устанавливаем новую позиуцию

    setFen(game.current.fen());
  };

  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setGameOver();
    setFen('start');
  };

  const undoHandler = () => {
    game.current.undo();
    setFen(game.current.fen());
  };

  return (
    <div style={{
      display: 'flex', marginTop: '50px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
    }}
    >
      {gameOver ? (
        <h1>
          {gameOver.info1}
          {' '}
          {gameOver.info2}
          <CardActions>
            <Button size="big" onClick={resetGame}>Play Again</Button>
          </CardActions>
        </h1>
      ) : <div />}
      <Chessboard
        position={fen}
        onDrop={onDrop}
        boardStyle={{
          borderRadius: '5px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        }}
      />
      <CardActions>
        <Button size="big" onClick={() => undoHandler()}>Undo</Button>
      </CardActions>
      <h2>{game?.current?.pgn()}</h2>
    </div>
  );
}
