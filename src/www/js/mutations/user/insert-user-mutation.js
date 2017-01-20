//@flow
import Relay from 'react-relay';

export default class extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer { id }`,
  }

  getMutation() {
    return Relay.QL`mutation { insertUser }`;
  }

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
