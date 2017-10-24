import React, { Component } from 'react'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import PropTypes from 'prop-types';
import { TextField, FloatingActionButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

class ChatBar extends Component{

  render() {
    return(
      <div>
        <TextField
          value={ this.props.currentChatMessage }
          onChange={ (e) => this.props.updateCurrentChatMessage(e) }
          onKeyPress={ (e) => this.props.handleChatInputKeyPress(e) }
        />
        <FloatingActionButton onClick={ (e) => this.props.handleSendEvent(e) }>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default ChatBar;
