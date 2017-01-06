//@flow
import React from 'react';
import Relay from 'react-relay';

import AddUser from './AddUser';
import UserList from './UserList';

class Admin extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    const { viewer } = this.props;

    return (
      <div>
          Welcome to the admin view {viewer.id}
          <AddUser />
          <UserList viewer={viewer} />
      </div>
    );
  }
}

export default Relay.createContainer(Admin, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        ${UserList.getFragment('viewer')}
      }
    `,
  },
});
