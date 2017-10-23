import React from 'react';
import TextField from 'material-ui/TextField';
import UsersAutoComplete from '../../personal/personalbetcontent/UsersAutoComplete'
import ResultPicker from './ResultPicker'

const BetPoolandOutcome = () => (
    <div>
        <UsersAutoComplete />
    <br />
    <h4> Define the possibilities </h4>
    <ResultPicker />
  </div>
);

export default BetPoolandOutcome;