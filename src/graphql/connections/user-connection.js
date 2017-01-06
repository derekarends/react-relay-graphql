//@flow
import { userType } from '../types/user/user-type';
import { connectionDefinitions } from 'graphql-relay';

export const {
  connectionType: userConnection,
  edgeType: UserEdge,
} = connectionDefinitions({ name: 'User', nodeType: userType });
