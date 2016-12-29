import User from '../models/user';

export const getUsers = mongodb =>
  mongodb.collection('users').find({}).toArray();

export const getUser = id =>
  new Promise(resolve =>
    setImmediate(() =>
      resolve(new User(users.find(u => u.id === id)))));
