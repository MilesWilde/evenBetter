import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: null
    }
  }

  render() {
    return (
      <MenuItem
        primaryText="Test Invite"
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem primaryText="Accept" />,
          <MenuItem primaryText="Decline" />,
        ]}
      />
    )
  }
}