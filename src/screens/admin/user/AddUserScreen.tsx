import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Add} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {userApi} from '../../../apis';
import {
  ButtonTextComponent,
  ContainerAdminComponent,
  DropdownRoleComponent,
  InputComponent,
  ModalLoading,
  RadioButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  WorkplacePickerComponent,
} from '../../../components';
import {colors} from '../../../constants';
import {AlertError, ShowToast, Validate} from '../../../utils';

const AddUserScreen = ({navigation}: any) => {
  const queryClient = useQueryClient();
  const initialState = {
    fullName: '',
    email: '',
    gender: '',
    roleId: '',
    phoneNumber: '',
    workplaceId: '',
    password: '',
  };
  const [user, setUser] = useState(initialState);
  const [disable, setDisable] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const {fullName, email, phoneNumber, workplaceId, password, gender, roleId} =
    user;
  const addUSer = useMutation({
    mutationKey: ['addUser'],
    mutationFn: () => userApi.createUser(user),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({queryKey: ['getUserAll']});
        navigation.goBack();
        ShowToast('Thêm người dùng thành công');
      } else {
        AlertError(res.message ?? 'Thêm người dùng thất bại');
      }
    },
  });
  useEffect(() => {
    if (
      fullName &&
      email &&
      phoneNumber &&
      workplaceId &&
      password &&
      gender &&
      Validate.Email(email) &&
      Validate.Password(password)
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [fullName, email, phoneNumber, workplaceId, password, gender]);
  const checkEmail = () => {
    if (Validate.Email(email)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };
  const checkPassword = () => {
    if (Validate.Password(password)) {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  };
  const handleChangeValue = (id: string, val: string) => {
    const data: any = {...user};
    data[`${id}`] = val;
    setUser(data);
  };
  return (
    <>
      <ContainerAdminComponent back title="Thêm người dùng" isScroll>
        <SectionComponent>
          <InputComponent
            value={fullName}
            allowClear
            required
            lable="Họ và tên"
            placeholder="Họ và tên"
            onChange={val => handleChangeValue('fullName', val)}
          />
          <RadioButtonComponent
            value={gender}
            label="Giới tính"
            onSelect={val => handleChangeValue('gender', val)}
          />
          <InputComponent
            required
            onEnd={checkEmail}
            allowClear
            lable="Địa chỉ email"
            placeholder="example@gmail.com"
            value={email}
            onChange={val => handleChangeValue('email', val)}
          />
          {!isEmail && (
            <TextComponent
              text={'Không đúng định dạng email'}
              color={colors.danger}
              size={12}
              styles={styles.textAlert}
            />
          )}
          <InputComponent
            placeholder="+ 84"
            lable="Số điện thoại"
            value={phoneNumber}
            allowClear
            required
            onChange={val => handleChangeValue('phoneNumber', val)}
          />
          <WorkplacePickerComponent
            label="Bộ môn"
            value={workplaceId}
            onSelect={val => handleChangeValue('workplaceId', val)}
          />
          <DropdownRoleComponent
            label="Quyền người dùng"
            value={roleId}
            onSeclect={val => handleChangeValue('roleId', val)}
          />
          <InputComponent
            allowClear
            lable="Mật khẩu"
            isPassword
            onEnd={checkPassword}
            value={password}
            onChange={val => handleChangeValue('password', val)}
          />
          {!isPasswordCorrect && (
            <TextComponent
              text={'Mật khẩu tối thiểu 6 ký tự'}
              color={colors.danger}
              size={12}
              styles={styles.textAlert}
            />
          )}
        </SectionComponent>
        <SpaceComponent height={40} />
      </ContainerAdminComponent>
      <ModalLoading isVisable={addUSer.isPending} />
      <ButtonTextComponent
        disable={disable}
        onPress={() => addUSer.mutate()}
        styles={styles.btnAdd}
        title="Thêm người dùng"
        affix={<Add size={18} color={colors.white} />}
        textColor={colors.white}
      />
    </>
  );
};
const styles = StyleSheet.create({
  textAlert: {
    marginTop: -15,
    marginBottom: 8,
  },
  btnAdd: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    left: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
});
export default AddUserScreen;
