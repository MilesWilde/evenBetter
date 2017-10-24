import React, { Component } from 'react'
import ActionCable from 'actioncable'
const cable = ActionCable.createConsumer('ws://localhost:3001/cable')

class Chatroom extends Component {

  componentDidMount() {
    cable.subscriptions.create('ChatChannel', {
    // normal channel code goes here...
    })
  }


  render() {
    return(
      <h1>Connecting to AC</h1>
      )
  }
}

export default Chatroom