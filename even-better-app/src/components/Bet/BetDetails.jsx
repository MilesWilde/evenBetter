import React from 'react'

const BetDetails = (props) => {
  return(
    <div>
      <h1>{ props.title }</h1>
      <p>{ props.description }</p>
      <h3>Pool: { props.pool }</h3>
      <h3>Possibilities</h3>
      <ul>
      { props.possibilities.map( (possibility) => {
        return <li>{ possibility.description }</li>
      })}
      </ul>
      <h3>Participants</h3>
      <ul>
      { props.users.map( (user) => {
        return <li>{ user.username }</li>
      })}
      </ul>
      <h3>Betting Deadline: { props.bettingDeadline }</h3>
      <h3>Outcome Deadline: { props.outcomeDeadline }</h3>
    </div>
  )
}


export default BetDetails
