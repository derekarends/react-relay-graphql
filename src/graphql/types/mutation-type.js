//@flow
import { GraphQLObjectType } from 'graphql';
import { insertUserMutationType } from './user/insert-user-mutation';
// import { updateWidgetMutationType } from './update-widget-mutation-type';
// import { deleteWidgetMutationType } from './delete-widget-mutation-type';
//
export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    insertUser: insertUserMutationType,
    // updateWidget: updateWidgetMutationType,
    // deleteWidget: deleteWidgetMutationType,
  }),
});
