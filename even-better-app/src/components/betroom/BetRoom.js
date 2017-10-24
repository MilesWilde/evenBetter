import React, { Component } from 'react'
import '../../App.css'
import '../../Splash.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import $ from 'jquery'; 
import MessageList from './MessageList'
import ChatBar from './ChatBar'
import SideBar from './SideBar'

class BetRoom extends Component {

  constructor (props) {
    super(props);
    // this.socket = new WebSocket('ws:localhost:3001');
    this.state = {
      
      currentUser: {name: 'Anonymous'},
      messages: []
    };
  }

  // callback to send to ChatBar to see if user has inputted text
  // sends message to socket server when they do and server handles it
  userTextInput = (msg) => {
    const messages = this.state.messages.concat(msg)
    this.setState({messages: messages})
  };

  componentDidMount() {

    console.log("componentDidMount <BetRoom />");
    // this.socket.onopen = function(event) {
    //   console.log("connected")
    // }
    // when socket receives a message
    // this.socket.onmessage = (event) => {
    //   const incMessage = JSON.parse(event.data);
    //   const messages = this.state.messages.concat(incMessage)
    //   this.setState({messages})
    // }
  }
  // rendering all contents of page
  render() {    
    console.log("Rendering <BetRoom>")
    return (
      
      <div>
        {/* {<SideBar
          userCount = {this.state.userCount}
        /> */}
        <MessageList 
          messageList = {this.state.messages}
        />}
        <ChatBar 
          userInput = {this.userInput}
          currentUser = {this.state.currentUser.name} 
          userTextInput={this.userTextInput} 
        />
      </div>
    );
  }
}
export default BetRoom;