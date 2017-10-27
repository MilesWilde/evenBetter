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

// Client side model
import Resource from '../../models/resource'
const BetStore = Resource('bets')

const styles = {
  wrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignContent: 'stretch',
    alignItems: 'stretch',
    overflow: 'hidden',
    color: '#FFF'
  },
  chatBox: {
    flex: '1 1 0',
    width: '30px',
    minWidth: '320px',
  },
  betBox: {
    flex: '1 1 0',
    width: '30px',
    minWidth: '320px',
    backgroundColor: '#455A64',
  }
}

class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {
        currentChatMessage: '',
        chatLogs: []
      },
      betDetails: {
        title: '',
        description: '',
        pool: 0,
        betting_deadline: Date.now,
        outcome_deadline: Date.now,
        outcome_id: null,
        possibilities: [],
        users: [],
        mediator_id: null
      }
    };
  }

  componentWillMount() {
    this.createSocket()

    BetStore.find(this.props.match.params.id)
    .then( (bet) => {
      this.setState({ betDetails: bet })
    })
    .catch( (err) => {
      console.log(err)
    })

    const MessageStore = Resource(`bets/${ this.props.match.params.id }/messages/`)

    MessageStore.findAll()
    .then( (chatLogs) => {
      for (let message of chatLogs) {
        message.user = message.user.username
      }
      return chatLogs
    })
    .then( (chatLogs) => {
      this.setState({
        chat: {
          ...this.state.chat,
          chatLogs: chatLogs
        }
      })
    })
    .catch( (err) => {
      console.log(err)
    })
  }

  render() {
    return(
      <div style={ styles.wrapper }>
        <div style={ styles.betBox }>
          <BetDetails
            title={ this.state.betDetails.title }
            description={ this.state.betDetails.description }
            pool={ this.state.betDetails.pool}
            bettingDeadline={ this.state.betDetails.betting_deadline }
            outcomeDeadline={ this.state.betDetails.outcome_deadline }
            outcomeId={ this.state.betDetails.outcome_id }
            mediator={ this.state.betDetails.mediator }
            possibilities={ this.state.betDetails.possibilities }
            users={ this.state.betDetails.users }
          />
        </div>
        <div style={ styles.chatBox }>
          <ChatMessageArea chatLogs={ this.state.chat.chatLogs } />
          <ChatBar
            currentChatMessage={ this.state.chat.currentChatMessage }
            updateCurrentChatMessage={ this.updateCurrentChatMessage }
            handleChatInputKeyPress={ this.handleChatInputKeyPress }
            handleSendEvent={ this.handleSendEvent }
          />
        </div>
      </div>
    )
  }

  updateCurrentChatMessage = (event) => {
    this.setState({
      chat: {
        ...this.state.chat,
        currentChatMessage: event.target.value
      }
    });
  }

  createSocket = () => {
    let cable = Cable.createConsumer('ws://localhost:3001/cable');
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: (data) => {
        let chatLogs = this.state.chat.chatLogs;
        chatLogs.push(data);
        this.setState({ chat: {
        ...this.state.chat,
          chatLogs: chatLogs
        }});
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
    if (this.state.chat.currentChatMessage){
      this.chats.create(this.state.chat.currentChatMessage);
      this.setState({
        chat: {
          ...this.state.chat,
          currentChatMessage: ''
        }
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
