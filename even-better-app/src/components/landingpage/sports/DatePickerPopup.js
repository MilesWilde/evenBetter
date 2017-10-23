import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 * To display the year selection first, set the `openToYearSelection` property to `true`.
 */

//  Used to disallow users from picking games for which there is no data yet
function disableRandomDates() {
  return Math.random() > 0.7;
}

const DatePickerPopup = () => (
  <div>
    <DatePicker hintText="Date for game" mode="landscape" shouldDisableDate={disableRandomDates} />
    {/* <DatePicker hintText="Bet deadline" /> */}
  </div>
);

export default DatePickerPopup;