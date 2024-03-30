/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ArrowRight, Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, Image, StyleSheet, Switch} from 'react-native';
import {authApi} from '../../apis/auth';
import {
  ButtonComponent,
  CircleComponent,
  ContainerAuthComponent,
  InputComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  SocialLogin,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {screens} from '../../constants/screens';
import {useAppDispatch} from '../../hooks/useRedux';
import {addAuth} from '../../redux/silces/authSlice';
import {Validate} from '../../utils/validate';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isDisabledLogin, setIsDisabledLogin] = useState(true);
  const [remember, setRemember] = useState(false);
  const [payloadLogin, setPayloadLogin] = useState({
    email: '',
    password: '',
  });
  const {email, password} = payloadLogin;
  const isEmail = Validate.Email(payloadLogin.email);
  const isLenghtPassword = Validate.Password(payloadLogin.password);
  useEffect(() => {
    if (email && password && isEmail && isLenghtPassword) {
      setIsDisabledLogin(false);
    } else {
      setIsDisabledLogin(true);
    }
  }, [email, password, isEmail, isLenghtPassword]);
  const handleChangePayloadLogin = (id: string, value: string | boolean) => {
    const item: any = {...payloadLogin};
    item[`${id}`] = value;
    setPayloadLogin(item);
  };
  const handlePressRegisterScreen = () => {
    navigation.navigate(screens.REGISTER_SCREEN);
  };
  const handlePressForgotPassword = () => {
    navigation.navigate(screens.FORGOTPASSWORD_SCREEN);
  };
  const handlePressLogin = async () => {
    setIsLoadingLogin(true);
    try {
      const res = await authApi.login(payloadLogin);
      if (res.success === true) {
        const auth = JSON.stringify(res.items);
        dispatch(addAuth(res.items));
        await AsyncStorage.setItem(
          'auth',
          remember ? auth : payloadLogin.email,
        );
        setIsLoadingLogin(false);
      } else {
        setIsLoadingLogin(false);
        Alert.alert('Thất bại', res.message, [
          {
            text: 'Đóng',
            style: 'cancel',
          },
        ]);
      }
    } catch (error: any) {
      setIsLoadingLogin(false);
      console.log('err :>> ', error);
    }
  };
  return (
    <>
      <ContainerAuthComponent>
        <RowComponent
          align="center"
          direction="column"
          gap={10}
          styles={styles.logo}>
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.imageLogo}
          />
          <TextComponent text="TodoHub" font={fontFamily.semibold} size={30} />
        </RowComponent>
        <TextComponent
          text="Đăng nhập"
          font={fontFamily.semibold}
          size={24}
          styles={styles.textLogin}
        />
        <InputComponent
          affix={<Sms size={22} color={colors.gray5} />}
          placeholder="abc@gmail.com"
          allowClear
          value={email}
          onChange={val => handleChangePayloadLogin('email', val)}
        />
        <InputComponent
          affix={<Lock size={22} color={colors.gray5} />}
          allowClear
          isPassword
          placeholder="Mật khẩu"
          value={password}
          onChange={val => handleChangePayloadLogin('password', val)}
        />
        <SpaceComponent height={4} />
        <RowComponent
          align="center"
          justify="space-between"
          styles={{
            flexWrap: 'wrap',
          }}>
          <RowComponent align="center">
            <Switch
              value={remember}
              trackColor={{false: colors.gray2, true: colors.primary}}
              thumbColor={remember ? colors.white : colors.primary}
              onValueChange={() => setRemember(!remember)}
            />
            <TextComponent
              size={12}
              text="Remember me"
              styles={{marginLeft: remember ? 4 : 0}}
            />
          </RowComponent>
          <TextComponent
            size={12}
            text="Quên mật khẩu?"
            onPress={handlePressForgotPassword}
          />
        </RowComponent>
        <SpaceComponent height={30} />
        <SectionComponent>
          <ButtonComponent
            disable={isDisabledLogin}
            title="Đăng nhập"
            onPress={handlePressLogin}
            textColor={colors.white}
            textStyles={styles.textBtnLogin}
            suffix={
              <CircleComponent width={30} height={30} bgColor="rgba(0,0,0,0.1)">
                <ArrowRight size={18} color={colors.white} />
              </CircleComponent>
            }
          />
          <SpaceComponent height={20} />
          <TextComponent
            text="hoặc"
            uppercase
            textAlign="center"
            font={fontFamily.semibold}
            color={colors.gray4}
          />
          <SpaceComponent height={6} />
          <SocialLogin />
        </SectionComponent>
        <RowComponent gap={8} align="center" justify="center">
          <TextComponent text="Bạn chưa có tài khoản?" size={13} />
          <TextComponent
            text="Đăng ký"
            size={13}
            color={colors.primary}
            onPress={handlePressRegisterScreen}
          />
        </RowComponent>
      </ContainerAuthComponent>
      <ModalLoading isVisable={isLoadingLogin} />
    </>
  );
};
const styles = StyleSheet.create({
  logo: {
    paddingVertical: 42,
  },
  imageLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  imageBg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    flex: 1,
  },
  textLogin: {
    marginBottom: 21,
  },
  textBtnLogin: {
    fontFamily: fontFamily.semibold,
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 28,
    textAlign: 'center',
  },
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
export default LoginScreen;
