import React from 'react';
import {List, ListItem} from 'material-ui/List';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Resource from '../../../../models/resource'
const GameStore = Resource('games')

class GamesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homeTeam: 'Cavs',
            awayTeam: 'Warriors',
            fixture: ''

        }
    }

    componentWillMount() {
        console.log("this.props.data", this.props.data)
        GameStore.findAll({
            params: {
                sport: this.props.data.sport,
                gameDate: this.props.data.gameDate
            }
        })
        .then((result) => console.log("AXIOS CALL", result))
        .catch((errors) => console.log("AXIOS CALL", errors))

        this.setState({
            fixture: this.state.homeTeam + " @ " + this.state.awayTeam
        })
    }

    //'data' contains the Sport type and the Game date
    //'result contains the data from the MSNBC API
    // .then((result) => this.setState({clients: result.data}))
    // .catch((errors) => this.setState({errors: errors}))

    handleMoveNext = () => { 
        this.props.handleNext({
            homeTeam: this.state.homeTeam,
            awayTeam: this.state.awayTeam
        });
    }
    //Might need to use the dangerouslySetInnerHTML here to set the Team names and logos

    render() {
        return (
            <div>
                <List>
                <ListItem primaryText={this.state.fixture} />
                <ListItem primaryText="Raptors @ Spurs" />
                <ListItem primaryText="Astros @ Yankees" />
                <ListItem primaryText="Toronto FC @ Seattle Sounders" />
                <ListItem primaryText="Suns @ Lakers" />
                </List>

                <FlatButton
                    label="Back"
                    disabled={this.props.stepIndex === 0}
                    onClick={this.props.handlePrev}
                    style={{marginRight: 12}}
                />
                <RaisedButton
                    label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onClick={this.handleMoveNext}
                />
            </div>  
        );
    }
}


export default GamesList;