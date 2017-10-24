import React, { Component } from 'react'

class ChatBar extends Component{
  constructor (props) {
    super(props);

  }
  // event handler for hitting enter on message box
  handleTextPress(event) {
    if(event.key == 'Enter'){
      this.props.userTextInput(event.target.value);
      event.target.value = null;
    }
  }
  // event handler for hitting enter on user box
  handleUserPress(event){
    if(event.key == 'Enter'){
      this.props.userInput(event.target.value);
    }
  }
  
  render(){
    console.log("Rendering <ChatBar>")
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          onKeyPress={this.handleUserPress.bind(this)}
          defaultValue = {this.props.currentUser}/>
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          onKeyPress={this.handleTextPress.bind(this)}/>
      </footer>
    )
  }
}
  
  
  export default ChatBar;