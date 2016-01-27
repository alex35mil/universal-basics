import React                    from 'react';
import { PropTypes as Type }    from 'react';


export default class Head extends React.Component {


  static propTypes = {
    cssAsset: Type.string,
  }


  constructor(props, context) {
    super(props, context);
  }


  render() {

    return (

        <head>

          <base href="/" />
          <meta charSet="utf-8" />

          <title>I'm a page title!</title>

          <meta name="viewport" content="width=device-width,initial-scale=1" />

          {!__DEV__ && <link rel="stylesheet" href={this.props.cssAsset} />}

        </head>

    );

  }


}
