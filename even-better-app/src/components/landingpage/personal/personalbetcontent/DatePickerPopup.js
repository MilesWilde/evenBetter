import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 * To display the year selection first, set the `openToYearSelection` property to `true`.
 */
class DatePickerPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      betDeadlineDateTime: this.props.dateProp.betDeadlineDateTime,
      decisionDeadlineDateTime: this.props.dateProp.decisionDeadlineDateTime
    }
  }



  _handleBetDeadlineDateTime = (betDeadlineDateTime) => {
    this.setState({betDeadlineDateTime: betDeadlineDateTime})
    {this.props._handleChangeBetDateTime(betDeadlineDateTime)}
  }

  _handleDecisionDeadlineDateTime = (decisionDeadlineDateTime) => {
    this.setState({decisionDeadlineDateTime: decisionDeadlineDateTime})
    {this.props._handleChangeDecisionDateTime(decisionDeadlineDateTime)}
  }

  // _nextWeekDate = () => {
  //   var now = new Date();
  //   var nextWeek = new Date(now);
  //   nextWeek.setDate(nextWeek.getDate() + 7);
  //   return nextWeek
  // }


  render () {
    return(
      <div>

        <DateTimePicker
                    DatePicker={DatePickerDialog}
                    TimePicker={TimePickerDialog}
                    hintText = "Bet Deadline Date"
                    autoOk = {true}
                    onChange = {this._handleBetDeadlineDateTime}
        />

        <DateTimePicker
                    DatePicker={DatePickerDialog}
                    TimePicker={TimePickerDialog}
                    hintText = "Decision Deadline Date"
                    autoOk = {true}
                    onChange = {this._handleDecisionDeadlineDateTime}
        />
      </div>
    );

  }
}


export default DatePickerPopup;
