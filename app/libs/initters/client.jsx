import React            from 'react';
import Router           from 'react-router';
import BrowserHistory   from 'react-router/lib/BrowserHistory';


export default (params) => {

  const { routes } = params;

  const history = new BrowserHistory();

  const AppContainer = (
    <Router history={history} children={routes} />
  );

  const appDOMNode = document.getElementById('app');

  React.render(AppContainer, appDOMNode);

}
