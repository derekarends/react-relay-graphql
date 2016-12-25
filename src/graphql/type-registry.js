//@flow
import { fromGlobalId } from 'graphql-relay';

const types = {};

export const registerType = (model: any, type: any, lookupFn: any) => {
  types[type.name] = { model, type, lookupFn };
};

export const getNode = (globalId: any) => {
  const { type : typeName, id: id, } = fromGlobalId(globalId);

  if (types[typeName]) {
    return types[typeName].lookupFn(id);
  } else {
    return null;
  }
};

export const getNodeType = (obj: any) => {
  for (let typeName of Object.keys(types)) {
    if (obj instanceof types[typeName].model) {
      return types[typeName].type;
    }
  }

  return null;
};
