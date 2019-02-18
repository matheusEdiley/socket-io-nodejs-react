import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import {
  Button, Panel, Form, FormControl, FormGroup,
  Well, Col, ControlLabel, Glyphicon
} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:5000",
      message: '',
      mgsReceived: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // sending sockets
  send = () => {
    console.log(this.state.message);
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('msg', this.state.message)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  render() {

    const socket = socketIOClient(this.state.endpoint);
    socket.on('msg', (msg) => {
      this.state.mgsReceived = msg;
      this.setState({});
    })

    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Socket.IO</h1>
        </header>

        <Panel className="App-form">
          <h3> <Glyphicon glyph="transfer" /> </h3>
          <Form id="genericForm" horizontal>

            <div>

              <FormGroup controlId="formHorizontalEmail">
                
                <Col componentClass={ControlLabel} sm={2}>
                  Message
                </Col>

                <Col sm={10}>
                  <FormControl name="message" onChange={this.handleChange}
                    placeholder="Enter a message" />
                </Col>
              </FormGroup>

              <Button className="App-button" bsStyle="primary" onClick={() => this.send()}> Send <Glyphicon glyph="send" />
              </Button>
            
            </div>
          </Form>
        </Panel>
        {this.state.mgsReceived.length > 0 ?
          <Panel className="App-form">

            <h3> <Glyphicon glyph="comment" /> </h3>
            {<Well bsSize="large" >{this.state.mgsReceived}</Well>}

          </Panel>: ""
        }

      </div>
    )
  }
}
export default App;