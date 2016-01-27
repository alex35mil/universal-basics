/* eslint no-process-env: 0 */

const config = {};

config.env     = process.env.NODE_ENV  || 'development';
config.devPort = 3501;

export default config;
