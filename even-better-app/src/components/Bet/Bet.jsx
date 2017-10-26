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
        users: []
      }
    };
  }

  componentWillMount() {
    this.createSocket();
    BetStore.find(1) // replace with ID later
    .then( (bet) => {
      this.setState({ betDetails: bet })
    })
    .catch( (err) => {
      console.log(err)
    })
  }

  render() {
    return(
      <Container fluid={true}>
        <Row>
          <Col xs='4'>
            <BetDetails
              title={ this.state.betDetails.title }
              description={ this.state.betDetails.description }
              pool={ this.state.betDetails.pool}
              bettingDeadline={ this.state.betDetails.betting_deadline }
              outcomeDeadline={ this.state.betDetails.outcome_deadline }
              outcomeId={ this.state.betDetails.outcome_id }
              possibilities={ this.state.betDetails.possibilities }
              users={ this.state.betDetails.users }
            />
          </Col>
          <Col xs='8'>
            <Container fluid={true}>
              <Row>
                <Col xs='12'>
                  <ChatMessageArea chatLogs={ this.state.chat.chatLogs } />
                </Col>
              </Row>
              <Row>
                <Col xs='12'>
                  <ChatBar
                    currentChatMessage={ this.state.chat.currentChatMessage }
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
