//@flow
import React from 'react';
import Relay from 'react-relay';

import AddUser from './AddUser';
import UserList from './UserList';

import InsertUserMutation from '../mutations/user/insert-user-mutation';

class Admin extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  _onSave(user) {
    // Relay.Store.commitUpdate(new InsertUserMutation(
    //   Object.assign({ viewer: this.props.viewer, user: null }, user)));
  }

  render() {
    const { viewer } = this.props;

    return (
      <div>
          Welcome to the admin view {viewer.id}
          <AddUser onSave={this._onSave()}/>
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
