import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ApplicationWrapper from './src/components/ApplicationWrapper';
import store from './src/redux/store/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApplicationWrapper />
      </Provider>
    );
  }
}

export default App;
