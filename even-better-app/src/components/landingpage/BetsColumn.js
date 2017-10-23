import React, {Component} from 'react';

export default class BetsColumn extends Component {
  state = {

  };

  render() {
    return (
      <div>
      <h3 className="text-center"> List of Bets </h3>
      <table class="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Bet Name</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>     
          <tr class="success">
            <td>SportBet</td>
            <td>Cavs beat the warriors</td>
            <td>WIN</td>
          </tr>
          <tr class="danger">
            <td>Personal Bet</td>
            <td>Jack shows up late to class</td>
            <td>LOSE</td>
          </tr>
          <tr class="success">
          <td>SportBet</td>
          <td>Cavs beat the warriors</td>
          <td>WIN</td>
        </tr>
        <tr class="danger">
          <td>Personal Bet</td>
          <td>Jack shows up late to class</td>
          <td>LOSE</td>
        </tr>
        <tr class="success">
            <td>SportBet</td>
            <td>Cavs beat the warriors</td>
            <td>WIN</td>
          </tr>
          <tr class="danger">
            <td>Personal Bet</td>
            <td>Jack shows up late to class</td>
            <td>LOSE</td>
          </tr>
          <tr class="success">
            <td>SportBet</td>
            <td>Cavs beat the warriors</td>
            <td>WIN</td>
          </tr>
          <tr class="danger">
            <td>Personal Bet</td>
            <td>Jack shows up late to class</td>
            <td>LOSE</td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }
}