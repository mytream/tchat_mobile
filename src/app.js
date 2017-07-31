import React from 'react';
import { Provider } from 'react-redux'
import AppWithNavigationState from './containers/AppWithNavigationState'
import configureStore from './store/configureStore'

const store = configureStore();

export default  class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

