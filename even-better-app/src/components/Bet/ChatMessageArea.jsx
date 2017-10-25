import React from 'react'
import ChatMessage from './ChatMessage'

const ChatMessageArea = (props) => {

  return(
    props.chatLogs.map( (message) => {
      return <ChatMessage key={message.id} message={message}/>
    })
  )

}

export default ChatMessageArea
