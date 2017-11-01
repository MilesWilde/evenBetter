import React from 'react';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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
    let error = ''
    if (error.length === 0) {

      //Making the axios call to persist to db
      this.makeAxiosPatch()
      this.props.handleNext()

      this.props.redirectToBet(this.state.chosen)

    } else {
      this.setState({error: error})
    }
  }

    _handlePossibilityClick = (poss,event) => {

        event.target.style.backgroundColor = "#91a6c9";
        console.log("Chosen possibility is: ", poss)
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
                        onClick = {(event) => this._handlePossibilityClick(poss,event)}
                        style = {style}

                    >{poss.description}</ListItem>
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
