import React from 'react';
import { Provider } from 'react-redux'
import codePush from 'react-native-code-push'
import AppWithNavigationState from './containers/AppWithNavigationState'
import configureStore from './store/configureStore'

const store = configureStore();

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
})(App);

