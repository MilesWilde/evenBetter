import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

export default class UsersAutoComplete extends Component {
  state = {
    searchText: '',
  };

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
    this.props._handleUsersFieldChange(searchText)
  };

  handleNewRequest = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };


  render() {
    return (
      <div>
        <AutoComplete
          hintText="Pick users to bet"
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={colors}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
          errorText = {this.props.error} 
        />
      </div>
    );
  }
}

// onUpdateInput={this.props._handleUsersFieldChange}
