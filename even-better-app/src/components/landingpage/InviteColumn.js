import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

const InviteColumn = () => (
  <div className="invite-column">
    <h3 className="text-center"> List of Invites </h3>
    <Paper style={style}>
      <Menu desktop={true} width={320}>
        <MenuItem
          primaryText={`Your points: ${window.localStorage.user_points}`}
        />
        <Divider />
        <MenuItem
        primaryText={window.localStorage.user_points}
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