import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Invite from './Invite'

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

function renderInvites(userid) {
  var invites = [];
  axios.get('/bets/:userid')
  .then(response => {
    response.forEach((bet) => {
      if (bet.status === nil) {
        invites.push(bet);
      }
    })
    return (
      invites.forEach((invite) => {
        <Bet/>
      })
    )

  }
  return invites
}

const InviteColumn = () => (
  <div class = "invite-column">
    <h3> Invite Column </h3>
    <Paper style={style}>
    // Retrieve entries from betusers
    // where userid is currentuser
    // and accepted is nill
      <Menu desktop={true} width={320} maxHeight={250}>

        {var invites = renderInvites(userid);}
        {}

        <MenuItem
          primaryText="Bet - EvenBetter wins best project"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="Accept" />,
            <MenuItem primaryText="Decline" />,
          ]}
        />
        <Divider />
        <MenuItem
        primaryText="Bet - John shows up late to class"
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem primaryText="Accept" />,
          <MenuItem primaryText="Decline" />,
        ]}
        />
        <MenuItem
          primaryText="Bet - John shows up late to class"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="Accept" />,
            <MenuItem primaryText="Decline" />,
          ]}
        />
        <MenuItem
          primaryText="Bet - John shows up late to class"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="Accept" />,
            <MenuItem primaryText="Decline" />,
          ]}
        />
                <MenuItem
          primaryText="Bet - John shows up late to class"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="Accept" />,
            <MenuItem primaryText="Decline" />,
          ]}
        />
                <MenuItem
          primaryText="Bet - John shows up late to class"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="Accept" />,
            <MenuItem primaryText="Decline" />,
          ]}
        />
                <MenuItem
          primaryText="Bet - John shows up late to class"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="Accept" />,
            <MenuItem primaryText="Decline" />,
          ]}
        />
      </Menu>
    </Paper>
  </div>
);

export default InviteColumn;