import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Resource from '../../models/resource'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};
const UserStore = Resource('users')
var pointsFunction = require('./ranklogic')



class PointsColumn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className = "invite-column">
        <strong>
              <MenuItem
                primaryText={`Your points: ${this.props.user.points}`}
              />

              <MenuItem
                primaryText={`Your point rank: ${pointsFunction.rankDetermine(this.props.user.points).rank}`}
              />

              <MenuItem
                primaryText={`Points to next rank: ${pointsFunction.rankDetermine(this.props.user.points).pointsToNext}`}
              />

              <MenuItem
                primaryText={`Your betting rank: ${pointsFunction.betRankDetermine(window.localStorage.user_bets).rank}`}
              />

              <MenuItem
                primaryText={`Bets to next rank: ${pointsFunction.betRankDetermine(window.localStorage.user_bets).betsToNext}`}
              />
        </strong>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default PointsColumn;