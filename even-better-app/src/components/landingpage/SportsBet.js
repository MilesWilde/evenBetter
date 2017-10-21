import React from 'react';
import TextField from 'material-ui/TextField';

const SportsBet = () => (
  <div>
    <TextField
        floatingLabelText="Name your bet"
    /><br />
    <TextField
      floatingLabelText="Pick a Sport"
    />
    <br />
    <TextField
        floatingLabelText="Pick a Date"
    /><br />
    <TextField
        floatingLabelText="Choose users to join bet"
    /><br />
    <TextField
        floatingLabelText="Choose a mediator (Optional)"
    /><br />
    <TextField
        floatingLabelText="Pick potential outcomes"
        multiLine={true}
        rows={2}
        rowsMax={4}
    /><br />
  </div>
);

export default SportsBet;