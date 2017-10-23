import React from 'react';
import TextField from 'material-ui/TextField';
import DatePickerPopup from './DatePickerPopup'

const NameDesc = () => (
    <div>
    <TextField
        floatingLabelText="Choose users to join bet"
    /><br />
    <TextField
        floatingLabelText="Choose a mediator (Optional)"
    /><br />
    <DatePickerPopup />
  </div>
);

export default NameDesc;