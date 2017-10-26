import React from 'react'
import ChatMessage from './ChatMessage'

const flexContainer = {
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'flex-end',
  height: '92%',
  overflow: 'hidden'
}

const ChatMessageArea = (props) => {

  return(
    <div style={ flexContainer }>
    {props.chatLogs.map( (message) => {
      return <ChatMessage key={message.id} message={message}/>
    })}
    </div>
  )

}

export default ChatMessageArea
