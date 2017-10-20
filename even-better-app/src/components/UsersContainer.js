import React, { Component } from 'react'
import axios from 'axios'

class UsersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/users.json')
    .then(response => {
      console.log(response)
      this.setState({users: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => {
          return(
            <div className="tile" key={user.id} >
              <h4>{user.username}</h4>
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
              <p>{user.password_hash}</p>
            </div>
          )       
        })}
      </div>
    );
  }
}

export default UsersContainer