import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Resource from '../../../../models/resource'
const GameStore = Resource('games')

const style = {'text-align': 'center'};
class GamesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homeTeam: '',
            awayTeam: '',
            fixtures: []

        }
    }

    componentWillMount() {
        var listOfFixtures = []
        console.log("this.props.data", this.props.data)
        GameStore.findAll({
            params: {
                sport: this.props.data.sport,
                gameDate: this.props.data.gameDate
            }
        })
        .then((result) => {
            result.games.map((game) => {    
                listOfFixtures.push(game.homeTeamName + " @ " + game.awayTeamName)
            })
            this.setState({
                fixtures: listOfFixtures
            })
        })
        .catch((errors) => console.log("AXIOS CALL", errors))
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

    _handleGameClick = (fixture,event) => {

        event.target.style.backgroundColor = "#91a6c9";
        console.log("Handle Click Fixture: ", fixture)
        let words = fixture.split("@ ")

        this.setState({
            homeTeam: words[1],
            awayTeam: words[0]
        })       
    }

    render() {
        return (
            <div>
                <List >
                    {
                    this.state.fixtures.map((fixture) => {
                    return <ListItem    
                                primaryText={fixture}
                                onClick = {(event) => this._handleGameClick(fixture,event)}
                                style = {style}
                                leftAvatar = {
                                    <Avatar src= "https://static-hosted.stats.com/nba/logos/nba_50x33/Minnesota_Timberwolves.png"
                                    size={50}
                                    />
                                }
                                rightAvatar = {
                                    <Avatar src= "https://static-hosted.stats.com/nba/logos/nba_50x33/Minnesota_Timberwolves.png"
                                    size={50}
                                />
                                }
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
                    label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onClick={this.handleMoveNext}
                />
            </div>  
        );
    }
}


export default GamesList;