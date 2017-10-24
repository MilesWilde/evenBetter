import React, {Component} from 'react';
import Message from './Message';

class MessageList extends Component{  

  render(){
    console.log("Rendering <MessageList>")
    const listItems = this.props.messageList.map((message) => {
      return <Message 
        type={message.type} 
        key={message.id} 
        user={message.username} 
        prevUser ={message.previousName} 
        text={message.message}/>
    })
    return (
      <div>
        <main className="messages">
          {listItems}
        </main>
      </div>

    )
  }
}


export default MessageList;