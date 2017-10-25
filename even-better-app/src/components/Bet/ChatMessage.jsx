import React, { Component } from 'react'

class ChatMessage extends Component{

  render() {
    return(
      <div>
        <span>{ this.props.message.created }: </span>
        <span>{ this.props.message.content }</span>
      </div>
    )
  }
}

export default ChatMessage
