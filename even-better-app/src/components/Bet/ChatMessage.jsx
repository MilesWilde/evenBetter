import React, { Component } from 'react'

class ChatMessage extends Component{

  render() {
    return(
      <div>{this.props.content}</div>
    )
  }
}

export default ChatMessage
