import React from 'react';
import TextField from 'material-ui/TextField';
import DatePickerPopup from './DatePickerPopup'
import UsersAutoComplete from './UsersAutoComplete'
import MediatorAutoComplete from './MediatorAutoComplete'

const NameDesc = () => (
    <div>
        <UsersAutoComplete />
        <MediatorAutoComplete />
    <br />
    <DatePickerPopup />
  </div>
);

export default NameDesc;