import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 * To display the year selection first, set the `openToYearSelection` property to `true`.
 */
const DatePickerPopup = () => (
  <div>
    <DatePicker hintText="Bet deadline date"
                autoOk = {true}
                //errorText = {this.props.error}
                />
    <TimePicker
                hintText="Bet deadline time"
                autoOk = {true} />
    <DatePicker hintText="Decison Deadline (Mediator)"
                autoOk = {true} />
    <TimePicker hintText="Decision deadline time"
                autoOk = {true} />
  </div>
);

export default DatePickerPopup;