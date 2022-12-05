import React, { useState, useRef, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Button, CardActions } from '@mui/material';
import './onlineGame.css';
// import '@fontsource/roboto/300.css';
import { useDispatch, useSelector } from 'react-redux';
import { fontWeight } from '@mui/system';
import { setFen } from '../../redux/actions/fenActions';
import { setMoves } from '../../redux/actions/moveActions';

export default function GamePage() {
  // const [fen, setFen] = useState('start');

  const fen = useSelector((store) => store.fen);
  const nextMoves = useSelector((store) => store.move);
  console.log(nextMoves);

  const [gameOver, setGameOver] = useState();
  const [showCheck, setShowCheck] = useState(false);

  const dispatch = useDispatch();

  const game = useRef(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);

  useEffect(() => {
    if ((game.current.inCheck()) && !(game.current.isCheckmate())) {
      // setShowCheck((prev) => !prev);
      setTimeout(setShowCheck((prev) => !prev), 1000);

      // setShowCheck((prev) => !prev);
      // alert('Шах!');
    }
    if (!(game.current.inCheck())) {
      setShowCheck(false);
    }
    if (game.current.isCheckmate()) {
      setGameOver({
        info1: 'Мат, ',
        info2: `${game.current.turn() === 'w' ? 'черные' : 'белые'} выиграли`,
      });
      setWhiteTime(300);
      setBlackTime(300);
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

  // console.log({ ...game.current });
  console.log(fen);

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

    const nextMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: promotionTo,
      piece,
    };

    const move = game.current.move(nextMove);
    if (move === null) return; // проверка на легальный ход
    // console.log(sourceSquare, targetSquare, piece);
    // если легальный, устанавливаем новую позиуцию

    dispatch(setMoves(nextMove));

    dispatch(setFen(game.current.fen()));
  };

  const resetGame = () => {
    game.current.clear();
    game.current.reset();
    setGameOver();
    dispatch(setFen('start'));
    setTime();
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

  // timer
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef(null);

  function setTime() {
    setWhiteTime(300);
    setBlackTime(300);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => {
      if (prev === 0) {
        setGameOver({
          info1: 'Закончилось время, ',
          info2: `${game.current.turn() === 'w' ? 'черные' : 'белые'} выиграли`,
        });
        return 300;
      }
      // console.log(prev);
      return prev - 1;
    });
  }
  function decrementWhiteTimer() {
    setWhiteTime((prev) => {
      if (prev === 0) {
        setGameOver({
          info1: 'Закончилось время, ',
          info2: `${game.current.turn() === 'w' ? 'черные' : 'белые'} выиграли`,
        });
        return 300;
      }
      // console.log(prev);
      return prev - 1;
    });
  }

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback = game?.current?.turn() === 'w' ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }
  useEffect(() => {
    startTimer();
  }, [fen]);

  const restartHandler = () => {
    game.current.clear();
    game.current.reset();
    dispatch(setFen('start'));
    setTime();
  };

  //
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
          {/* {() => setShowCheck((prev) => !prev)} */}
        </h1>
        )}
      </div>

      <div className="MainContainer">
        <div style={chessBoardLocation}>
          <div className="ChessBox">
            <h2 className="blackTime">
              ⌛
              {' '}
              {blackTime}
              {' '}
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
              ⌛
              {' '}
              {whiteTime}
              {' '}
              {whoMoves() === '⚪' ? '⚪' : ''}
            </h2>
          </div>
          <div>
            {/* <h2>{game?.current?.pgn()}</h2> */}
            <div className="PgnContainer">
              <h2 style={{ fontWeight: 'normal' }}>
                {game?.current?.pgn()}
              </h2>
            </div>
            <div className="btns-box">
              <CardActions>
                <Button size="big" onClick={() => restartHandler()}>Reset</Button>
              </CardActions>
              <CardActions>
                <Button size="big" onClick={() => undoHandler()}>Undo</Button>
              </CardActions>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
