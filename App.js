import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import ApplicationWrapper from './src/components/application-wrapper';
import Toast from 'react-native-toast-message';
import store from './src/redux/store/store';

class App extends Component {
  render() {
    return (
        <NavigationContainer>
          <Provider store={store}>
            <ApplicationWrapper />
          </Provider>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
    );
  }
}

export default App;