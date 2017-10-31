import React, {Component} from 'react';

import Resource from '../../models/resource'
import axios from 'axios'
import './css/BetsColumn.css';

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

// This receives getMainState() as prop
export default class BetsColumn extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadBets();
  }


  // Helper function to convert deadline string to timestamp
  betTimestamp(dateAndTime) {
    // Split timestamp into [ Y, M, D, h, m, s ]
    var dat = dateAndTime.replace('T',' ').replace('Z','')
    var t = dat.split(/[- :]/);

    //Apply each element to the Date function
    var date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

    return date.getTime()
  }

  // Checks if outcome exists, and if user picked the winning outcome

  betStatus(bet) {
    if (Date.now() < this.betTimestamp(bet.outcome_deadline) && !bet.outcome_id) {
      if (bet.mediator_id === this.props.user.id) {
        return "REF"
      } else {
        return "PENDING"
      }
    } else if (bet.outcome_id) {
      var user_picked = 0;
      for (var betUser of this.props.getMainState().betsUsers) {
        if (betUser.bet_id === bet.id) {
          user_picked = betUser.possibility_id
        }
      }
      if (bet.outcome_id === user_picked) {
        return "WON"
      } else if (bet.mediator_id === this.props.user.id) {
        return "REF'D"
      } else {
        return "LOST"
      }
    } else {
      return "NO CONTEST"
    }
  }


  render() {
    console.log('rendered');
    return (
      <div>
      <h3 className="text-center bets-title title"><strong>Active Bets</strong></h3>
      <table class="table">
        <thead>
          {
            <tr>
              <th>Type</th>
              <th>Bet Name</th>
              <th>Result</th>
              {/* <th>Deadline</th> */}
            </tr>
          }
        </thead>
        <tbody class="table-body">

          {
            this.props.getMainState().bets.map((bet) => {
              return (
                  <tr class="table-body">
                    <td className="text-center"><a href= {`/bets/${bet.id}`}>
                      {bet.mediator_id ? "Personal" : "Sport"}
                    </a></td>
                    <td className="text-center"><a href= {`/bets/${bet.id}`}>{bet.title}</a></td>
                    <td className="text-center"><a href= {`/bets/${bet.id}`}>
                      { this.betStatus(bet) }
                    </a></td>
                    {/* <td><a href= {`/bets/${bet.id}`}>{ bet["betting_deadline"] ? bet["betting_deadline"].substring(0,9) : ""}</a></td> */}
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
