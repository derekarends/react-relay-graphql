# Directions #

To use this application you will need to create a .env file that sits at the root of the directory with the following fields filled out for your environment needs

## .env file contents ##
<pre>
 AUTH0_CLIENT_ID=
 AUTH0_CLIENT_SECRET=
 AUTH0_DOMAIN=
 DATABASE_URL=
 ENVIRONMENT_URL=
 GRAPHQL_ENDPOINT=
 GRAPHQL_GRAPHI=
 GRAPHQL_PRETTY=
 WEBSERVER_FOLDER=
 WEBSERVER_PORT=
</pre>

Once those field are populated you will want to run the following steps:
* gulp
* npm run update-schema 
* npm start
