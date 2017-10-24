import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 * To display the year selection first, set the `openToYearSelection` property to `true`.
 */
class DatePickerPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      betDeadlineDate: this.props.dateProp.betDeadlineDate,
      betDeadlineTime: this.props.dateProp.betDeadlineTime,
      decisionDeadlineDate: this.props.dateProp.decisionDeadlineDate,
      decisionDeadlineTime: this.props.dateProp.decisionDeadlineTime
    }
  }

  _handleBetDeadlineDate = (e, betDeadlineDate) => {
    this.setState({betDeadlineDate: betDeadlineDate})
    {this.props._handleChangeBetDeadline(betDeadlineDate)}

  }

  _handleBetDeadlineTime = (e, betDeadlineTime) => {
    this.setState({betDeadlineTime: betDeadlineTime})
    {this.props._handleChangeBetTime(betDeadlineTime)}
  }

  _handleDecisionDeadlineDate = (e, decisionDeadlineDate) => {
    this.setState({decisionDeadlineDate: decisionDeadlineDate})
    {this.props._handleChangeDecisionDeadline(decisionDeadlineDate)}
  }

  _handleDecisionDeadlineTime = (e, decisionDeadlineTime) => {
    this.setState({decisionDeadlineTime: decisionDeadlineTime})
    {this.props._handleChangeDecisionTime(decisionDeadlineTime)}
  }

  
  render () {
    return(
      <div>
        <DatePicker hintText="Bet deadline date"
                    autoOk = {true}
                    onChange = {this._handleBetDeadlineDate}
                    />
        <TimePicker
                    hintText="Bet deadline time"
                    autoOk = {true}
                    onChange = {this._handleBetDeadlineTime}
 />
        <DatePicker hintText="Decison Deadline (Mediator)"
                    autoOk = {true}
                    onChange = {this._handleDecisionDeadlineDate}
 />
        <TimePicker hintText="Decision deadline time"
                    autoOk = {true}
                    onChange = {this._handleDecisionDeadlineTime}
 />
      </div>
    );

  }
}


export default DatePickerPopup;