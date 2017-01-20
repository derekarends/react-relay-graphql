//@flow
import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

const fields = {
  firstName: {
    type: GraphQLString,
    description: 'A user first name',
  },
  lastName: {
    type: GraphQLString,
    description: 'A user last name',
  },
};

export const insertUserInputType = new GraphQLInputObjectType({
    name: 'InputInsertUser',
    description: 'A user',
    fields: () => fields,
  });

export const updateUserInputType = new GraphQLInputObjectType({
    name: 'InputUpdateUser',
    description: 'A user',
    fields: () => Object.assign({}, fields, {
      id: globalIdField('User', (obj, context, info) => obj._id),
    }),
  });
