import {ArrowRight, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  ButtonComponent,
  CircleComponent,
  ContainerAuthComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';

const ForgotPasswordScreen = () => {
  const [isDisabledRegister, setIsDisabledRegister] = useState(true);
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (email) {
      setIsDisabledRegister(false);
    } else {
      setIsDisabledRegister(true);
    }
  }, [email]);
  const handleChangeemail = (value: string) => {
    setEmail(value);
  };
  return (
    <ContainerAuthComponent isBack title="Làm mới mật khẩu">
      <TextComponent
        text="Vui lòng nhập địa chỉ email của bạn để yêu cầu đặt lại mật khẩu"
        styles={styles.title}
      />
      <SpaceComponent height={26} />
      <InputComponent
        allowClear
        placeholder="abc@gmail.com"
        affix={<Sms size={22} color={colors.gray5} />}
        value={email}
        onChange={val => handleChangeemail(val)}
      />
      <SpaceComponent height={26} />
      <SectionComponent>
        <ButtonComponent
          disable={isDisabledRegister}
          title="Gửi"
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
});
export default ForgotPasswordScreen;
