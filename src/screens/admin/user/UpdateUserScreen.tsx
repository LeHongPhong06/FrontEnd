import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {userApi} from '../../../apis';
import {
  ButtonTextComponent,
  ContainerAdminComponent,
  InputComponent,
  ModalLoading,
  SectionComponent,
  WorkplacePickerComponent,
} from '../../../components';
import {colors} from '../../../constants';
import {AlertError, ShowToast} from '../../../utils';

const UpdateUserScreen = ({navigation, route}: any) => {
  const {data} = route.params;
  const queryClient = useQueryClient();
  const initialState = {
    fullName: '',
    phoneNumber: '',
    workplaceId: '',
    password: '',
  };
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);
  const [user, setUser] = useState(initialState);
  const {fullName, phoneNumber, workplaceId, password} = user;
  const handleChangeValue = (id: string, val: string) => {
    const dataChage: any = {...user};
    dataChage[`${id}`] = val;
    setUser(dataChage);
  };
  const updateUser = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: () => userApi.adminUpdateUser(data.userId, user),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getUserDetails', data.userId],
          exact: true,
        });
        navigation.goBack();
        ShowToast('Cập nhật người dùng thành công');
      } else {
        AlertError(res.message ?? 'Cập nhật thất bại');
      }
    },
  });
  return (
    <>
      <ContainerAdminComponent back title="Cập nhật thông tin">
        <SectionComponent>
          <InputComponent
            value={fullName}
            lable="Họ và tên"
            placeholder="Nguyen Van A"
            onChange={val => handleChangeValue('fullName', val)}
          />
          <InputComponent
            lable="Số điện thoại"
            value={phoneNumber}
            placeholder="+ 84"
            onChange={val => handleChangeValue('phoneNumber', val)}
          />
          <WorkplacePickerComponent
            label="Bộ môn"
            value={workplaceId}
            onSelect={val => handleChangeValue('workplaceId', val)}
          />
          <InputComponent
            lable="Mật khẩu"
            value={password}
            onChange={val => handleChangeValue('password', val)}
          />
        </SectionComponent>
      </ContainerAdminComponent>
      <ButtonTextComponent
        title="Cập nhật"
        onPress={() => updateUser.mutate()}
        textColor={colors.white}
        styles={styles.btnUpdate}
      />
      <ModalLoading isVisable={updateUser.isPending} />
    </>
  );
};

const styles = StyleSheet.create({
  btnUpdate: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    left: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
});
export default UpdateUserScreen;
