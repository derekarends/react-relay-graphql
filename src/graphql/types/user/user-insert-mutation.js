import { mutationWithClientMutationId, fromGlobalId, offsetToCursor } from 'graphql-relay';
import { insertUserInputType } from './user-input-type';
import { viewerType } from './viewer-type';
import { UserEdge } from '../connections/user-connection';
import { getViewer } from '../../repo/viewer';
import { getUsers, insertUser } from '../../repo/user';

export const insertWidgetMutationType = mutationWithClientMutationId({
  name: 'InsertWidget',
  inputFields: {
    widget: { type: insertWidgetInputType },
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => getViewer(1),
    },
    widgetEdge: {
      type: WidgetEdge,
      resolve: widget => {
        return getWidgets().then(widgets => {
          const offset = widgets.indexOf(widgets.find(w => w.id === widget.id));
          return {
            cursor: offsetToCursor(offset),
            node: widget,
          };
        });
      },
    },
  },
  mutateAndGetPayload: ({ widget }) => {
    widget.ownerId = parseInt(fromGlobalId(widget.ownerId).id, 10);
    return insertWidget(widget);
  },
});
