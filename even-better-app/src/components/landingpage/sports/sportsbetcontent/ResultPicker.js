import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class ResultPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Team A beats Team B" />
          <MenuItem value={2} primaryText="Tie Game" />
          <MenuItem value={3} primaryText="Team B beats Team A" />
        </DropDownMenu>
        <br />
        
      </div>
    );
  }
}