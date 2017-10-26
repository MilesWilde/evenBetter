import React from 'react'

const flexBox = {
  flex: '0 0 0',
  width: '30px',
  border: '2px solid black',
  minWidth: '320px',
  height: '50px'
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
