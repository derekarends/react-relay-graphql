//@flow
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay';
import { insertUserInputType } from './user-input-type';
import { viewerType } from '../viewer/viewer-type';
import { UserEdge } from '../../connections/user-connection';
import { getViewer } from '../../../repo/viewer';
import UserRepo from '../../../repo/user';

export const insertUserMutationType = mutationWithClientMutationId({
  name: 'InsertUser',
  inputFields: {
    user: { type: insertUserInputType },
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => getViewer(1),
    },
    userEdge: {
      type: UserEdge,
      resolve: (user, args, { mongodb }) =>
        UserRepo.getUsers(mongodb).then(users => {
          const offset = users.indexOf(users.find(f => f._id === user._id));
          return {
            cursor: offsetToCursor(offset),
            node: user,
          };
        })
    },
  },
  mutateAndGetPayload: ({ user }) => {
    return UserRepo.insertUser(user);
  },
});
