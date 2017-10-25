import React from 'react';
import {List, ListItem} from 'material-ui/List';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class GamesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homeTeam: '',
            awayTeam: ''
        }
    }

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
                <ListItem primaryText="Cavs @ Warriors" />
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