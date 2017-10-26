import React, { Component } from 'react'
import ChatMessage from './ChatMessage'

const chatMessageAreaStyle = {
  flex: 1,
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'flex-end',
  height: '87vh'
}

class ChatMessageArea extends Component {

  componentDidUpdate() {
    this.scrollChatToBottom()
  }

  render() {
    return(
      <div style={ chatMessageAreaStyle }>
        <div style={{ overflowY: 'auto' }}>
        {this.props.chatLogs.map( (message) => {
          return <ChatMessage key={message.id} message={message}/>
        })}
        <div ref={ (el) => this.messagesEnd = el }></div>
        </div>
      </div>
    )
  }

  scrollChatToBottom = () => {
    this.messagesEnd.scrollIntoView({block: 'start', behavior: 'smooth', inline: 'end'})
  }

}

export default ChatMessageArea
