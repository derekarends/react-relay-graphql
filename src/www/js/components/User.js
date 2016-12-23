import React from 'react';
import Relay from 'react-relay';

class User extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditing: false,
    };
  }

  render() {
    const { user } = this.props;
    const { isEditing } = this.state;

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
