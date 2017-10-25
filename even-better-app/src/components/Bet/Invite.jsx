import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';

class Invite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      betID: this.props.betID,
      accepted: null
    }
  }

  onAccept = (e) => {
    // Update bet_user - has_accepted to true
    // Remove from
  }

  render() {
    return (
      <div>
      <br />
      <MenuItem
        primaryText={this.props.betTitle}
        rightIcon={<ArrowDropRight />}
        style={{whiteSpace: 'normal'}}
        desktop="true"
        menuItems={[
          <MenuItem primaryText="Accept" />,
          <MenuItem primaryText="Decline" />,
        ]}
      /> <br />
      <Divider/>
      </div>
    )
  }
}

export default Invite;