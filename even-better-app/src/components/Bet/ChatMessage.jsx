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
  wrapperMe: {
    padding: '10px',
    textAlign: 'right'
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

  if (window.localStorage.user_id == props.message.user_id) {
    return(
      <div style={ styles.wrapperMe }>
        <span>{ props.message.content }</span>
        <div style={ styles.timestamp }>{ Moment(props.message.created_at).local().format('MMM-DD h:mm A') } </div>
      </div>
    )
  } else {
    return(
      <div style={ styles.wrapper }>
        <span style={ styles.user }>{ props.message.user }: </span>
        <span>{ props.message.content }</span>
        <div style={ styles.timestamp }>{ Moment(props.message.created_at).local().format('MMM-DD h:mm A') } </div>
      </div>
    )
  }

}

export default ChatMessage
