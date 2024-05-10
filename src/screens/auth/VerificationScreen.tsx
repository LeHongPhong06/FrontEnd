import {useMutation} from '@tanstack/react-query';
import {ArrowRight} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, TextInput} from 'react-native';
import {authApi} from '../../apis';
import {
  ButtonComponent,
  CircleComponent,
  ContainerAuthComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {AlertError, ShowToast} from '../../utils';

const VerificationScreen = ({navigation, route}: any) => {
  const {email, code, fullName, password, gender, phoneNumber} = route.params;
  const input1 = useRef<any>();
  const input2 = useRef<any>();
  const input3 = useRef<any>();
  const input4 = useRef<any>();
  const [codeEquasl, setCodeEquasl] = useState('');
  const [limit, setLimit] = useState(59);
  const [disable, setDisable] = useState(true);
  const [codeVerify, setCodeVerify] = useState<string[]>([]);
  const verify = codeVerify.join('');
  useEffect(() => {
    input1.current.focus();
  }, []);
  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);
  useEffect(() => {
    const empty = codeVerify.some(item => item === '');
    if (codeVerify.length !== 4 || empty) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [codeVerify]);
  useEffect(() => {
    setCodeEquasl(code);
  }, [code]);
  const handleChangeCodeVerify = (index: number, val: string) => {
    const item = [...codeVerify];
    item[index] = val;
    setCodeVerify(item);
  };
  const resendCodeVerify = useMutation({
    mutationKey: ['resendCodeVerify'],
    mutationFn: () => authApi.verificationCode({email}),
    onSuccess: res => {
      if (res.success === true) {
        setLimit(59);
        setCodeEquasl(res.data);
        ShowToast('Đã gửi lại mã');
      } else {
        AlertError('Có lỗi trong quá trình gửi mã');
      }
    },
  });
  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: () =>
      authApi.register({email, fullName, password, gender, phoneNumber}),
    onSuccess: res => {
      if (res.success === true) {
        navigation.navigate(screens.LOGIN_SCREEN);
        ShowToast('Bạn đã đăng ký thành công');
      } else {
        AlertError(res.message);
      }
    },
  });
  const handlePressVerifyRegister = () => {
    if (limit === 0) {
      return AlertError(
        'Mã xác nhận đã hết thời gian thực viện vui lòng lấy lại đoạn mã mới',
      );
    } else if (Number(codeEquasl) !== Number(verify)) {
      return AlertError('Mã xác thực không trùng khớp');
    }
    register.mutate();
  };
  const handleResendCodeVerify = () => {
    setCodeVerify([]);
    resendCodeVerify.mutate();
  };
  return (
    <>
      <ContainerAuthComponent isBack title="Xác thực địa chỉ email">
        <TextComponent
          text={`Chúng tôi đã gửi cho bạn mã xác minh qua địa chỉ email: ${email.replace(
            /.{1,5}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
          styles={styles.title}
        />
        <SpaceComponent height={26} />
        <RowComponent align="center" gap={20} justify="center">
          <TextInput
            ref={input1}
            placeholder="_"
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && input2.current.focus();
              handleChangeCodeVerify(0, val);
            }}
            placeholderTextColor={colors.gray5}
            value={codeVerify[0]}
            keyboardType="number-pad"
            style={styles.inputNumber}
          />
          <TextInput
            ref={input2}
            placeholder="_"
            onChangeText={val => {
              val.length > 0 && input3.current.focus();
              handleChangeCodeVerify(1, val);
            }}
            placeholderTextColor={colors.gray5}
            value={codeVerify[1]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.inputNumber}
          />
          <TextInput
            ref={input3}
            placeholder="_"
            onChangeText={val => {
              val.length > 0 && input4.current.focus();
              handleChangeCodeVerify(2, val);
            }}
            placeholderTextColor={colors.gray5}
            value={codeVerify[2]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.inputNumber}
          />
          <TextInput
            ref={input4}
            placeholder="_"
            onChangeText={val => handleChangeCodeVerify(3, val)}
            placeholderTextColor={colors.gray5}
            value={codeVerify[3]}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.inputNumber}
          />
        </RowComponent>
        <SpaceComponent height={36} />
        <SectionComponent styles={styles.section}>
          <ButtonComponent
            disable={disable}
            onPress={handlePressVerifyRegister}
            title="Tiếp tục"
            textColor={colors.white}
            textStyles={styles.textBtnSend}
            suffix={
              <CircleComponent width={30} height={30} bgColor="rgba(0,0,0,0.1)">
                <ArrowRight size={18} color={colors.white} />
              </CircleComponent>
            }
          />
          <SpaceComponent height={30} />
          <RowComponent justify="center">
            {limit === 0 ? (
              <TextComponent
                text={'Gửi lại'}
                color={colors.primary}
                onPress={handleResendCodeVerify}
              />
            ) : (
              <TextComponent
                text={`Gửi lại mã trong 00:${
                  limit < 10 ? `0${limit}` : limit
                } `}
              />
            )}
          </RowComponent>
        </SectionComponent>
      </ContainerAuthComponent>
      <ModalLoading
        isVisable={resendCodeVerify.isPending || register.isPending}
      />
    </>
  );
};
const styles = StyleSheet.create({
  section: {backgroundColor: 'transparent'},
  title: {
    maxWidth: 320,
  },
  inputNumber: {
    borderWidth: 1,
    height: 55,
    width: 55,
    borderRadius: 12,
    padding: 12,
    borderColor: colors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
  },
  imageBg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    flex: 1,
  },
  textBtnSend: {
    fontFamily: fontFamily.semibold,
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 28,
    textAlign: 'center',
  },
});
export default VerificationScreen;
