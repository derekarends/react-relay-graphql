import path from 'path';
import express from 'express';
import graphqlHttp from 'express-graphql';
import { schema } from '../graphql/schema';
import { MongoClient } from 'mongodb';
import config from './config.js';

export default function() {
  const app = express();
  MongoClient.connect(config.database.url).then(function (db) {
    const graphqlHttpConfig = (schema) => ({
      schema: schema,
      pretty: config.graphql.pretty,
      graphiql: config.graphql.graphi,
      context: {
        mongodb: db,
      },
    });

    app.use('/graphql', graphqlHttp(graphqlHttpConfig(schema)));
    app.use('/libs', express.static(path.join(__dirname, '../../node_modules')));
    app.use(express.static(config.webServer.folder));

    app.listen(config.webServer.port, () =>
      console.log(`web server running on port ${config.webServer.port}`));
  })
  .catch(function (error) {
    console.log('There has been a problem connecting to database: ' + error.message);
    throw error;
  });
}
