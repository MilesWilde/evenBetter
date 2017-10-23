import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


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
          <tr>
            <td>Default</td>
            <td>Defaultson</td>
            <td>def@somemail.com</td>
          </tr>      
          <tr class="success">
            <td>Success</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>
          <tr class="danger">
            <td>Danger</td>
            <td>Moe</td>
            <td>mary@example.com</td>
          </tr>
          <tr class="info">
            <td>Info</td>
            <td>Dooley</td>
            <td>july@example.com</td>
          </tr>
          <tr class="warning">
            <td>Warning</td>
            <td>Refs</td>
            <td>bo@example.com</td>
          </tr>
          <tr class="active">
            <td>Active</td>
            <td>Activeson</td>
            <td>act@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }
}