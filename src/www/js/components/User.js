//@flow
import React from 'react';
import Relay from 'react-relay';

export class User extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props;

    return (
      <li>
        {user.firstName} {user.lastName}
      </li>
    );
  }
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        firstName
        lastName
      }
    `,
  },
});
