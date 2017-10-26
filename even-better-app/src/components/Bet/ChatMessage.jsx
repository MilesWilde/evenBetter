import React from 'react'

const flexBox = {
  display: 'flex',
  flex: '0 0 0',
  border: '2px solid black',
  width: '100%',
  minHeight: '50px'
}

const ChatMessage = (props) => {

  return(
    <div style={ flexBox }>
      <span>{ props.message.created }: </span>
      <span>{ props.message.content }</span>
    </div>
  )

}

export default ChatMessage
