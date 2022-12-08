/* eslint-disable max-len */
import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  boxShadow: 1,

//   align: 'center',
};

export default function ModalPage({ chess }) {
  const fen = useSelector((store) => store.fen);
  const [open, setOpen] = useState(false);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [gameOver, setGameOver] = useState();

  useEffect(() => {
    // if ((chess?.inCheck()) && !(chess?.isCheckmate())) {
    //   setShowCheck((prev) => !prev);
    // }
    // if (!(chess?.inCheck())) {
    //   setShowCheck(false);
    // }
    if (chess?.isCheckmate()) {
      setGameOver({
        info1: 'Мат ',
        info2: `${chess?.turn() === 'w' ? 'Черные' : 'Белые'} выиграли`,
      });
      setOpen(true);
    }
    if (chess?.isDraw()) {
      setGameOver({
        info1: 'Ничья ',
        info2: '',
      });
      setOpen(true);
    }
    if (chess?.isStalemate()) {
      setGameOver({
        info1: 'Пат ',
        info2: 'ничья',
      });
      setOpen(true);
    }
    if (chess?.isInsufficientMaterial()) {
      setGameOver({
        info1: 'Недостаточно фигур, ',
        info2: 'ничья',
      });
    }
    if (chess?.isThreefoldRepetition()) {
      setGameOver({
        info1: 'Трехкратное повторение позиции, ',
        info2: 'ничья',
      });
    }
  }, [fen]);

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
        <Box sx={style} style={{ borderRadius: '7px' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
            {gameOver?.info1}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }} style={{ textAlign: 'center' }} color="text.secondary" gutterBottom>
            <strong>{gameOver?.info2}</strong>
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center' }}>
            Ходы:
            {' '}
            {chess?.pgn()}
          </Typography> */}
          <Typography sx={{ fontSize: 14, mt: 1 }} style={{ textAlign: 'center' }} color="text.secondary" gutterBottom>
            <strong>Ходы: </strong>
            {chess?.pgn()}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
