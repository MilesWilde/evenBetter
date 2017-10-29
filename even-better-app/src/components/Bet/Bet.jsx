import React, { Component } from 'react'
import _ from 'underscore'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Dialog, FlatButton } from 'material-ui'

// Websockets
import Cable from 'actioncable'

// Child components
import ChatBar from './ChatBar'
import ChatMessageArea from './ChatMessageArea'
import BetDetails from './BetDetails'
import CompleteBetConfirmation from './CompleteBetConfirmation'


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
        id: null,
        title: '',
        description: '',
        pool: 0,
        betting_deadline: Date.now,
        outcome_deadline: Date.now,
        outcome_id: null,
        possibilities: [],
        users: [],
        mediator_id: null
      },
      showConfirmation: false,
      currentlySelectedPossibility: null
    };
  }

  componentWillMount() {
    const BetUsersStore = Resource(`bets/${this.props.match.params.id}/bets_users`)
    this.createSocket()

    Promise.all([
      BetStore.find(this.props.match.params.id)
      .then( (bet) => {
        return bet
      })
      .catch( (err) => {
        console.log(err)
      }),

      BetUsersStore.findAll()
      .then( (betUsers) => {
        return betUsers
      })
      .catch( (err) => {
        console.log(err)
      })
    ])
    .then( (details) => {
      // combine the user details returned from the bet and the user details from the bets_users table
      let mappedUsers = _.map(details[0].users, (user) => {
        return _.extend(user, _.omit(_.findWhere(details[1], {user_id: user.id}), 'user_id'));
      });
      details[0].users = mappedUsers
      this.setState({ betDetails: details[0] })
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
    const confirmationActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.handlePossibilitySelectionConfirmationClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmitPossibility}
      />,
    ];
    return(
      <div style={ styles.wrapper }>
        <div style={ styles.betBox }>
          <BetDetails
            id={ this.state.betDetails.id }
            title={ this.state.betDetails.title }
            description={ this.state.betDetails.description }
            pool={ this.state.betDetails.pool}
            bettingDeadline={ this.state.betDetails.betting_deadline }
            outcomeDeadline={ this.state.betDetails.outcome_deadline }
            outcomeId={ this.state.betDetails.outcome_id }
            mediator={ this.state.betDetails.mediator }
            mediatorId={ this.state.betDetails.mediator_id }
            possibilities={ this.state.betDetails.possibilities }
            users={ this.state.betDetails.users }
            handlePossibilitySelectionConfirmationOpen={
              !this.state.betDetails.outcome_id && this.state.betDetails.mediator_id == window.localStorage.user_id ?
              this.handlePossibilitySelectionConfirmationOpen : undefined
              }
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
        <Dialog
          title="Are you sure?"
          actions={confirmationActions}
          modal={false}
          open={this.state.showConfirmation}
          onRequestClose={this.handlePossibilitySelectionConfirmationClose}
        >
          Selecting Submit will set "{this.state.currentlySelectedPossibility && this.state.betDetails.possibilities.find( (possibility) => {
            return possibility.id == this.state.currentlySelectedPossibility
          }).description }" as the winning outcome.
        </Dialog>
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
      channel: 'ChatChannel',
      room: this.props.match.params.id,
      Authorization: 'Bearer ' + window.localStorage.auth_token
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

  handlePossibilitySelectionConfirmationOpen = (e) => {
    this.setState({showConfirmation: true, currentlySelectedPossibility: e.currentTarget.dataset.id});
  };

  handlePossibilitySelectionConfirmationClose = () => {
    this.setState({showConfirmation: false, currentlySelectedPossibility: null});
  };

  handleSubmitPossibility = () => {
    BetStore.update(this.state.betDetails.id, { outcome_id: this.state.currentlySelectedPossibility })
    .then( (res) => {
      this.setState({
        currentlySelectedPossibility: null,
        betDetails: {
          ...res.data
        }
      })
      return
    })
    .then( () => {
      this.handlePossibilitySelectionConfirmationClose()
    })
    .catch( (err) => {
      console.log(err.response.data.message)
    })
  }
}

export default Bet;
