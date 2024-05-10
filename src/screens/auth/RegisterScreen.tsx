import {useMutation} from '@tanstack/react-query';
import {ArrowRight, Call, Lock, Sms, User} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {authApi} from '../../apis';
import {
  ButtonComponent,
  CircleComponent,
  ContainerAuthComponent,
  InputComponent,
  ModalLoading,
  RadioButtonComponent,
  RowComponent,
  SectionComponent,
  SocialLogin,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {AlertError, ShowToast, Validate} from '../../utils';

const RegisterScreen = ({navigation}: any) => {
  const [isDisabledRegister, setIsDisabledRegister] = useState(true);
  const [payloadRegister, setPayloadRegister] = useState({
    fullName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const {fullName, email, password, confirmPassword, gender, phoneNumber} =
    payloadRegister;
  const isEmail = Validate.Email(email);
  const isLenghtPassword = Validate.Password(password);
  useEffect(() => {
    if (
      fullName &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      setIsDisabledRegister(false);
    } else {
      setIsDisabledRegister(true);
    }
  }, [confirmPassword, email, fullName, password]);
  const handleChangePayloadRegister = (id: string, value: string) => {
    const item: any = {...payloadRegister};
    item[`${id}`] = value;
    setPayloadRegister(item);
  };
  const verify = useMutation({
    mutationKey: ['verifiycode'],
    mutationFn: () => authApi.verificationCode({email: payloadRegister.email}),
    onSuccess: res => {
      if (res.success === true) {
        navigation.navigate(screens.VERIFICATION_SCREEN, {
          ...payloadRegister,
          code: res.data,
        });
        ShowToast(`Đã gửi mã về địa chỉ ${payloadRegister.email}`);
      } else {
        AlertError(res.message);
      }
    },
  });

  const handlePressRegister = () => {
    if (!isEmail || !isLenghtPassword) {
      Alert.alert(
        'Thất bại',
        'Mật khẩu tối thiểu 6 ký tự, Chưa đúng định dạng email',
        [
          {
            text: 'Đóng',
            style: 'cancel',
          },
        ],
      );
    }
    verify.mutate();
  };
  const handlePressLogin = () => {
    navigation.navigate(screens.LOGIN_SCREEN);
  };
  return (
    <>
      <ContainerAuthComponent isBack title="Đăng ký">
        <InputComponent
          allowClear
          placeholder="Họ và tên"
          affix={<User size={22} color={colors.gray5} />}
          value={fullName}
          onChange={val => handleChangePayloadRegister('fullName', val)}
        />
        <RadioButtonComponent
          onSelect={val => handleChangePayloadRegister('gender', val)}
          value={gender}
        />
        <InputComponent
          allowClear
          placeholder="+84"
          affix={<Call size={22} color={colors.gray5} />}
          value={phoneNumber}
          onChange={val => handleChangePayloadRegister('phoneNumber', val)}
        />
        <InputComponent
          allowClear
          placeholder="abc@gmail.com"
          affix={<Sms size={22} color={colors.gray5} />}
          value={email}
          onChange={val => handleChangePayloadRegister('email', val)}
        />
        <InputComponent
          isPassword
          allowClear
          placeholder="Mật khẩu"
          affix={<Lock size={22} color={colors.gray5} />}
          value={password}
          onChange={val => handleChangePayloadRegister('password', val)}
        />
        <InputComponent
          isPassword
          allowClear
          placeholder="Xác nhận mật khẩu"
          affix={<Lock size={22} color={colors.gray5} />}
          value={confirmPassword}
          onChange={val => handleChangePayloadRegister('confirmPassword', val)}
        />
        <SpaceComponent height={26} />
        <SectionComponent styles={styles.section}>
          <ButtonComponent
            disable={isDisabledRegister}
            title="Đăng ký"
            onPress={handlePressRegister}
            textColor={colors.white}
            textStyles={styles.textBtnRegister}
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
          <SpaceComponent height={16} />
          <SocialLogin />
        </SectionComponent>
        <RowComponent gap={8} align="center" justify="center">
          <TextComponent text="Bạn đã có tài khoản?" size={13} />
          <TextComponent
            text="Đăng nhập"
            size={13}
            color={colors.primary}
            onPress={handlePressLogin}
          />
        </RowComponent>
      </ContainerAuthComponent>
      <ModalLoading isVisable={verify.isPending} />
    </>
  );
};
const styles = StyleSheet.create({
  section: {backgroundColor: 'transparent'},
  textBtnRegister: {
    fontFamily: fontFamily.semibold,
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 28,
    textAlign: 'center',
  },
});
export default RegisterScreen;
