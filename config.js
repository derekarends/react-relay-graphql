var config = {};
config.webServer = {};

config.environment = 'dev';
config.webServer.folder = 'dist/www';
config.webServer.port = process.env.WEB_PORT || 3000;

module.exports = config;
