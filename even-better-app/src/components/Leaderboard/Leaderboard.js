import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Resource from '../../models/resource'
import './Leaderboard.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

var pointsFunction = require('../landingpage/ranklogic')

const styles = {
  tableRowColumn: {
    fontSize: '18px'
  },
  tableHeaderColumn: {
    fontSize: '24px'
  }
}
const UserStore = Resource('users')
var topUsers = []

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      leaderArray: []
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  componentWillMount() {
    UserStore.findAll()
      .then((response) => {
        response.sort((a,b) => {
          return b.points - a.points
        })
        this.setState({
          leaderArray: response
        })
        console.log(response)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  render() {
    const leaderList = this.state.leaderArray.map((user) => {
      return (
        <TableRow>
          <TableRowColumn style = {styles.tableRowColumn}>{this.state.leaderArray.indexOf(user) + 1}</TableRowColumn>
          <TableRowColumn style = {styles.tableRowColumn}>{user.username}</TableRowColumn>
          <TableRowColumn style = {styles.tableRowColumn}>{user.points}   </TableRowColumn>
          <TableRowColumn style = {styles.tableRowColumn}>{pointsFunction.rankDetermine(user.points).rank}</TableRowColumn>
        </TableRow>
      )
    }).slice(0,10)
    return (
      <MuiThemeProvider>
        <h1>Leaderboard</h1>  
        <Table>
          <TableBody displayRowCheckbox = {false}>
            <TableRow>
                <TableHeaderColumn style = {styles.tableHeaderColumn}>rank</TableHeaderColumn>
                <TableHeaderColumn style = {styles.tableHeaderColumn}>username</TableHeaderColumn>
                <TableHeaderColumn style = {styles.tableHeaderColumn}>points</TableHeaderColumn>
                <TableHeaderColumn style = {styles.tableHeaderColumn}>title</TableHeaderColumn>
            </TableRow>
            {leaderList}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    )
  }
}

export default Leaderboard