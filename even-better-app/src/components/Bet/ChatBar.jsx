import React from 'react'

// Material UI
import { TextField, FloatingActionButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

const styles = {
  wrapper: {
    display: 'inline-block',
    width: '100%',
    color: '#FFF',
    backgroundColor: '#E0E0E0'
  }
}

const ChatBar = (props) => {

  return(
    <div style={ styles.wrapper }>
      <FloatingActionButton style={{ float: 'right' }} onClick={ (e) => props.handleSendEvent(e) }>
        <ContentAdd />
      </FloatingActionButton>
      <div style={{ padding: '0 10px', overflow: 'hidden'}}>
      <TextField
        value={ props.currentChatMessage }
        onChange={ (e) => props.updateCurrentChatMessage(e) }
        onKeyPress={ (e) => props.handleChatInputKeyPress(e) }
        style={{ float: 'left', width: '100%'}}
      />
      </div>
    </div>
  )
}

export default ChatBar
