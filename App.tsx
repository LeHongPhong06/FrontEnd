/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import RootRouter from './src/routers/RootRouter';
const queryClient = new QueryClient();
dayjs.locale('vi');
function App(): React.JSX.Element {
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    }
  };
  useEffect(() => {
    requestPermissions();
    // HandleNotification.checkNotificationPersion();
  }, []);
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
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                <RootRouter />
              </Provider>
            </QueryClientProvider>
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
