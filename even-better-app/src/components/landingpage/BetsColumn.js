import React, {Component} from 'react';

import Resource from '../../models/resource'
import axios from 'axios'
import './css/BetsColumn.css';

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

export default class BetsColumn extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadBets();
  }

  render() {
    console.log('rendered');
    return (
      <div>
      <h3 className="text-center title"><strong>Active Bets</strong></h3>
      <table class="table">
        <thead>
          {
            <tr>
              <th>Type</th>
              <th>Bet Name</th>
              <th>Result</th>
              <th>Deadline</th>
            </tr>
          }
        </thead>
        <tbody class="table-body">

          {
            this.props.getMainState().bets.map((bet) => {
              return (
                  <tr class="table-body">
                    <td><a href= {`/bets/${bet.id}`}>Sport Bet</a></td>
                    <td><a href= {`/bets/${bet.id}`}>{bet.title}</a></td>
                    <td><a href= {`/bets/${bet.id}`}>WIN</a></td>
                    <td><a href= {`/bets/${bet.id}`}>{ bet["betting_deadline"] ? bet["betting_deadline"].substring(0,9) : ""}</a></td>
                  </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
    );
  }
}