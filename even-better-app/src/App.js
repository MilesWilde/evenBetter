import React, { Component } from 'react'
import './App.css'
import UsersContainer from './components/UsersContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          
       <div className="App">
          <div className="App-header">
            <h1>Testing the Even-Better backend API</h1>
          </div>
          <UsersContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App