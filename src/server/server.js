import path from 'path';
import express from 'express';
import graphqlHttp from 'express-graphql';
import { schema } from '../graphql/schema';
import { MongoClient } from 'mongodb';
import jwt from 'express-jwt';
import dotenv from 'dotenv';

export default function() {
  const app = express();

  dotenv.load();

  MongoClient.connect(process.env.DATABASE_URL).then(function (db) {

    const authenticate = jwt({
      secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_CLIENT_ID,
    });

    const graphqlHttpConfig = (schema) => ({
      schema: schema,
      pretty: process.env.GRAPHQL_PRETTY,
      graphiql: process.env.GRAPHQL_GRAPHI,
      context: {
        mongodb: db,
      },
    });

    app.use('/graphql', authenticate, graphqlHttp(graphqlHttpConfig(schema)));
    app.use('/libs', express.static(path.join(__dirname, '../../node_modules')));
    app.use(express.static(process.env.WEBSERVER_FOLDER));

    let port = process.env.WEBSERVER_PORT;

    app.listen(port, () =>
      console.log(`web server running on port ${port}`));
  })
  .catch(function (error) {
    console.log('There has been a problem connecting to database: ' + error.message);
    throw error;
  });
}
