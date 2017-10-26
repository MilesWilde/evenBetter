import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

import Resource from '../../../../models/resource'
const UserStore = Resource('users')

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
  state = {
    searchText: '',
    usersList: ''
  };

  componentWillMount() {
    var listofUsers = []
    UserStore.findAll()
    .then((result) => {
        result.games.map((user) => {    
            listofUsers.push(user.username)
            console.log(user.username)
        })
        this.setState({
            usersList: listofUsers
        })
    })
    .catch((errors) => console.log("AXIOS CALL", errors))
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
        <AutoComplete
          hintText="Pick users to bet"
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={this.state.usersList}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
          errorText = {this.props.error} 
        />
      </div>
    );
  }
}

// onUpdateInput={this.props._handleUsersFieldChange}
