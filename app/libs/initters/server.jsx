import React      from 'react';
import Router     from 'react-router';
import Location   from 'react-router/lib/Location';
import Jade       from 'jade';


export default (req, res, next, params) => {

  const { routes, bundle, locals, Head } = params;

  const location = new Location(req.path, req.query);

  Router.run(routes, location, (error, initialState, transition) => {

    if (error) return res.status(500).send(error);

    try {

      locals.head = React.renderToStaticMarkup(
        <Head cssAsset={locals.cssAsset} />
      );

      locals.body = React.renderToString(
        <Router location={location} {...initialState} />
      );

      const chunks = __DEV__ ? {} : require('public/assets/chunk-manifest.json');

      locals.chunks = JSON.stringify(chunks);

      const layout = `${process.cwd()}/app/bundles/${bundle}/layouts/Layout.jade`;
      const html   = Jade.compileFile(layout, { pretty: false })(locals);

      res.send(html);

    } catch (err) {

      res.status(500).send(err.stack);

    }

  });

}
