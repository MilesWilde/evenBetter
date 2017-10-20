import React, { Component } from 'react'
import axios from 'axios'

class UsersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/users.json')
    .then(response => {
      console.log(response)
      this.setState({games: response.data.games})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        {this.state.games.map((game) => {
          return(
            <div>
              <h4>{game.gameType}</h4>
              <p>{game.awayTeamName} at {game.homeTeamName}</p>        
            </div>
          )       
        })}
      </div>
    )
  }
}

export default UsersContainer