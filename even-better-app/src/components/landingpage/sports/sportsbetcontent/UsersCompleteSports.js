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

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
    this.props._handleUsersFieldChange(searchText)
  };

  handleNewRequest = (searchText) => {
    console.log("Name in usercompletesports:", searchText)
    const holder = this.state.chipValue
    holder.push(searchText)
    this.setState({
      searchText: searchText,
      chipValue: holder
    });

    console.log("chipValue: ", this.state.chipValue)
  };

  handleRequestDelete = (data) => {
    let chipData = this.state.chipValue;
    
    var index = chipData.indexOf(data)
    chipData.splice(index,1)

    this.setState({chipValue: chipData});
    console.log("ChipData: ", chipData)
  };


  render() {
    return (
      <div>
        {
          this.state.chipValue.map((chip) => {
          return <Chip  style={this.styles.chip}
                        onRequestDelete={() => this.handleRequestDelete(chip)}>
            {chip}
          </Chip>
          })
        }
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
