import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * `SelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
export default class SportsDropdown extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Pick a Sport"
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth={true}
        >
          <MenuItem value={1} primaryText="NBA - Basketball" />
          <MenuItem value={2} primaryText="NFL - Football" />
          <MenuItem value={3} primaryText="MLB - Baseball" />
          <MenuItem value={4} primaryText="EPL - English Soccer" />
          <MenuItem value={5} primaryText="MLS - American Soccer" />
        </SelectField>
      </div>
    );
  }
}