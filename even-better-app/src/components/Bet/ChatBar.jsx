import React from 'react'

// Material UI
import { TextField, FloatingActionButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

const ChatBar = (props) => {

  return(
    <div>
      <TextField
        value={ props.currentChatMessage }
        onChange={ (e) => props.updateCurrentChatMessage(e) }
        onKeyPress={ (e) => props.handleChatInputKeyPress(e) }
        style={{ minWidth: '80%'}}
      />
      <FloatingActionButton onClick={ (e) => props.handleSendEvent(e) }>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  )
}

export default ChatBar
