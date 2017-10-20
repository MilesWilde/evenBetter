import React, { Component } from 'react'
import './App.css'
import UsersContainer from './components/UsersContainer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';

import injectTapEventPlugin from 'react-tap-event-plugin';
 

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
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