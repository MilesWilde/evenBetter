import React, {Component} from 'react';

import Resource from '../../models/resource'
import axios from 'axios'

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
      <h3 className="text-center"> List of Bets </h3>
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

        <tbody>
          {
            this.props.getMainState().bets.map((bet) => {
              return (<tr class="success">
                <td>Sport Bet</td>
                <td>{bet.title}</td>
                <td>WIN</td>
                <td>{bet["betting_deadline"]}</td>
              </tr>);
            })
          }
        </tbody>
      </table>
    </div>
    );
  }
}
