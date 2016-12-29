//@flow
import React from 'react';
import Relay from 'react-relay';

export default class Login extends React.Component {

  render() {
    const { auth } = this.props;

    return (
      <div>
        <h3>Login</h3>
        <input type='button' value='Login' onClick={auth.login.bind(this)}></input>
        <input type='button' value='Logout' onClick={auth.logout.bind(this)}></input>
      </div>
    );
  }
}
