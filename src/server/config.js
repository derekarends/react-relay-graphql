var config = {};
config.webServer = {};
config.database = {};
config.graphql = {};

config.environment = 'dev';
config.webServer.folder = 'dist/www';
config.webServer.port = process.env.WEB_PORT || 3000;

config.database.url = 'mongodb://kinnl_user:kinnl_user@ds145178.mlab.com:45178/kinnl';

config.graphql.graphi = true;
config.graphql.pretty = true;

module.exports = config;
