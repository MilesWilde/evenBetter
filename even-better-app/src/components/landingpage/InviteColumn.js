import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import Invite from '../Bet/Invite'

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
  backgroundColor: 'E0E0E0'
};

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}


// api call in componentdidmnt - sets state
// render function reads state

class InviteColumn extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadInvites()
  }

  renderInvites = () => {
      this.props.getMainState().invites.map((invite) => {
        console.log(invite)
      return (<Invite
      bet={invite}
      betTitle={invite.title}
      loadInvites={this.props.loadInvites}
      loadBets={this.props.loadBets}
      />)
    })
  }


  render () {
    let content = {};
      if (!this.props.getMainState().invites[0]) {
        content = <h3 className="title"><strong>You have no invites at the moment.</strong></h3>;
      } else {
        content =
        <div className = "invite-column">

          <Menu >
            <Menu desktop={true} width={320} maxHeight={250}>
              <h3 className="title"><strong>Invites</strong></h3>
              {this.props.getMainState().invites.map((invite) => {
                  console.log(invite)
                  return (<Invite
                  bet={invite}
                  betTitle={invite.title}
                  loadInvites={this.props.loadInvites}
                  loadBets={this.props.loadBets}
              />)})
              }
            </Menu>
          </Menu>
        </div>;
      }
    return content;
  }
}

export default InviteColumn;
