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

    _handleUsersFieldChange = (e) => {
        console.log("NAME VALUE IS", e)
        this.setState({
            names: e
        });
      }

    render() {
        return(
            <div>
                <UsersCompleteSports />
            <br />
            <h4> Define the possibilities </h4>
                <ResultPicker />
            </div>
        );
    }
}

export default BetPoolandOutcome;