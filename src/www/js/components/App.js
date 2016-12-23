// @flow
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class App extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <div>
        <section>
          <header>
            <h1>
              Kinnl App
            </h1>
          </header>

          <Link to='/'>Dashboard</Link>
          <Link to='/admin'>Admin</Link>

          {children}

        </section>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  },
});
