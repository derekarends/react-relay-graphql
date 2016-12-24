//@flow
import React from 'react';
import Relay from 'react-relay';

class Dashboard extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    relay: React.PropTypes.object.isRequired,
  };

  render() {
    const { viewer } = this.props;

    return (
      <div>
          Welcome to the dashboard view {viewer.id}
      </div>
    );
  }
}

export default Relay.createContainer(Dashboard, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  },
});
