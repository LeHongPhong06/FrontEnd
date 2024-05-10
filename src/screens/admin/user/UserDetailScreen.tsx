import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {userApi} from '../../../apis';
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerAdminComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {colors, fontFamily, screens} from '../../../constants';
import {AlertError, ShowToast, getRoleName} from '../../../utils';

const UserDetailScreen = ({navigation, route}: any) => {
  const queryClient = useQueryClient();
  const {userId} = route.params;
  const {data, isLoading} = useQuery({
    queryKey: ['getUserDetails', userId],
    queryFn: () => userApi.getById(userId),
  });
  const deleteUser = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => userApi.deleteUser(userId),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({queryKey: ['getUserAll']});
        navigation.goBack();
        ShowToast('Bạn đã xóa thành công');
      } else {
        AlertError(res.message ?? 'Xóa thất bại');
      }
    },
  });
  if (!userId) {
    return null;
  }
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  const handleUpdateUser = () => {
    navigation.navigate(screens.UPDATEUSER_SCREEN, {data});
  };
  const handleDeleteUser = () => {
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc muốn xóa người dùng ${data.fullName}`,
      [
        {
          text: 'Đóng',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => deleteUser.mutate(),
        },
      ],
    );
  };
  return (
    <>
      <ContainerAdminComponent back title={'Thông tin chi tiết'}>
        <SectionComponent>
          <RowComponent direction="column" gap={16}>
            <RowComponent align="center" gap={12}>
              <AvatarComponent size={50} url={data.avatar} />
              <TextComponent
                text={data.fullName}
                font={fontFamily.semibold}
                size={18}
              />
            </RowComponent>
            <TextComponent text={`Email: ${data.email}`} size={16} />
            <TextComponent
              text={`Số điện thoại: ${data.phoneNumber}`}
              size={16}
            />
            <TextComponent
              text={`Bộ môn: ${data.workplace?.name ?? 'Chưa tham gia'}`}
              size={16}
            />
            <TextComponent
              text={`Chức vụ: ${getRoleName(data.roleId)}`}
              size={16}
            />
          </RowComponent>
        </SectionComponent>
      </ContainerAdminComponent>
      <RowComponent gap={6} styles={styles.wapperBtn}>
        <ButtonTextComponent
          title="Cập nhật"
          textColor={colors.white}
          onPress={handleUpdateUser}
          styles={styles.btnUpdate}
        />
        <ButtonTextComponent
          title="Xóa"
          textColor={colors.danger}
          onPress={handleDeleteUser}
          bgColor={colors.white}
          borderColor={colors.danger}
          styles={styles.btnDelete}
        />
      </RowComponent>
    </>
  );
};

const styles = StyleSheet.create({
  wapperBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    left: 8,
  },
  btnUpdate: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 8,
  },
  btnDelete: {
    borderRadius: 8,
  },
});
export default UserDetailScreen;
