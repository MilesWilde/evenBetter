import React from 'react';
import TextField from 'material-ui/TextField';

const NameDesc = () => (
  <div>
    <TextField
        floatingLabelText="Name your bet"
    /><br />
    <TextField
        floatingLabelText="Describe your bet"
        multiLine={true}
        rows={2}
        rowsMax={4}
    /><br />
  </div>
);

export default NameDesc;