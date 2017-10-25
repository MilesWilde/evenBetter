import React from 'react';
import TextField from 'material-ui/TextField';
import UsersCompleteSports from './UsersCompleteSports'
import ResultPicker from './ResultPicker'


class BetPoolandOutcome extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            names: this.props.data.names,
            errors: []
        }
    }

    _handleUsersFieldChange = (names) => {
        console.log("PARTICIPANT VALUE IS", e)
        this.setState({
            names: names
        });
      }

    render() {
        return(
            <div>
                <UsersCompleteSports    _handleUsersFieldChange={this._handleUsersFieldChange} />
            <br />
            <h4> Define the possibilities </h4>
                <ResultPicker />
            </div>
        );
    }
}

export default BetPoolandOutcome;