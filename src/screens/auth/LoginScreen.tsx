import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {ArrowRight, Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {authApi} from '../../apis';
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
import {colors, fontFamily, screens} from '../../constants';
import {useAppDispatch} from '../../hooks';
import {addAuth} from '../../redux/silces/authSlice';
import {AlertError, Validate} from '../../utils';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const [isDisabledLogin, setIsDisabledLogin] = useState(true);
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
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: () => authApi.login(payloadLogin),
    onSuccess: async res => {
      try {
        if (res.success === true) {
          const auth = JSON.stringify(res.data);
          await AsyncStorage.setItem('auth', auth);
          dispatch(addAuth(res.data));
        } else {
          AlertError(res.message);
        }
      } catch (error) {
        console.log('err :>> ', error);
      }
    },
  });
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
        <SpaceComponent height={10} />
        <SectionComponent styles={styles.section}>
          <ButtonComponent
            disable={isDisabledLogin}
            title="Đăng nhập"
            onPress={() => login.mutate()}
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
        <RowComponent gap={12} align="center" direction="column">
          <TextComponent
            size={13}
            text="Quên mật khẩu?"
            onPress={handlePressForgotPassword}
          />
          <RowComponent gap={4} align="center">
            <TextComponent text="Bạn chưa có tài khoản?" size={13} />
            <TextComponent
              text="Đăng ký"
              size={13}
              color={colors.primary}
              onPress={handlePressRegisterScreen}
            />
          </RowComponent>
        </RowComponent>
      </ContainerAuthComponent>
      <ModalLoading isVisable={login.isPending} />
    </>
  );
};
const styles = StyleSheet.create({
  section: {backgroundColor: 'transparent'},
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
