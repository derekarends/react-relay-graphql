//@flow
import React from 'react';
import Relay from 'react-relay';

export default class AddUser extends React.Component {
  state = {
    firstName: String,
    lastName: String
  };

  static defaultState = {
    firstName: '',
    lastName: '',
  };

  constructor(props : any) {
		super(props);

    this.state = AddUser.defaultState;

    (this:any)._onSave = this._onSave.bind(this);
  }

  _onSave() {
		this.props.onSave(Object.assign({}, this.state));
		this.setState(AddUser.defaultState);
	}

  render() {
    return (
      <div>
        <input name="firstName" type="text" value={this.state.firstName}></input>
        <input name="lastName" type="text" value={this.state.lastName}></input>
        <input name="save" type="button" value="Submit" onSave={this._onSave}></input>
      </div>
    );
  }
}
