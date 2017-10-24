import React, { Component } from 'react'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Websockets
import Cable from 'actioncable'

// Child components
import ChatBar from './ChatBar'
import ChatMessageArea from './ChatMessageArea'

const divStyle = {
  minHeight: '100px'
}

class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      chatLogs: [
        { content: 'asdadsads' }
      ]
    };
  }

  componentWillMount() {
    this.createSocket();
  }

  render() {
    return(
      <MuiThemeProvider>
        {/* <div className='stage'>
          <h1>Chat</h1>
          <div className='chat-logs'>
            <ul className='chat-logs'>
              { this.renderChatLog() }
            </ul>
          </div>
        </div> */}
        <div style={divStyle} >
        </div>
        <ChatMessageArea chatLogs={ this.state.chatLogs } />
        <ChatBar
          currentChatMessage={ this.state.currentChatMessage }
          updateCurrentChatMessage={ this.updateCurrentChatMessage }
          handleChatInputKeyPress={ this.handleChatInputKeyPress }
          handleSendEvent={ this.handleSendEvent }
        />
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
    this.chats.create(this.state.currentChatMessage);
    this.setState({
      currentChatMessage: ''
    });
  }

  handleChatInputKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.handleSendEvent(event);
    }//end if
  }

  // renderChatLog = () => {
  //   return this.state.chatLogs.map((el) => {
  //     return (
  //       <li key={`chat_${el.id}`}>
  //         <span className='chat-message'>{ el.content }</span>
  //         <span className='chat-created-at'>{ el.created_at }</span>
  //       </li>
  //     );
  //   });
  // }

}

export default Bet;
