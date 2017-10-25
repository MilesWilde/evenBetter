import React from 'react'

const ChatMessage = (props) => {

  return(
    <div>
      <span>{ props.message.created }: </span>
      <span>{ props.message.content }</span>
    </div>
  )

}

export default ChatMessage
