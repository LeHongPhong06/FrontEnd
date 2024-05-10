import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {LoginManager, Profile} from 'react-native-fbsdk-next';
import {ButtonComponent, SpaceComponent} from '.';
import {colors} from '../constants';
const SocialLogin = () => {
  GoogleSignin.configure({
    webClientId:
      '262611663870-2rsfvr4hv076m1hgmtukes9lgg3g8gf9.apps.googleusercontent.com',
  });
  const handlePressLoginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential);
      const user = GoogleSignin.getCurrentUser();
      if (user) {
        console.log('user :>> ', user);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  const handlePressLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      if (result.isCancelled) {
        console.log('loginCancle :>> ');
      } else {
        const profile = await Profile.getCurrentProfile();
        console.log('profile :>> ', profile);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return (
    <View>
      <ButtonComponent
        styles={styles.btnWithFb}
        affix={
          <Image
            style={styles.logoFb}
            source={require('../assets/images/logoGoogle.png')}
          />
        }
        bgColor={colors.white}
        title="Đăng nhập với Google"
        textStyles={styles.textWithFb}
        onPress={handlePressLoginWithGoogle}
        textColor={colors.text}
      />
      <SpaceComponent height={10} />
      <ButtonComponent
        styles={styles.btnWithFb}
        affix={
          <Image
            source={require('../assets/images/logoFb.png')}
            style={styles.logoFb}
          />
        }
        textStyles={styles.textWithFb}
        textColor={colors.text}
        bgColor={colors.white}
        title="Đăng nhập với Facebook"
        onPress={handlePressLoginWithFacebook}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  logoFb: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  btnWithFb: {
    paddingHorizontal: 20,
  },
  textWithFb: {
    marginLeft: 18,
    fontSize: 16,
    textAlign: 'center',
  },
});
export default SocialLogin;
