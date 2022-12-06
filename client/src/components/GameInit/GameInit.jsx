import React, { useState, useRef, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Button, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFen } from '../../redux/actions/fenActions';
import { setMoves } from '../../redux/actions/moveActions';
import './onlineGame.css';

export default function GameInit() {
  // const [fen, setFen] = useState('start');

  const fen = useSelector((store) => store.fen);
  const nextMoves = useSelector((store) => store.move);
  // console.log(nextMoves);

  const [gameOver, setGameOver] = useState();
  const [showCheck, setShowCheck] = useState(false);

  const dispatch = useDispatch();

  const game = useRef(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);

  useEffect(() => {
    if ((game.current.inCheck()) && !(game.current.isCheckmate())) {
      setShowCheck((prev) => !prev);
    }
    if (!(game.current.inCheck())) {
      setShowCheck(false);
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

  console.log({ ...game.current });
  console.log(fen);

  const onDrop = ({ sourceSquare, targetSquare, piece }) => {
    const promotions = game.current.moves({ verbose: true }).filter((m) => m.promotion);
    let promotionTo;
    if (promotions.some((p) => `${p.from}:${p.to}` === `${sourceSquare}:${targetSquare}`)) {
      promotionTo = prompt('Превратите пешку в: r (ладью), b (слона), q (ферзя), или n (коня).');
      if (!(promotionTo === 'r' || promotionTo === 'b' || promotionTo === 'q' || promotionTo === 'n')) {
        // alert('Если не выбирете, ваша пешка автоматически станет ферзем.');
        promotionTo = 'q';
      }
    }

    const nextMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: promotionTo,
      piece,
    };

    const move = game.current.move(nextMove);
    if (move === null) return; // проверка на легальный ход
    console.log(nextMoves);
    console.log({ ...game.current });
    console.log(fen);
    // если легальный, устанавливаем новую позиуцию

    // setFen(game.current.fen());
    // dispatch(moveGame(move));

    dispatch(setMoves(nextMove));

    dispatch(setFen(game.current.fen()));
  };
  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setGameOver();
    dispatch(setFen('start'));
  };

  const undoHandler = () => {
    game.current.undo();
    dispatch(setFen(game.current.fen()));
  };

  const whoMoves = () => {
    if (fen === 'start') {
      return '⚪';
    }
    return game?.current?.turn() === 'w' ? '⚪' : '⚫';
  };

  const chessBoardLocation = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px', width: '80%', marginLeft: '19%',

  };
  return (
    <>
      <div className="whoMoves">
        {gameOver ? (
          <h1 className="">
            {gameOver.info1}
            {' '}
            {gameOver.info2}
            <CardActions>
              <Button size="big" style={{ margin: 'auto' }} onClick={resetGame}>Play Again</Button>
            </CardActions>
          </h1>
        ) : <div />}
        {showCheck && (
        <h1>
          Шах!
        </h1>
        )}
      </div>

      <div className="MainContainer">
        <div style={chessBoardLocation}>
          <div className="ChessBox">
            <h2 className="blackTime">
              {whoMoves() === '⚫' ? '⚫' : ''}
            </h2>
            <Chessboard
              position={fen}
              onDrop={onDrop}
              boardStyle={{
                borderRadius: '5px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
              }}
            />
            <h2 className="whiteTime">
              {whoMoves() === '⚪' ? '⚪' : ''}
            </h2>
          </div>
          <div>
            <div className="PgnContainer">
              <h2 style={{ fontWeight: 'normal' }}>
                {game?.current?.pgn()}
              </h2>
            </div>
            <div className="btns-box">
              <CardActions>
                <Button style={{ color: 'black' }} size="big" onClick={() => undoHandler()}>Undo</Button>
              </CardActions>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
