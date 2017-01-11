//@flow
import Relay from 'react-relay';

export default class extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer { id }`,
  }

  getMutation() {
    return Relay.QL`mutation { insertUser }`;
  }

  // receives the parameters from the constructor, builds
  // the variables to send the GraphQL server
  getVariables() {
    return {
      user: {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
      },
    };
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'Users',
      edgeName: 'userEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }

  getFatQuery() {
    return Relay.QL`
			fragment on InsertUserPayload @relay(pattern: true) {
				viewer {
					users {
						edges {
							node {
								id
								firstName
                lastName
							}
						}
					}
				}
				userEdge
			}
		`;
  }
}
