import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ArrowRight2} from 'iconsax-react-native';
import React from 'react';
import {Alert, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {workplaceApi} from '../../../apis';
import {globalStyles} from '../../../assets';
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerAdminComponent,
  LogoComponent,
  ModalLoading,
  ModalUpdateWorkplace,
  RowComponent,
  SpaceComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../../components';
import {colors, navigator, screens} from '../../../constants';
import {AlertError, ShowToast, getRoleName} from '../../../utils';

const WorkplaceDetailScreen = ({navigation, route}: any) => {
  const queryClient = useQueryClient();
  const {workplaceId} = route.params;
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getInfoWorkplaceById', workplaceId],
    queryFn: () => workplaceApi.getWorkplaceById(workplaceId),
  });
  const deleteWorkplace = useMutation({
    mutationKey: ['deleteWorkplace'],
    mutationFn: () => workplaceApi.deleteWorkplace(workplaceId),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({queryKey: ['getWorkplaceAll']});
        navigation.goBack();
        ShowToast('Xóa bộ môn thành công');
      } else {
        AlertError(res.message ?? 'Xóa thất bại');
      }
    },
  });
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  const handleDeleteWorkplace = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa bộ môn', [
      {
        text: 'Đóng',
        style: 'cancel',
      },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => deleteWorkplace.mutate(),
      },
    ]);
  };
  return (
    <>
      <ContainerAdminComponent
        back
        title="Thông tin bộ môn"
        styles={styles.container}>
        <RowComponent gap={4}>
          <LogoComponent size={110} url={data.logo} />
          <RowComponent direction="column" gap={6}>
            <TextComponent text={`Mã bộ môn: ${data.workplaceId}`} />
            <TextComponent text={`Tên bộ môn: ${data.name}`} />
            <TextComponent text={`Số lượng giảng viên: ${data.total}`} />
            <TextComponent
              text={`Trưởng bộ môn: ${
                data.leader?.fullName ?? 'Chưa bổ nhiệm'
              }`}
            />
          </RowComponent>
        </RowComponent>
        <SpaceComponent height={12} />
        <TextComponent
          text={'Danh sách gảng viên'}
          styles={styles.titleUserList}
        />
        <FlatList
          data={data.users}
          showsVerticalScrollIndicator={false}
          keyExtractor={({userId}) => userId}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={isLoading}
              onRefresh={refetch}
            />
          }
          ListEmptyComponent={
            <View style={styles.notFound}>
              <SvgNotFoundComponent
                height={200}
                width={200}
                text="Không có giảng viên"
                textSize={14}
              />
            </View>
          }
          renderItem={({item}) => {
            const handlePressUserDetail = () => {
              navigation.navigate(navigator.MANAGERUSER_NAVIGATOR, {
                screen: screens.USERDETAIL_SCREEN,
                params: {userId: item.userId},
              });
            };
            return (
              <RowComponent
                onPress={handlePressUserDetail}
                styles={[styles.userItem, globalStyles.shadow]}
                gap={12}>
                <AvatarComponent url={item.avatar} size={50} />
                <RowComponent flex={1} align="center">
                  <RowComponent direction="column" gap={4} flex={1}>
                    <TextComponent text={item.fullName} />
                    <TextComponent text={item.email} numberOfLines={1} />
                    <TextComponent text={item.phoneNumber} />
                    <TextComponent text={getRoleName(item.roleId)} />
                  </RowComponent>
                  <ArrowRight2 size={16} color={colors.gray5} />
                </RowComponent>
              </RowComponent>
            );
          }}
        />
      </ContainerAdminComponent>
      <RowComponent gap={6} styles={styles.wapperBtn}>
        <ModalUpdateWorkplace
          value={data.name}
          workplaceId={data.workplaceId}
        />
        <ButtonTextComponent
          title="Xóa"
          textColor={colors.danger}
          onPress={handleDeleteWorkplace}
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
  btnDelete: {
    borderRadius: 8,
  },
  titleUserList: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: colors.gray5,
  },
  userItem: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.white,
  },
  container: {
    paddingBottom: 60,
  },
  notFound: {
    marginTop: 24,
  },
});
export default WorkplaceDetailScreen;
