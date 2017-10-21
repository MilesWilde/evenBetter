import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const Buttons = () => (
  <div>
    <RaisedButton label="Create Personal Bet" primary={true} style={style} />
    <RaisedButton label="Create Sports Bet" secondary={true} style={style} />
  </div>
);

export default Buttons;