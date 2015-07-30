import polyfill   from 'babel/polyfill';  // eslint-disable-line no-unused-vars

import initter    from 'app/libs/initters/client';
import routes     from '../routes/routes';


const params = { routes };

export default initter(params);
