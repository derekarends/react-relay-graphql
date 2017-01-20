import User from '../models/user';

export default class UserRepo{
  constructor() {
    MongoClient.connect(process.env.DATABASE_URL).then(function (db) {
      this.repo = db;
    });
  }

  getUsers() {
    this.repo.collection('users').find({}).toArray();
  }

  getUser(id) {
    new Promise(resolve =>
      resolve(new User(this.repo.collection('users').find({ _id: id }))));
  }

  insertUser(user) {
    new Promise(resolve => {
      this.repo.collection('users').insert(user, function (error, doc) {
        if (error) {
          throw error;
        }

        resolve(new User(doc));
      });
    });
  }
}
