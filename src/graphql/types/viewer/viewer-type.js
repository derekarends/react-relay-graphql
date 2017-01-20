//@flow
import { GraphQLObjectType } from 'graphql';
import { globalIdField, connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import { nodeInterface } from '../../node-definitions';
import { getViewer } from '../../../repo/viewer';
import UserRepo from '../../../repo/user';
import Viewer from '../../../models/viewer';
import { registerType } from '../../type-registry';
import { userConnection } from '../../connections/user-connection';

export const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Logged In User',
  fields: () => ({
    id: globalIdField('Viewer'),
    users: {
      type: userConnection,
      description: 'A list of users',
      args: connectionArgs,
      resolve: (parent, args, { mongodb }) => connectionFromPromisedArray(UserRepo.getUsers(), args),
    },
  }),
  interfaces: () => [nodeInterface],
});

registerType(Viewer, viewerType, getViewer);
