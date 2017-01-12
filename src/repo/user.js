import User from '../models/user';

export const getUsers = mongodb =>
  mongodb.collection('users').find({}).toArray();

export const getUser = (mongodb, id) =>
  new Promise(resolve =>
    resolve(new User(mongodb.collection('users').find({ _id: id }))));

export const insertUser = (mongodb, user) =>
  new Promise(resolve => {
    mongodb.collection('users').insert(user, function (error, doc) {
      if (error) {
        throw error;
      }

      resolve(new User(doc));
    });
  });
