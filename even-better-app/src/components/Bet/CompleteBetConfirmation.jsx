import React, { Component } from 'react'
import { Dialog, FlatButton, RaisedButton } from 'material-ui'

class CompleteBetConfirmation extends Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <Dialog
        title="Are you sure?"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        Selecting a possibility will set the winning outcome and complete the bet.
      </Dialog>
    )
  }

}

export default CompleteBetConfirmation
