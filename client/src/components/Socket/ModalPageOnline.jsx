import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
//   align: 'center',
};

export default function ModalPageOnline({ chess }) {
  // const fen = useSelector((store) => store.fen);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // if (chess?.in_checkmate()) {
    //   setGameOver({
    //     info1: 'Мат ',
    //     info2: `${chess?.turn() === 'w' ? 'Черные' : 'Белые'} выиграли`,
    //   });
    // }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [gameOver, setGameOver] = useState();
  // console.log('>', chess);
  console.log(chess?.turn());
  useEffect(() => {
    // console.log('22222');
    // if ((chess?.inCheck()) && !(chess?.isCheckmate())) {
    //   setShowCheck((prev) => !prev);
    // }
    // if (!(chess?.inCheck())) {
    //   setShowCheck(false);
    // }
    if (chess?.in_checkmate()) {
      setGameOver({
        info1: 'Мат ',
        info2: `${chess?.turn() === 'w' ? 'Черные' : 'Белые'} выиграли`,
      });
      setOpen(true);
    }
    if (chess?.in_draw()) {
      setGameOver({
        info1: 'Ничья ',
        info2: '',
      });
      setOpen(true);
    }
    if (chess?.in_stalemate()) {
      setGameOver({
        info1: 'Пат ',
        info2: 'ничья',
      });
      setOpen(true);
    }
    if (chess?.insufficient_material()) {
      setGameOver({
        info1: 'Недостаточно фигур, ',
        info2: 'ничья',
      });
    }
    if (chess?.in_threefold_repetition()) {
      setGameOver({
        info1: 'Трехкратное повторение позиции, ',
        info2: 'ничья',
      });
    }
  }, [chess?.turn()]);

  // if (chess?.in_checkmate()) {
  //   console.log('1111111111111');
  //   setGameOver({
  //     info1: 'Мат ',
  //     info2: `${chess?.turn() === 'w' ? 'Черные' : 'Белые'} выиграли`,
  //   });
  // }

  console.log(open);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
            {gameOver?.info1}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center' }}>
            {gameOver?.info2}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center' }}>
            Ходы:
            {' '}
            {chess?.pgn()}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
