import Relay from 'react-relay';

export default class extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer { id }`,
  }

  getMutation() {
    return Relay.QL`mutation { updateWidget }`;
  }

  getVariables() {
    return {
      widget: {
        id: this.props.id,
        name: this.props.name,
        description: this.props.description,
        color: this.props.color,
        size: this.props.size,
        quantity: this.props.quantity,
        ownerId: this.props.ownerId,
      }
    };
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        // id of the top level fragment
        // id of the viewer updated
        viewer: this.props.viewer.id,
      },
    }];
  }

  getFatQuery() {
    return Relay.QL`
			fragment on UpdateWidgetPayload @relay(pattern: true) {
				viewer {
					widgets {
						edges {
							node {
								id
								name
								description
								color
								size
								quantity
								owner {
									id
									firstName
									lastName
								}
							}
						}
					}
				}
				widgetEdge
			}
		`;
  }
}
