import {useMutation} from '@tanstack/react-query';
import {ArrowRight, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {authApi} from '../../apis';
import {
  ButtonComponent,
  CircleComponent,
  ContainerAuthComponent,
  InputComponent,
  ModalLoading,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {ShowToast, Validate} from '../../utils';

const ForgotPasswordScreen = ({navigation}: any) => {
  const [isDisabledRegister, setIsDisabledRegister] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (email && Validate.Email(email)) {
      setIsDisabledRegister(false);
    } else {
      setIsDisabledRegister(true);
    }
  }, [email]);
  const checkEmail = () => {
    if (Validate.Email(email)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };
  const resetPassword = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: () => authApi.verificationCodeResetPassword({email}),
    onSuccess: res => {
      if (res.success === true) {
        navigation.navigate(screens.LOGIN_SCREEN);
        ShowToast(
          'Mật khẩu được làm mới thành công, vui lòng kiểm tra trong hòm thư email',
        );
      }
    },
  });
  return (
    <>
      <ContainerAuthComponent isBack title="Làm mới mật khẩu">
        <TextComponent
          text="Vui lòng nhập địa chỉ email của bạn để yêu cầu đặt lại mật khẩu"
          styles={styles.title}
        />
        <TextComponent
          text={'Mật khẩu mới sẽ là 6 số ngẫu nhiên được gửi trong email'}
          styles={styles.title}
        />
        <SpaceComponent height={26} />
        <InputComponent
          allowClear
          placeholder="abc@gmail.com"
          affix={<Sms size={22} color={colors.gray5} />}
          value={email}
          onEnd={checkEmail}
          onChange={val => setEmail(val)}
        />
        {!isEmail && (
          <TextComponent
            text={'Không đúng định dạng email'}
            color={colors.danger}
            size={12}
            styles={styles.textEmailWarning}
          />
        )}
        <SpaceComponent height={26} />
        <SectionComponent>
          <ButtonComponent
            disable={isDisabledRegister}
            title="Gửi"
            onPress={() => resetPassword.mutate()}
            textColor={colors.white}
            textStyles={styles.textBtnSend}
            suffix={
              <CircleComponent width={30} height={30} bgColor="rgba(0,0,0,0.1)">
                <ArrowRight size={18} color={colors.white} />
              </CircleComponent>
            }
          />
        </SectionComponent>
      </ContainerAuthComponent>
      <ModalLoading isVisable={resetPassword.isPending} />
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    maxWidth: 300,
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
  textEmailWarning: {
    marginTop: -10,
  },
});
export default ForgotPasswordScreen;
