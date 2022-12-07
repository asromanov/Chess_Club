/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

// eslint-disable-next-line react/prefer-stateless-function
class ChessMenu extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h3 style={{
            textAlign: 'center', marginTop: '50px', fontFamily: 'Roboto',
          }}
          >
            Введите код или создайте новую игру
          </h3>
          <div className="form-container">
            <Form id="mainForm">
              <Form.Group controlId="formCreateGame">
                <Form.Label>Придумайте код, чтобы начать игру по сети</Form.Label>
                <Form.Control
                  type="text"
                  value={this.props.passwordCreationInput}
                  onChange={this.props.handleCreationInputChange}
                />
                <Button style={{ marginTop: '10px' }} variant="secondary" onClick={this.props.handleCreationInput}>
                  Создать игру
                </Button>
                <div style={{ marginTop: '10px' }} onChange={this.props.setColor}>
                  <Form.Check
                    name="colorSelect"
                    type="radio"
                    inline
                    label="Б"
                    value="white"
                  />
                  <Form.Check
                    name="colorSelect"
                    type="radio"
                    inline
                    label="Ч"
                    value="black"
                  />
                </div>
                <Alert
                  variant="info"
                  show={this.props.userInfoMessage !== ''}
                >
                  {this.props.userInfoMessage}
                </Alert>
              </Form.Group>

              <Form.Group style={{ marginTop: '10px' }}>
                <Form.Label>Введите код, чтобы войти в игру</Form.Label>
                <Form.Control
                  value={this.props.gameJoinInput}
                  onChange={this.props.handleJoinInputChange}
                />

                <Button style={{ marginTop: '10px' }} variant="secondary" onClick={this.props.handleJoinInput}>
                  Войти в игру
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default ChessMenu;
