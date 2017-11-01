import React, {Component} from 'react';
import Menu from 'material-ui/Menu';
import Invite from '../Bet/Invite'


// api call in componentdidmnt - sets state
// render function reads state

class InviteColumn extends Component {
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
        content = <h3 className="title" style={{paddingTop: '25px'}}><strong>No Invites</strong></h3>;
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
