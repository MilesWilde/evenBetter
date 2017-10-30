import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import MediationRequest from './MediationRequest'
import axios from 'axios'

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}


// api call in componentdidmnt - sets state
// render function reads state

class MediationRequestColumn extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadMediationRequests()
  }

  renderMediationRequests = () => {
      this.props.getMainState().mediationRequests.map((mediationRequest) => {
        console.log(mediationRequest)
      return (<MediationRequest
      bet={mediationRequest}
      betTitle={mediationRequest.title}
      loadMediationRequests={this.props.loadMediationRequests}
      loadBets={this.props.loadBets}
      />)
    })
  }


  render () {
    let content = {};
      if (!this.props.getMainState().mediationRequests[0]) {
        content = <h3 className="title"><strong>You have no Mediation Requests at the moment.</strong></h3>;
      } else {
        content =
        <div className = "mediationRequest-column">
          <h3 className="title"><strong>Mediation Requests</strong></h3>
          <Paper style={style}>
            <Menu desktop={true} width={320} maxHeight={250}>
              {this.props.getMainState().mediationRequests.map((mediationRequest) => {
                  console.log(mediationRequest)
                  return (<MediationRequest
                  bet={mediationRequest}
                  betTitle={mediationRequest.title}
                  loadMediationRequests={this.props.loadMediationRequests}
                  loadBets={this.props.loadBets}
              />)})
              }
            </Menu>
          </Paper>
        </div>;
      }
    return content;
  }
}

export default MediationRequestColumn;