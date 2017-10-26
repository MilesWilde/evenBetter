import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import ChipInput from 'material-ui-chip-input'

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
const colors = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
];

export default class UsersCompleteSports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      usersList: this.props.usersList,
      chipValue: []
    };
  
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    };
  }

  handleChange(newData) {
    this.setState({chipValue: newData})
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
    this.props._handleUsersFieldChange(searchText)
  };

  handleNewRequest = (searchText) => {
    console.log("Name in usercompletesports:", searchText)
    this.setState({
      searchText: searchText,
    });
  };


  render() {
    return (
      <div>
        <ChipInput
          floatingLabelText={"Select users here!"}
          onChange={(chips) => this.handleChange(chips)}
          errorText = {this.state.error}
        /> <br /><br />

        <AutoComplete
          hintText="Pick users to bet"
          listStyle={{ maxHeight: 200, overflow: 'auto' }}
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={this.props.usersList}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
          errorText = {this.props.error} 
        />
      </div>
    );
  }
}

// onUpdateInput={this.props._handleUsersFieldChange}
