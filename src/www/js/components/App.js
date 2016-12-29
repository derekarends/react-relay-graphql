// @flow
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

export default class App extends React.Component {

  render() {
    let { children } = this.props;
    if (children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
      });
    }

    const { auth } = this.props.route;

    return (
      <div>
        <section>
          <header>
            <h1>
              Kinnl App
            </h1>
          </header>

          <Link to='/login'>Login</Link>
          { auth.loggedIn() ? <Link to='/dashboard'>Dashboard</Link> : null }
          { auth.loggedIn() ? <Link to='/admin'>Admin</Link> : null }

          {children}

        </section>
      </div>
    );
  }
}
