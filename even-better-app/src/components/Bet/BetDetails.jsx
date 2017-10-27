import React from 'react'
import Chip from 'material-ui/Chip'
import Moment from 'moment'

const styles = {
  chip: {
    margin: 4,
    backgroundColor: '#80DEEA'
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
      { props.possibilities.map( (possibility) => {
        return <Chip style={ styles.chip } labelColor='#000'>{ possibility.description }</Chip>
      })}
      </div>
      <h3 style={ styles.header }>Participants</h3>
      <div style={ styles.wrapper }>
      { props.users.map( (user) => {
        return <Chip style={ styles.chip } labelColor='#000'>{ user.username }</Chip>
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
