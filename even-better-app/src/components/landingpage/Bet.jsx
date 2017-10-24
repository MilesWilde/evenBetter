import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';


// This component needs to be passed fromUser and betTitle as props
class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: false
    }
  }

  onAccept = (e) => {
    this.setState({ accepted: true })
    // When accepted, this user should be added to Bet
    axios.post()
  }

  render() {
    return (
      <MenuItem
        primaryText={this.props.betTitle + " from " + this.props.fromUser}
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem primaryText="Accept" onClick={this.onAccept}/>,
          <MenuItem primaryText="Decline" />,
        ]}
        />

    )
  }
}

export default Invite