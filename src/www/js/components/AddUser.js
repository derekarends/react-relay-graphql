//@flow
import React from 'react';
import Relay from 'react-relay';

class AddUser extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div>
        <input type="text"></input>
        <input type="button" value="Submit"></input>
      </div>
    );
  }
}

export default Relay.createContainer(AddUser, {
  fragments: {

  },
});
