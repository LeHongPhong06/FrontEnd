import {
  ImageBackground,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import {colors} from '../constants';

const SplashScreen = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={require('../assets/images/bgSplash.png')}
        style={styles.wapper}
        imageStyle={styles.bgImage}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logoImage}
        />
        <ActivityIndicator color={colors.primary} size={30} />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  wapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
  },
  logoImage: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').height * 0.3,
  },
});
export default SplashScreen;
