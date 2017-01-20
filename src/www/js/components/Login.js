//@flow
import React from 'react';

export default class Login extends React.Component {

  render() {
    const { auth } = this.props;

    return (
      <div>
        {
          !auth.loggedIn() ?
          <input type='button' value='Login' onClick={auth.login}></input>
          :
          <input type='button' value='Logout' onClick={auth.logout}></input>
        }
      </div>
    );
  }
}
