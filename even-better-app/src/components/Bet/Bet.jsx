import React, { Component } from 'react'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Grids
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

// Websockets
import Cable from 'actioncable'

// Child components
import ChatBar from './ChatBar'
import ChatMessageArea from './ChatMessageArea'
import BetDetails from './BetDetails'

const betDetailsStyle = {

}

const chatMessageAreaStyle = {
  minHeigh: '80%;'
}

const chatBarStyle = {

}

class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      chatLogs: []
    };
  }

  componentWillMount() {
    this.createSocket();
  }

  render() {
    return(
      <MuiThemeProvider>
        <Container fluid={true}>
          <Row>
            <Col xs='4'>
              <BetDetails />
            </Col>
            <Col xs='8'>
              <Container fluid={true}>
                <Row>
                  <Col xs='12'>
                    <ChatMessageArea chatLogs={ this.state.chatLogs } />
                  </Col>
                </Row>
                <Row>
                  <Col xs='12'>
                    <ChatBar
                      currentChatMessage={ this.state.currentChatMessage }
                      updateCurrentChatMessage={ this.updateCurrentChatMessage }
                      handleChatInputKeyPress={ this.handleChatInputKeyPress }
                      handleSendEvent={ this.handleSendEvent }
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </MuiThemeProvider>
    )
  }

  updateCurrentChatMessage = (event) => {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  createSocket = () => {
    let cable = Cable.createConsumer('ws://localhost:3001/cable');
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: (data) => {
        let chatLogs = this.state.chatLogs;
        chatLogs.push(data);
        this.setState({ chatLogs: chatLogs });
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        });
      }
    });
  }

  handleSendEvent = (event) => {
    event.preventDefault();
    if (this.state.currentChatMessage){
      this.chats.create(this.state.currentChatMessage);
      this.setState({
        currentChatMessage: ''
      });
    }
  }

  handleChatInputKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.handleSendEvent(event);
    }
  }

}

export default Bet;
