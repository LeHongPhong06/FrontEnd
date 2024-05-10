import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {workplaceApi} from '../../../apis';
import {
  ButtonTextComponent,
  ContainerAdminComponent,
  LogoComponent,
  ModalLoading,
  ModalUpdateWorkplace,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {colors} from '../../../constants';
import {AlertError, ShowToast} from '../../../utils';

const WorkplaceDetailScreen = ({navigation, route}: any) => {
  const queryClient = useQueryClient();
  const {workplaceId} = route.params;
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const {data, isLoading} = useQuery({
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
  const handleUpdateWorkplace = () => {
    setIsModalUpdate(true);
  };

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
      <ContainerAdminComponent back title="Thông tin bộ môn">
        <SectionComponent>
          <RowComponent direction="column" gap={24}>
            <LogoComponent size={200} url={data.logo} />
            <TextComponent text={`Mã bộ môn: ${data.workplaceId}`} />
            <TextComponent text={`Tên bộ môn: ${data.name}`} />
            <TextComponent text={`Số lượng giảng viên: ${data.total}`} />
            <TextComponent
              text={`Trưởng bộ môn: ${
                data.leader?.fullName ?? 'Chưa bổ nhiệm'
              }`}
            />
          </RowComponent>
        </SectionComponent>
      </ContainerAdminComponent>
      <ModalUpdateWorkplace
        isVisable={isModalUpdate}
        value={data.name}
        onConfirm={() => setIsModalUpdate(false)}
        workplaceId={data.workplaceId}
      />
      <RowComponent gap={6} styles={styles.wapperBtn}>
        <ButtonTextComponent
          title="Cập nhật"
          textColor={colors.white}
          onPress={handleUpdateWorkplace}
          styles={styles.btnUpdate}
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
  btnUpdate: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 8,
  },
  btnDelete: {
    borderRadius: 8,
  },
});
export default WorkplaceDetailScreen;
