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
                primaryText={`Your point rank: ${pointsFunction.rankDetermine(this.props.user.points).rank}`}
              />

              <MenuItem
                style={{color: '#FFF'}}
                primaryText={`Points to next rank: ${pointsFunction.rankDetermine(this.props.user.points).pointsToNext}`}
              />

              <MenuItem
                style={{color: '#FFF'}}
                primaryText={`Your betting rank: ${pointsFunction.betRankDetermine(window.localStorage.user_bets).rank}`}
              />

              <MenuItem
                style={{color: '#FFF'}}
                primaryText={`Bets to next rank: ${pointsFunction.betRankDetermine(window.localStorage.user_bets).betsToNext}`}
              />
        </strong>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default PointsColumn;
