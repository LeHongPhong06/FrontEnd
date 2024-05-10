import {useMutation} from '@tanstack/react-query';
import {Lock1, PasswordCheck} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {authApi} from '../../apis';
import {
  ButtonTextComponent,
  ContainerComponent,
  InputComponent,
  ModalLoading,
  SectionComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppSelector} from '../../hooks';
import {AlertError, ShowToast} from '../../utils';

const PasswordScreen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const initialValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };
  const [user, setUser] = useState(initialValues);
  const {password, confirmPassword, newPassword} = user;
  const [isDisable, setIsDisable] = useState(true);
  useEffect(() => {
    if (password && confirmPassword && newPassword) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [confirmPassword, newPassword, password]);
  const handleChangeValues = (key: string, value: string) => {
    const data: any = {...user};
    data[`${key}`] = value;
    setUser(data);
  };
  const changePassword = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: () => authApi.changePassword(dataAuth.userId, user),
    onSuccess: res => {
      if (res.success === true) {
        setUser(initialValues);
        ShowToast('Bạn thay đổi mật khẩu thành công');
      } else {
        AlertError(res.message);
      }
    },
  });
  return (
    <>
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
            onChange={val => handleChangeValues('confirmPassword', val)}
            value={confirmPassword}
            placeholder="Xác nhận mật khẩu mới"
          />
          <ButtonTextComponent
            disable={isDisable}
            styles={styles.btnConfirm}
            textColor={colors.white}
            title="Đổi mật khẩu"
            onPress={() => changePassword.mutate()}
          />
        </SectionComponent>
      </ContainerComponent>
      <ModalLoading isVisable={changePassword.isPending} />
    </>
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
