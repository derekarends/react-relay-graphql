//@flow
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../../node-definitions';
import { getUser } from '../../../repo/user';
import User from '../../../models/user';
import { registerType } from '../../type-registry';

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: globalIdField('User', (obj, context, info) => obj._id),
    firstName: {
      type: GraphQLString,
      description: 'A user first name',
    },
    lastName: {
      type: GraphQLString,
      description: 'A user last name',
    },
  }),
  interfaces: () => [nodeInterface],
});

registerType(User, userType, getUser);
