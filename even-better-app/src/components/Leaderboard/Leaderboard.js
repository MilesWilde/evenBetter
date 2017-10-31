import React, { Component } from 'react'
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
    fontSize: '18px',
    textAlign: 'left'
  },
  tableHeaderColumn: {
    fontSize: '24px',
    color: '#000',
    textAlign: 'left'
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
    const leaderList = this.state.leaderArray.map((user, index) => {
      return (
        <TableRow style={ index % 2 === 0 ? {backgroundColor: '#9E9E9E' } : {backgroundColor: '#E0E0E0'} }>
          <TableRowColumn style = {styles.tableRowColumn}>{this.state.leaderArray.indexOf(user) + 1}</TableRowColumn>
          <TableRowColumn style = {styles.tableRowColumn}>{user.username}</TableRowColumn>
          <TableRowColumn style = {styles.tableRowColumn}>{user.points}   </TableRowColumn>
          <TableRowColumn style = {styles.tableRowColumn}>{pointsFunction.rankDetermine(user.points).rank}</TableRowColumn>
        </TableRow>
      )
    }).slice(0,10)
    return (
      <div style={{ backgroundColor: '#E0E0E0', height: 'calc(100vh - 64px)' }}>
        <h1 style={{ margin: '0', padding: '10px', textAlign: 'center'}}>Leaderboard</h1>
        <Table selectable={ false }>
          <TableHeader adjustForCheckbox={false} displaySelectAll = {false} enableSelectAll={ false }>
            <TableRow style={{ backgroundColor: '#E0E0E0' }} striped={false}>
              <TableHeaderColumn style = {styles.tableHeaderColumn}>RANK</TableHeaderColumn>
              <TableHeaderColumn style = {styles.tableHeaderColumn}>USERNAME</TableHeaderColumn>
              <TableHeaderColumn style = {styles.tableHeaderColumn}>POINTS</TableHeaderColumn>
              <TableHeaderColumn style = {styles.tableHeaderColumn}>TITLE</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox = {false} stripedRows={ false }>
            {leaderList}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Leaderboard
