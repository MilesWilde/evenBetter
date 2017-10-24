import React, {Component} from 'react';
import Message from './Message';

class MessageList extends Component{  

  render(){
    console.log("Rendering <MessageList>")
    const listItems = this.props.messageList.map((message) => {
      return <Message 
        text={message}/>
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