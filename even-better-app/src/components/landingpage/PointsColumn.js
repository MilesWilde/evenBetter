import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

var pointsFunction = require('./ranklogic')



class PointsColumn extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className = "invite-column">
        <strong>
              <MenuItem
                style={{color: '#FFF'}}
              >
              <h3 style = {{color: '#FFF'}}>Points: {this.props.user.points}</h3>
              </MenuItem>              
        </strong>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default PointsColumn;
