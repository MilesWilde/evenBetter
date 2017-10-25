import React, { Component } from 'react'
import ChatMessage from './ChatMessage'

class ChatMessageArea extends Component{

  render() {
    return(
      this.props.chatLogs.map( (message) => {
        return <ChatMessage key={message.id} message={message}/>
      })
    )
  }
}

export default ChatMessageArea
