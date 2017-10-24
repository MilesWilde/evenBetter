import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
export default class MediatorAutoComplete extends Component {
  state = {
    dataSource: [],
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        "Rahul",
        "Rahul Ramesh",
        "Rahul Ramesh Something",
      ],
    });
  };

  render() {
    return (
      <div>
        <AutoComplete
            hintText="Pick a mediator"
            value={this.props.mediator} 
            onChange={this.props._handleUsersFieldChange}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            errorText = {this.props.error} 
        />
      </div>
    );
  }
}