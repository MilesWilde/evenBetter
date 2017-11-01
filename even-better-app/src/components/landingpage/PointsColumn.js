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
                primaryText={`Your points: ${this.props.user.points}`}
              />
              <MenuItem
                style={{color: '#FFF'}}
                primaryText={`Points to next rank: ${pointsFunction.rankDetermine(this.props.user.points).pointsToNext}`}
              />
        </strong>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default PointsColumn;
