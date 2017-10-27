import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import TabsForBets from './TabsForBets'
import './css/LandingPage.css';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class PopupBets extends React.Component {
  state = {
    open: false
  };

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
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Place Bet!"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <br/><RaisedButton   label="PLACE A BET"
                             fullWidth= {true}
                             onClick={this.handleOpen}
                             backgroundColor = "#ead3e7"  />
        <Dialog
          title="Pick a Tab and place your bet!"
          actions={actions}
          autoScrollBodyContent = {true}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TabsForBets />

        </Dialog>
      </div>
    );
  }
}