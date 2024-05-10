import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Add, ArrowRight2, SearchNormal} from 'iconsax-react-native';
import React, {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {workplaceApi} from '../../../apis';
import {globalStyles} from '../../../assets';
import {
  ButtonTextComponent,
  ContainerAdminComponent,
  InputComponent,
  LogoComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {colors, screens} from '../../../constants';
import {useAppDedounce} from '../../../hooks';
import {WorkplaceType} from '../../../types';

const ManagerWorkplaceScreen = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  const valueSearch = useAppDedounce(search);
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getWorkplaceAll', valueSearch],
    queryFn: () =>
      workplaceApi.getAllWorkplace({search: valueSearch, limit: 10, page: 1}),
  });
  const handleAddUser = () => {
    navigation.navigate(screens.ADDWORKPLACE_SCREEN);
  };
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  return (
    <>
      <ContainerAdminComponent back title="Danh sách bộ môn">
        <FlatList
          ListHeaderComponent={
            <SectionComponent styles={styles.wapperInputSearch}>
              <InputComponent
                value={search}
                allowClear
                onChange={val => setSearch(val)}
                placeholder="Mã hoặc tên bộ môn"
                affix={
                  <SearchNormal
                    size={22}
                    color={search ? colors.primary : colors.gray5}
                  />
                }
              />
            </SectionComponent>
          }
          data={data}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={isLoading}
              onRefresh={refetch}
            />
          }
          keyExtractor={({workplaceId}) => workplaceId}
          renderItem={({item}) => <RenderItem item={item} />}
        />
        <SpaceComponent height={50} />
      </ContainerAdminComponent>
      <ButtonTextComponent
        styles={styles.btnAddUser}
        title="Thêm bộ môn"
        onPress={handleAddUser}
        affix={<Add size={18} color={colors.white} />}
        textColor={colors.white}
      />
    </>
  );
};

const RenderItem = ({item}: {item: WorkplaceType}) => {
  const navigation: any = useNavigation();
  const handleGetDetail = (workplaceId: string) => {
    navigation.navigate(screens.WORKPLACEDETAIL_SCREEN, {workplaceId});
  };
  return (
    <RowComponent
      align="center"
      gap={12}
      onPress={() => handleGetDetail(item.workplaceId)}
      styles={[globalStyles.shadow, styles.wapperRenderItem]}>
      <LogoComponent size={100} url={item.logo} />
      <RowComponent direction="column" gap={4} flex={1}>
        <TextComponent text={item.workplaceId} />
        <TextComponent text={item.name} numberOfLines={1} />
      </RowComponent>
      <ArrowRight2 size={16} color={colors.gray5} />
    </RowComponent>
  );
};
const styles = StyleSheet.create({
  btnFilter: {
    padding: 8,
    borderRadius: 8,
  },
  btnAddUser: {
    justifyContent: 'center',
    borderRadius: 8,
    position: 'absolute',
    bottom: 8,
    right: 16,
    left: 16,
  },
  wapperInputSearch: {
    marginBottom: 0,
  },
  wapperRenderItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginBottom: 16,
  },
});
export default ManagerWorkplaceScreen;
