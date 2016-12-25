//@flow
import Viewer from '../models/viewer';
import User from '../models/user';

const users = [
  {
    id: 1,
    firstName: 'Cat',
    lastName: 'O\'Hairball',
  },
  {
    id: 2,
    firstName: 'Turtle',
    lastName: 'Mc Murtle',
  },
  {
    id: 3,
    firstName: 'Tiger',
    lastName: 'Van Tigerson',
  },
];

export const getViewer = (id: any) => {
  new Promise(resolve =>
    resolve(new Viewer(id)));
}

export const getUsers = () => {
  new Promise(resolve =>
    setImmediate(() =>
      resolve(users.map(u => new User(u)))));
}

export const getUser = (id: any) => {
  new Promise(resolve =>
    setImmediate(() =>
      resolve(new User(users.find(u => u.id === id)))));
}
