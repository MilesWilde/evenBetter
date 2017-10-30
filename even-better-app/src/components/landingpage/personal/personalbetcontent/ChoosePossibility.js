import React from 'react';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ChipInput from 'material-ui-chip-input'
import axios from 'axios';

const style = {'text-align': 'center'};
var config = {
    headers: {
      "Authorization": "Bearer " + window.localStorage.auth_token,
    }
}


class ChoosePossibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibilities: this.props.sendPossibility,
      chosen: {}
    };
  }

  makeAxiosPatch = () => {
    var data = {
        has_accepted: true,
        possibility_id: this.state.chosen.id,
        user_id: window.localStorage.user_id
    }

    axios.patch(`/api/v1/bets_users/${this.state.possibilities[0].bet_id}`, data, config)
    .then(response => {
      console.log("Responsefor patch is: ")
      console.log(response.data)
    })
    .catch(error => {
      console.log("Error: " + error)
    })
  }

  handleMoveNext = () => {
      console.log("state is: ", this.state)
    let error = ''

    if (error.length === 0) {

      //Making the axios call to persist to db
      this.makeAxiosPatch()
      this.props.handleNext()

      
    } else {
      this.setState({error: error})
    }
  }

    _handlePossibilityClick = (poss,event) => {
        
        event.target.style.backgroundColor = "#91a6c9";
        this.setState({
            chosen: poss
        })       
    }

  render () {
    return (
      <div>
        <List >
            {
            this.state.possibilities.map((poss) => {
            console.log("Each Poss is: ", poss)
            return <ListItem    
                        primaryText={poss.description}
                        onClick = {(event) => this._handlePossibilityClick(poss,event)}
                        style = {style}
                        
                    />
            })
            }
        </List>

        <FlatButton
          label="Back"
          disabled={this.props.stepIndex === 0}
          onClick={this.props.handlePrev}
          style={{marginRight: 12}}
        />
        <RaisedButton
          label={this.props.stepIndex === 3 ? 'Finish' : 'Next'}
          primary={true}
          onClick={this.handleMoveNext}
        />
      </div>
    );
  }
}


export default ChoosePossibility;
