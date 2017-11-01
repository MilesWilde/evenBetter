import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';

class InvitePossibility extends Component {

  handleSelect = (e, option) => {
    e.target.style.backgroundColor = "#91a6c9";
    this.props.action(option);
  }

  render () {
    // This changes parent state to reflect selected option
    return (
      <MenuItem onClick={(event) => {this.handleSelect(event, this.props.option)}} primaryText={this.props.option.description}/>
    )
  }
}

export default InvitePossibility
