import React                    from 'react';
import { PropTypes as Type }    from 'react';

import Header                   from '../components/Header';


export default class Layout extends React.Component {


  static propTypes = {
    children: Type.object,
  }


  constructor(props, context) {
    super(props, context);
  }


  render() {

    return (
        <section id="layout">
          <Header />
          {this.props.children}
        </section>
    );

  }


}
