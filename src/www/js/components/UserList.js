import React from 'react';
import Relay from 'react-relay';

import User from './User';

class UserList extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    relay: React.PropTypes.object.isRequired,
  };

  renderUsers() {
    const { viewer } = this.props;

    return viewer.users.edges.map(({ node }) => (
      <User
        key={node.id}
        viewer={viewer}
        user={node}
      />
    ));
  }

  render() {
    return (
      <ul>
        {this.renderUsers()}
      </ul>
    );
  }
}

export default Relay.createContainer(UserList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        users(first: 2) {
          edges {
            node {
              id
              firstName
              lastName
            }
          }
        }
      }
      `,
  }
});
