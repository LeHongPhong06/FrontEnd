import {requestCompleteApi} from '../../apis';
import {globalStyles} from '../../assets';
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerComponent,
  RowComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppSelector} from '../../hooks';
import {ShowToast, formatDateISO, formatDateStringTimes} from '../../utils';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CloseSquare} from 'iconsax-react-native';
import React from 'react';
import {Alert, FlatList, RefreshControl, StyleSheet, View} from 'react-native';

const RequestCompleteScreen = ({route}: any) => {
  const {projectId} = route.params;
  const queryClient = useQueryClient();
  const {dataAuth} = useAppSelector(state => state.auth);
  const {userId} = dataAuth;
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getCompleteList', projectId],
    queryFn: () => requestCompleteApi.getRequestListByProjectId(projectId),
  });
  const payload = {
    confirmById: userId,
    confirmAt: formatDateISO(Date.now()),
  };
  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['getCompleteList', projectId],
      exact: true,
    });
    queryClient.invalidateQueries({
      queryKey: ['getDetailProject', projectId],
      exact: true,
    });
  };
  const acceptRequest = useMutation({
    mutationKey: ['acceptRequestComplete'],
    mutationFn: (requestCompleteId: string) =>
      requestCompleteApi.acceptRequest({...payload, requestCompleteId}),
    onSuccess: res => {
      if (res.success === true) {
        handleRefresh();
        ShowToast('Việc làm đã được xác nhận hoàn thành');
      }
    },
  });
  const refuseRequest = useMutation({
    mutationKey: ['refuseRequestComplete'],
    mutationFn: (requestCompleteId: string) =>
      requestCompleteApi.refuseRequest({...payload, requestCompleteId}),
    onSuccess: res => {
      if (res.success === true) {
        handleRefresh();
        ShowToast('Từ chối xác nhận hoàn thành');
      }
    },
  });
  const deleteRequest = useMutation({
    mutationKey: ['deleteRequestComplete'],
    mutationFn: (requestCompleteId: string) =>
      requestCompleteApi.deleteRequest(requestCompleteId),
    onSuccess: res => {
      if (res.success === true) {
        handleRefresh();
        ShowToast('Đã xóa yêu cầu xác nhận hoàn thành');
      }
    },
  });
  if (!data) {
    return null;
  }
  const handleConfirmComplete = (requestId: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc việc làm đã được hoàn thành', [
      {
        text: 'Đóng',
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        style: 'destructive',
        onPress: () => acceptRequest.mutate(requestId),
      },
    ]);
  };
  const handleConfirmIncomplete = (requestId: string) => {
    Alert.alert('Xác nhận', 'Bạn xác nhận việc làm chưa được hoàn thành', [
      {
        text: 'Đóng',
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        style: 'destructive',
        onPress: () => refuseRequest.mutate(requestId),
      },
    ]);
  };
  return (
    <ContainerComponent title="Yêu cầu hoàn thành" back>
      <FlatList
        data={data.data}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        }
        ListEmptyComponent={
          <View style={styles.wapperNotFound}>
            <SvgNotFoundComponent
              width={250}
              textSize={14}
              height={250}
              text="Không có yêu cầu hoàn thành"
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <RowComponent
            styles={[styles.wapperItem, globalStyles.shadow]}
            gap={12}>
            <AvatarComponent url={item.task.userPerformTask.avatar} size={60} />
            <RowComponent direction="column" gap={6} flex={1}>
              <TextComponent
                text={`Người đảm nhiệm: ${item.task.userPerformTask.fullName}`}
                numberOfLines={1}
              />
              <TextComponent
                text={item.task.userPerformTask.email}
                numberOfLines={1}
                size={13}
                color={colors.gray}
              />
              <TextComponent
                text={`Tên việc làm: ${item.task.title}`}
                numberOfLines={1}
                size={13}
                color={colors.gray}
              />
              <TextComponent
                text={`Thời gian yêu cầu: ${formatDateStringTimes(
                  item?.createAt,
                )}`}
                size={13}
                color={colors.gray}
              />
              {item.status === 'Chưa duyệt' ? (
                <RowComponent justify="flex-end" gap={6}>
                  <ButtonTextComponent
                    onPress={() =>
                      handleConfirmComplete(item.requestCompleteId)
                    }
                    styles={styles.btn}
                    title="Xác nhận"
                    textColor={colors.white}
                  />
                  <ButtonTextComponent
                    onPress={() =>
                      handleConfirmIncomplete(item.requestCompleteId)
                    }
                    title="Từ chối"
                    styles={styles.btn}
                    bgColor={colors.white}
                    borderColor={colors.danger}
                    textColor={colors.danger}
                  />
                </RowComponent>
              ) : (
                <RowComponent direction="column" gap={4}>
                  <TextComponent
                    size={13}
                    text={item.status}
                    color={
                      item.status === 'Đã hoàn thành'
                        ? colors.green
                        : colors.danger
                    }
                  />
                  <RowComponent align="center">
                    <TextComponent
                      size={13}
                      flex={1}
                      text={`Đã xác nhận: ${formatDateStringTimes(
                        item.confirmAt,
                      )}`}
                    />
                    <CloseSquare
                      size={22}
                      color={colors.danger}
                      onPress={() =>
                        deleteRequest.mutate(item.requestCompleteId)
                      }
                    />
                  </RowComponent>
                </RowComponent>
              )}
            </RowComponent>
          </RowComponent>
        )}
        keyExtractor={({requestCompleteId}) => requestCompleteId}
      />
    </ContainerComponent>
  );
};
const styles = StyleSheet.create({
  inputSearch: {
    marginBottom: 0,
  },
  wapperItem: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  wapperNotFound: {
    paddingVertical: 42,
  },
  btn: {
    padding: 6,
    borderRadius: 8,
  },
});
export default RequestCompleteScreen;
