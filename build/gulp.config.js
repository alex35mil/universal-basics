import webpackDevConfig   from './webpack.config.dev';
import webpackProdConfig  from './webpack.config.prod';


const _app    = './app';
const _public = './public';
const _assets = `${_app}/assets`;


export default (isDevBuild) => {

  return {

    webpack: isDevBuild ? webpackDevConfig : webpackProdConfig,

    server: {
      paths: ['./server.app.js']
    },

    copy: {
      from : _assets,
      files: [
        [ '/tinies/favicon.ico', '/' ],
        [ '/tinies/robots.txt',  '/' ]
      ],
      to: _public
    }

  };

}
