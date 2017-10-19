import React, { Component } from 'react'
import './App.css'
import UsersContainer from './components/UsersContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Idea Board</h1>
        </div>
        <UsersContainer />
      </div>
    );
  }
}

export default App