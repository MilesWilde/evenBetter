import React from 'react'
import Chip from 'material-ui/Chip';

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
  }
}

const BetDetails = (props) => {
  return(
    <div style={{ padding: '0 10px' }}>
      <h1>{ props.title }</h1>
      <p>{ props.description }</p>
      <h3>Pool: { props.pool }</h3>
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
      <h3>Betting Deadline: { props.bettingDeadline }</h3>
      <h3>Outcome Deadline: { props.outcomeDeadline }</h3>
    </div>
  )
}


export default BetDetails
