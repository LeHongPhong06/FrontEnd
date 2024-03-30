/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import RootRouter from './src/routers/RootRouter';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import 'dayjs/locale/vi';
import dayjs from 'dayjs';

function App(): React.JSX.Element {
  dayjs.locale('vi');
  return (
    <>
      <GestureHandlerRootView style={stylse.rootView}>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
        <Host>
          <NavigationContainer>
            <Provider store={store}>
              <RootRouter />
            </Provider>
          </NavigationContainer>
        </Host>
      </GestureHandlerRootView>
    </>
  );
}

const stylse = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
export default App;
