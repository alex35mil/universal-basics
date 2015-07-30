import React      from 'react';
import { Link }   from 'react-router';


export default class Layout extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  render() {

    return (
        <header>
          <h1>Universal app example</h1>
          <ul>
            <li><Link to="/">Main</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </header>
    );

  }


}
