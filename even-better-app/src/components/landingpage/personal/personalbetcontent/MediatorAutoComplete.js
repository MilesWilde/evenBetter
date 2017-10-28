import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Resource from '../../../../models/resource'
const UserCompleteStore = Resource('users')


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

export default class MediatorAutoComplete extends Component {
  state = {
    searchText: '',
    mediator: {}
  };

  mediatorCallback = (searchText) => {
    let temp = {}
    UserCompleteStore.findAll()
      .then(response => {
        response.forEach((user)=> {

          if(user.username == searchText) {
            temp = {
              userId: user.id,
              username: user.username
            }
            this.setState({mediator: temp})
          }
          this.props._handleMediatorFieldChange(temp)
        })
    })
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
    
  };

  handleNewRequest = (searchText) => {
    
    this.mediatorCallback(searchText)
    
    // this.setState({
    //   searchText: searchText,
    // });
  };

  render() {
    return (
      <div>
        <AutoComplete
          hintText="Pick a mediator"
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