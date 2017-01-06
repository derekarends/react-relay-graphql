import { GraphQLInputObjectType, GraphQLString, GraphQLID } from 'graphql';

const fields = {
  name: {
    type: GraphQLString,
    description: 'The user name',
  },
  description: {
    type: GraphQLString,
    description: 'The user description',
  },
  ownerId: {
    type: GraphQLID,
    description: 'The admins\'s user',
  },
};

export const insertUserInputType = new GraphQLInputObjectType({
	name: 'InputInsertUser',
	description: 'A user',
	fields: () => fields
});

export const updateUserInputType = new GraphQLInputObjectType({
	name: 'InputUpdateUser',
	description: 'A user',
	fields: () => Object.assign({}, fields, { id: { type: GraphQLID, description: 'User id to update' } })
});
