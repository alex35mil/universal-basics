/* eslint no-process-env: 0 */

let config = {};

config.env     = process.env.NODE_ENV  || 'development';
config.devPort = 3001;

export default config;
