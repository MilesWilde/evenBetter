import React, { Component } from 'react'
import ChatMessage from './ChatMessage'

class ChatMessageArea extends Component{

  render() {
    return(
      this.props.chatLogs.map( (message) => {
        return <ChatMessage content={message.content}/>
      })
    )
  }
}

export default ChatMessageArea
