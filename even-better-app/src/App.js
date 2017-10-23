import React, { Component } from 'react'
import './App.css'
import UsersContainer from './components/UsersContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import SplashPage from './components/splashpage/SplashPage'

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <SplashPage />
          
       <div className="App">

          <UsersContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App