import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

class Invite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      betID: this.props.betID,
      accepted: null
    }
  }

  render() {
    return (
      <MenuItem
        primaryText={this.props.betTitle + " - from " + this.props.fromUser}
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem primaryText="Accept" />,
          <MenuItem primaryText="Decline" />,
        ]}
      />
    )
  }
}

export default Invite;