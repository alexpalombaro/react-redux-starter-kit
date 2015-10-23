import React from 'react';
import {Provider} from 'react-redux';
import routes from 'routes';
import invariant from 'invariant';
import {Router, RoutingContext} from 'react-router';
import {createDevToolsWindow} from 'utils';

export default class Root extends React.Component {

  // routerHistory is provided by the client bundle to determine which
  // history to use (memory, hash, browser). routingContext, on the other hand,
  // is provided by the server and provides a full router state.
  static propTypes = {
    routerHistory: React.PropTypes.object,
    initialRouterState: React.PropTypes.object,
    store: React.PropTypes.object
  };

  constructor() {
    super();
  }

  renderRouter() {
    invariant(this.props.routingContext || this.props.routerHistory,
      '<Root /> needs either a routingContext or routerHistory to render.'
    );

    if (this.props.routingContext) {
      return <RoutingContext {...this.props.routingContext} />;
    } else {
      return (
        <Router history={this.props.routerHistory}>
          {routes}
        </Router>
      );
    }
  }

  render() {
    return (
      <div>
        <Provider store={this.props.store}>
          {this.renderRouter()}
        </Provider>
      </div>
    );
  }
}
