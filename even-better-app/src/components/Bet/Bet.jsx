import React, { Component } from 'react'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Websockets
import Cable from 'actioncable'

// Child components
import ChatBar from './ChatBar'
import ChatMessageArea from './ChatMessageArea'
import BetDetails from './BetDetails'

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
        <div id='bet-container'>
          <div id='bet-details-container'>
            <BetDetails />
          </div>
          <div id='bet-chat-container'>
            <div id='bet-chat-log'>
              <ChatMessageArea chatLogs={ this.state.chatLogs } />
            </div>
            <div id='bet-chat-bar'>
              <ChatBar
                currentChatMessage={ this.state.currentChatMessage }
                updateCurrentChatMessage={ this.updateCurrentChatMessage }
                handleChatInputKeyPress={ this.handleChatInputKeyPress }
                handleSendEvent={ this.handleSendEvent }
              />
            </div>
          </div>
        </div>
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
