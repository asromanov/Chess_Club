// import React from 'react';

// export default function Timer({ time, whoMoves }) {

//   function decrementBlackTimer() {
//     setBlackTime((prev) => {
//       if (prev === 0) {
//         setGameOver({
//           info1: 'Закончилось время, ',
//           info2: `${game.current.turn() === 'w' ? 'черные' : 'белые'} выиграли`,
//         });
//         return 300;
//       }
//       // console.log(prev);
//       return prev - 1;
//     });
//   }
//   function decrementWhiteTimer() {
//     setWhiteTime((prev) => {
//       if (prev === 0) {
//         setGameOver({
//           info1: 'Закончилось время, ',
//           info2: `${game.current.turn() === 'w' ? 'черные' : 'белые'} выиграли`,
//         });
//         return 300;
//       }
//       // console.log(prev);
//       return prev - 1;
//     });
//   }

//   function startTimer() {
//     if (timer.current) {
//       clearInterval(timer.current);
//     }
//     const callback = game?.current?.turn() === 'w' ? decrementWhiteTimer : decrementBlackTimer;
//     timer.current = setInterval(callback, 1000);
//   }
//   useEffect(() => {
//     startTimer();
//   }, [fen]);
//   return (
//     <h2 className="whiteTime">
//       ⌛
//       {' '}
//       {Math.floor(time / 60)}
//       {' '}
//       :
//       {' '}
//       {Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60)}
//       {' '}
//       {whoMoves() === '⚪' ? '⚪' : ''}
//     </h2>
//   );
// }
