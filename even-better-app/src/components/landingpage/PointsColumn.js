import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};
var pointsFunction = require('./ranklogic')



const PointsColumn = () => (
  <div class = "invite-column">
    <h3> Stats </h3>
    <Paper style={style}>
      <Menu desktop={true} width={320}>
        <MenuItem
          primaryText={`Your points: ${window.localStorage.user_points}`}
        />
        <Divider />

        <MenuItem
          primaryText={`Your point rank: ${pointsFunction.rankDetermine(window.localStorage.user_points).rank}`}
        />
        <Divider />

        <MenuItem
          primaryText={`Points to next rank: ${pointsFunction.rankDetermine(window.localStorage.user_points).pointsToNext}`}
        />
        <Divider />

        <MenuItem
          primaryText={`Your betting rank: ${pointsFunction.betRankDetermine(window.localStorage.user_bets).rank}`}
        />
        <Divider />

        <MenuItem
          primaryText={`Bets to next rank: ${pointsFunction.betRankDetermine(window.localStorage.user_bets).betsToNext}`}
        />
      </Menu>
    </Paper>
  </div>
);

export default PointsColumn;