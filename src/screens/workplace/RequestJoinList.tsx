import {requestToJoinApi} from '../../apis';
import {globalStyles} from '../../assets';
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerComponent,
  InputComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppSelector} from '../../hooks';
import {RequestToJoin} from '../../types';
import {ShowToast, formatDateISO, formatDateStringTimes} from '../../utils';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CloseSquare, SearchNormal1} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Alert, FlatList, RefreshControl, StyleSheet, View} from 'react-native';

const RequestJoinListScreen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 10;
  const {workplaceId} = dataAuth;
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getJoinList', workplaceId, page, search, limit],
    queryFn: () => {
      if (workplaceId) {
        return requestToJoinApi.getReqquestByWorkplaceId(
          workplaceId,
          page,
          search,
          limit,
        );
      }
    },
  });
  if (!data) {
    return null;
  }
  return (
    <>
      <ContainerComponent back title="Danh sách yêu cầu tham gia">
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <SectionComponent>
              <InputComponent
                style={styles.inputSearch}
                allowClear
                affix={
                  <SearchNormal1
                    size={22}
                    color={search.length > 0 ? colors.primary : colors.gray5}
                  />
                }
                value={search}
                onChange={val => setSearch(val)}
                placeholder="Tên hoặc email người yêu cầu"
              />
            </SectionComponent>
          }
          ListEmptyComponent={
            <View style={styles.wapperNotFound}>
              <SvgNotFoundComponent
                width={250}
                textSize={14}
                height={250}
                text="Không có lời yêu cầu nào"
              />
            </View>
          }
          data={data}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={isLoading}
              onRefresh={refetch}
            />
          }
          keyExtractor={({requestToJoinId}) => requestToJoinId}
          renderItem={({item}) => <RenderItem item={item} />}
        />
      </ContainerComponent>
      <ModalLoading isVisable={isLoading} />
    </>
  );
};

const RenderItem = ({item}: {item: RequestToJoin}) => {
  const confirmAt = formatDateISO(Date.now());
  const queryClient = useQueryClient();
  const {dataAuth} = useAppSelector(state => state.auth);
  const {userId} = dataAuth;
  const accpet = useMutation({
    mutationKey: ['accpetRequest'],
    mutationFn: () =>
      requestToJoinApi.acceptRequest({
        requestId: item.requestToJoinId,
        confirmById: userId,
        confirmAt,
      }),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getJoinList'],
        });
        ShowToast('Duyệt thành công');
      }
    },
  });
  const refuse = useMutation({
    mutationKey: [' refuseRequest'],
    mutationFn: () =>
      requestToJoinApi.refuseRequest({
        requestId: item.requestToJoinId,
        confirmById: userId,
        confirmAt,
      }),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getJoinList'],
        });
        ShowToast('Duyệt thành công');
      }
    },
  });
  const deleted = useMutation({
    mutationKey: ['deleteRequest'],
    mutationFn: (requestId: string) =>
      requestToJoinApi.deleteRequest(requestId),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getJoinList'],
        });
        ShowToast('Xóa thành công');
      }
    },
  });
  const handleDeleteRequest = (requestId: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa ?', [
      {
        text: 'Đóng',
        style: 'cancel',
      },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => deleted.mutate(requestId),
      },
    ]);
  };
  const createAt = formatDateStringTimes(item.createAt);
  return (
    <RowComponent styles={[styles.wapperItem, globalStyles.shadow]} gap={12}>
      <AvatarComponent url={item.petitionerToUser.avatar} size={60} />
      <RowComponent direction="column" gap={6} flex={1}>
        <TextComponent
          text={item.petitionerToUser.fullName}
          numberOfLines={1}
        />
        <TextComponent
          text={item.petitionerToUser.email}
          numberOfLines={1}
          size={13}
          color={colors.gray}
        />
        <TextComponent
          text={`Thời gian tạo: ${createAt}`}
          size={13}
          color={colors.gray}
        />
        {item.status === 'Chưa duyệt' ? (
          <RowComponent justify="flex-end" gap={6}>
            <ButtonTextComponent
              onPress={() => accpet.mutate()}
              styles={styles.btn}
              title="Chấp nhận"
              textColor={colors.white}
            />
            <ButtonTextComponent
              onPress={() => refuse.mutate()}
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
                item.status === 'Đã chấp nhận' ? colors.green : colors.danger
              }
            />
            <RowComponent align="center">
              <TextComponent
                size={13}
                flex={1}
                text={`Đã duyệt: ${formatDateStringTimes(
                  item.confirmAt ?? Date.now(),
                )}`}
              />
              <CloseSquare
                size={22}
                color={colors.danger}
                onPress={() => handleDeleteRequest(item.requestToJoinId)}
              />
            </RowComponent>
          </RowComponent>
        )}
      </RowComponent>
    </RowComponent>
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
export default RequestJoinListScreen;
