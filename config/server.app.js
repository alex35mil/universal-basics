/* eslint no-process-env: 0 */

import config   from './server';

config.bundle  = 'app';
config.appPort = process.env.APP_PORT || 3500;

export default config;
