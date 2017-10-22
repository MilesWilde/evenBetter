import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SportsBet from './sports/SportsBet'
import PersonalBet from './personal/PersonalBet'

// const styles = {
//   headline: {
//     fontSize: 24,
//     paddingTop: 16,
//     marginBottom: 12,
//     fontWeight: 400,
//   },
// };

export default class TabsForBets extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="SPORTS BET" value="a">
          <div>
            <p>
              <SportsBet />
            </p>
          </div>
        </Tab>
        <Tab label="PERSONAL BET" value="b">
        <div>
          <p>
            <PersonalBet />
          </p>
        </div>
      </Tab>
      </Tabs>
    );
  }
}