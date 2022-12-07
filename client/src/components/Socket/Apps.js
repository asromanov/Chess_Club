/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import io from 'socket.io-client';
import React from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chessold';
import ChessMenu from './ChessMenu';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inGame: false,
      passwordCreationInput: '',
      gameJoinInput: '',
      password: '',
      userSocket: '',
      userSocketId: '',
      opponentSocketId: '',
      userColor: '',
      opponentColor: '',
      turnToMove: 'white',
      currentPositionFen: '',
      userInfoMessage: '',
      chessGameObject: new Chess(),
      sourceSquare: '',
      targetSquare: '',
    };
    const socketTemp = io('http://localhost:3001');
    socketTemp.on('connect', () => {
      this.setState({ userSocket: socketTemp, userSocketId: socketTemp.id });

      socketTemp.on('gameSend', (joinObj) => {
        console.log(`message received from${joinObj.senderId}`);

        if (this.state.inGame === false && this.state.password !== '') {
          console.log(`message success from${joinObj.senderId}`);

          this.setState({ opponentSocketId: joinObj.senderId });
          const newObj = {
            usrId: this.state.userSocketId,
            ownerId: joinObj.senderId,
            recipientColor: this.state.opponentColor,
            opponentColor: this.state.userColor,
          };

          socketTemp.emit('finalShake', newObj);
          this.setState({ inGame: true });
        }
      });
      socketTemp.on('NewCurrentPosition', (FENstring) => {
        this.setState({ currentPositionFen: FENstring });
      });
      socketTemp.on(socketTemp.id, (oppObj) => {
        console.log('final shake ');
        this.setState({ opponentSocketId: oppObj.usrId });
        this.setState({ userColor: oppObj.recipientColor });
        this.setState({ opponentColor: oppObj.opponentColor });
        this.setState({ inGame: true });
        this.setState({ currentPositionFen: this.state.chessGameObject.fen() });
      });

      socketTemp.on('NewFenFromServer', (FENobj) => {
        if (this.state.userSocketId === FENobj.RecipientSocketID) {
          this.setState({
            currentPositionFen: FENobj.FEN,
          });
          this.state.chessGameObject.move(FENobj.move);

          if (this.state.chessGameObject.game_over() === true) {
            console.log('GAME OVER');
          }
        }
      });
    });
    this.handleCreationInput = this.handleCreationInput.bind(this);
    this.handleJoinInput = this.handleJoinInput.bind(this);
    this.handleCreationInputChange = this.handleCreationInputChange.bind(this);
    this.handleJoinInputChange = this.handleJoinInputChange.bind(this);
    this.ValidateMove = this.ValidateMove.bind(this);
    this.SendNewFen = this.SendNewFen.bind(this);
    this.onMouseOverSquare = this.onMouseOverSquare.bind(this);
    this.onDragOverSquare = this.onDragOverSquare.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  handleJoinInput() {
    const joinObject = {
      senderId: this.state.userSocketId,
      pw: this.state.gameJoinInput,
    };

    this.state.userSocket.emit('JoinGame', joinObject);
    this.setState({ gameJoinInput: '' });
  }

  handleJoinInputChange(ev) {
    this.setState({ gameJoinInput: ev.target.value });
  }

  handleCreationInput() {
    if (this.state.userColor !== '') {
      this.setState({
        userInfoMessage: 'Game created: waiting for your opponent to join...',
      });
      this.setState({ password: this.state.passwordCreationInput });
      this.setState({ passwordCreationInput: '' });
      this.setState({ currentPositionFen: this.state.chessGameObject.fen() });
    } else {
      this.setState({ userInfoMessage: 'You must select a color' });
    }
  }

  handleCreationInputChange(ev) {
    this.setState({ passwordCreationInput: ev.target.value });
  }

  setColor(ev) {
    this.setState({ userColor: ev.target.value });
    ev.target.value === 'white'
      ? this.setState({ opponentColor: 'black' })
      : this.setState({ opponentColor: 'white' });

    console.log(
      `Your color: ${
        this.state.userColor
      }/n`
        + `Opp color: ${
          this.state.opponentColor}`,
    );
  }

  ValidateMove = ({
    src = this.state.sourceSquare,
    targ = this.state.targetSquare,
  }) => {
    console.log('move being validated');
    if (src !== targ && this.state.chessGameObject.game_over() !== true) {
      this.state.chessGameObject.move({
        from: src,
        to: targ,
        promotion: 'q',
      });
      if (this.state.chessGameObject.game_over() !== true) {
        console.log('Fen about to send off');
        this.setState({ currentPositionFen: this.state.chessGameObject.fen() });
        this.SendNewFen(this.state.chessGameObject.fen(), {
          from: this.state.sourceSquare,
          to: this.state.targetSquare,
          promotion: 'q',
        });
      } else {
        console.log('GAME OVER');
        this.setState({ currentPositionFen: this.state.chessGameObject.fen() });
        this.SendNewFen(this.state.chessGameObject.fen(), {
          from: this.state.sourceSquare,
          to: this.state.targetSquare,
          promotion: 'q',
        });
      }
    }
  };

  SendNewFen(NewFEN, move) {
    this.state.userSocket.emit('PositionSend', {
      FEN: NewFEN,
      RecipientSocketID: this.state.opponentSocketId,
      move,
    });
  }

  onMouseOverSquare = (sq) => {
    this.setState({ sourceSquare: sq });
  };

  onDragOverSquare = (sq) => {
    if (this.state.sourceSquare !== sq) {
      this.setState({ targetSquare: sq });
    }
  };

  render() {
    const { inGame } = this.state;
    let UserMenu;
    if (inGame === false) {
      UserMenu = (
        <ChessMenu
          passwordCreationInput={this.state.passwordCreationInput}
          handleCreationInputChange={this.handleCreationInputChange}
          handleCreationInput={this.handleCreationInput}
          setColor={this.setColor}
          userInfoMessage={this.state.userInfoMessage}
          gameJoinInput={this.state.gameJoinInput}
          handleJoinInputChange={this.handleJoinInputChange}
          handleJoinInput={this.handleJoinInput}
        />
      );
    } else {
      UserMenu = (
        <div className="form-container">
          <Chessboard
            position={this.state.currentPositionFen}
            orientation={this.state.userColor}
            onMouseOverSquare={this.onMouseOverSquare}
            onDragOverSquare={this.onDragOverSquare}
            onDrop={this.ValidateMove}
            darkSquareStyle={{ backgroundColor: '#429963' }}
          />
        </div>
      );
    }
    return <div>{UserMenu}</div>;
  }
}

export default Apps;
