import express  from 'express';
import parser   from 'body-parser';
import cookies  from 'cookie-parser';
import path     from 'path';


export default (initter, config) => {

  global.__CLIENT__ = false;
  global.__SERVER__ = true;
  global.__DEV__    = config.env !== 'production';

  const app = express();

  app.use(parser.json());

  app.use(parser.urlencoded({ extended: true }));

  app.use(cookies());

  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', initter);

  app.set('port', config.appPort);

  app.listen(app.get('port'), function() {
    console.log(`=> 🚀  Express ${config.bundle} ${config.env} server is running on port ${this.address().port}`);  // eslint-disable-line no-console
  });

}
