import React from 'react';
import TextField from 'material-ui/TextField';
import DatePickerPopup from '../DatePickerPopup'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SportsDropdown from './SportsDropdown';

const DateandSport = () => (
    <div>
      <SportsDropdown />
      <br />
      <DatePickerPopup />
    </div>
  );
  
  export default DateandSport;
  