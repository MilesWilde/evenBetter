import React from 'react'
import Moment from 'moment'

const flexBox = {
  display: 'flex',
  flex: '0 0 0',
  width: '100%',
  minHeight: '50px'
}

const styles = {
  wrapper: {
    padding: '10px'
  },
  user: {
    fontWeight: 'bold'
  },
  content: {

  },
  timestamp: {
    fontStyle: 'italic'
  }
}

const ChatMessage = (props) => {

  return(
    <div style={ styles.wrapper }>
      <span style={ styles.user }>{ props.message.user } </span>
      <span>{ props.message.content }</span>
      <div style={ styles.timestamp }>{ Moment(props.message.created_at).local().format('MMM-DD h:mm A') } </div>
    </div>
  )

}

export default ChatMessage
