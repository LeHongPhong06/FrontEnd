import {Lock1, PasswordCheck} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ButtonTextComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppSelector} from '../../hooks/useRedux';

const PasswordScreen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const initialValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  const [userPassword, setUserPassword] = useState(initialValues);
  const {password, confirmNewPassword, newPassword} = userPassword;
  const [isDisable, setIsDisable] = useState(true);
  useEffect(() => {
    if (password && confirmNewPassword && newPassword) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [confirmNewPassword, newPassword, password]);
  const handleChangeValues = (key: string, value: string) => {
    const data: any = {...userPassword};
    data[`${key}`] = value;
    setUserPassword(data);
  };
  const handleConfirmChangePassword = () => {
    console.log('object :>> ', userPassword);
  };
  return (
    <ContainerComponent back title="Đổi mật khẩu">
      <SectionComponent>
        <TextComponent
          styles={styles.title}
          text={`Thay đổi mật khẩu tài khoản ${dataAuth.email}`}
          color={colors.gray}
        />
        <InputComponent
          allowClear
          isPassword
          affix={<Lock1 size={22} color={colors.gray5} />}
          onChange={val => handleChangeValues('password', val)}
          value={password}
          placeholder="Mật khẩu hiện tại"
        />
        <InputComponent
          allowClear
          affix={<Lock1 size={22} color={colors.gray5} />}
          isPassword
          onChange={val => handleChangeValues('newPassword', val)}
          value={newPassword}
          placeholder="Mật khẩu mới"
        />
        <InputComponent
          allowClear
          affix={<PasswordCheck size={22} color={colors.gray5} />}
          isPassword
          onChange={val => handleChangeValues('confirmNewPassword', val)}
          value={confirmNewPassword}
          placeholder="Xác nhận mật khẩu mới"
        />
        <ButtonTextComponent
          disable={isDisable}
          styles={styles.btnConfirm}
          textColor={colors.white}
          title="Đổi mật khẩu"
          onPress={handleConfirmChangePassword}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 18,
  },
  btnConfirm: {
    justifyContent: 'center',
  },
});
export default PasswordScreen;