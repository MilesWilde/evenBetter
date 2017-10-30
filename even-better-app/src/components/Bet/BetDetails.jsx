import React from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Moment from 'moment'

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignContent: 'space-around',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  box: {
    flex: '0 0 0',
    minWidth: '100px'
  },
  header: {
    borderBottom: '1px solid #FFF'
  },
  dates: {
    fontStyle: 'italic'
  },
  p: {
    padding: '5px'
  }
}


const BetDetails = (props) => {

  return(
    <div style={{ padding: '0 10px' }}>
      <h1>{ props.title }</h1>
      <p style={ styles.p }>{ props.description }</p>
      <h3>Pool: <span style={{color: '#00C853'}}>{ props.pool } points</span></h3>
      <h3 style={ styles.header }>Possibilities</h3>
      <div style={ styles.wrapper }>
      { props.possibilities.map( (possibility, index) => {
        let backgroundColor = '#0097A7'
        // default background red (lose) when outcome deadlind reached
        new Date(props.outcomeDeadline) < new Date(Date.now()) ? backgroundColor = '#FF5252' : null
        if (props.outcomeId && props.outcomeId === possibility.id) {
          backgroundColor = '#00C853' // green for the winning outcome
        } else if (props.outcomeId) {
          backgroundColor = '#FF5252' // red for the losing outcome(s)
        }
        return (
          <Chip
            key={ possibility.id }
            data-id={ possibility.id }
            style={ styles.chip }
            onClick={ props.outcomeId ? undefined : props.handlePossibilitySelectionConfirmationOpen }
            backgroundColor={ backgroundColor }
            labelColor='#000'
          >
            <Avatar>{ index + 1 }</Avatar>
            { possibility.description }
          </Chip>
        )
      })}
      </div>
      <h3 style={ styles.header }>Participants</h3>
      <div style={ styles.wrapper }>
      { props.users.map( (user) => {
        if (user.id !== props.mediatorId) {
          let backgroundColor = undefined
          // default background red (lose) when outcome deadlind reached
          new Date(props.outcomeDeadline) < new Date(Date.now()) ? backgroundColor = '#FF5252' : null
          if (props.outcomeId && props.outcomeId === user.possibility_id) {
            backgroundColor = '#00C853' // green for the winner(s)
          } else if (props.outcomeId) {
            backgroundColor = '#FF5252' // red for the loser(s)
          }
          let possibilityIndex = null
          const userPossibility = props.possibilities.find( (possibility, index) => {
            possibilityIndex = index
            return possibility.id === user.possibility_id
          })
          return <Chip style={ styles.chip } key={user.id} labelColor='#000' backgroundColor={ backgroundColor }><Avatar>{ userPossibility ? possibilityIndex + 1 : '-' }</Avatar>{ user.username }</Chip>
        } else {
          return null
        }
      })}
      </div>
      { props.mediator &&
      [<h3 style={ styles.header }>Mediator</h3>,<Chip style={ styles.chip }>{ props.mediator.username }</Chip>]
      }
      <p style={ styles.p }>User acceptance cutoff { new Date(Date.now()).toISOString < props.bettingDeadline ? 'is' : 'was' } <span style={ styles.dates }>{ Moment(props.bettingDeadline).local().calendar() }</span></p>
      <p style={ styles.p }>This bet { new Date(Date.now()).toISOString < props.bettingDeadline ? 'ends' : 'ended' } <span style={ styles.dates }>{ Moment(props.outcomeDeadline).local().calendar() }</span></p>
    </div>
  )
}


export default BetDetails
