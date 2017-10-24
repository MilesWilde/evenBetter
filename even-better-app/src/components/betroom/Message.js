import React, {Component} from 'react';

class Message extends Component{  
  render(){
    console.log("Rendering <Message>")
    debugger
    return (
      <main className="messages">
        <span className="message-username">{this.props.user}</span>
        <span className="message-content">{this.props.text}</span>
      </main>
    )
  }
}

export default Message;