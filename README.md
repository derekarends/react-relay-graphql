# Directions #

To use this application you will need to create a .env file that sits at the root of the directory with the following fields filled out for your environment needs

## .env file contents ##
<pre>
 AUTH0_CLIENT_ID=Auth0ClientId
 AUTH0_CLIENT_SECRET=Auth0ClientSecret
 AUTH0_DOMAIN=Auth0Domain
 DATABASE_URL=MongoConnectionString
 ENVIRONMENT_URL=http://localhost:3000
 GRAPHQL_ENDPOINT=/graphql
 GRAPHQL_GRAPHI=true
 GRAPHQL_PRETTY=true
 WEBSERVER_FOLDER=dist/www
 WEBSERVER_PORT=3000
</pre>

Once those field are populated you will want to run the following steps:
* gulp
* npm run update-schema 
* npm start
