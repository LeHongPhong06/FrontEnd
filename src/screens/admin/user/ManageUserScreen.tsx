import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Add, ArrowRight2, SearchNormal, Setting5} from 'iconsax-react-native';
import React, {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {userApi} from '../../../apis';
import {globalStyles} from '../../../assets';
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerAdminComponent,
  InputComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {colors, fontFamily, screens} from '../../../constants';
import {UserType} from '../../../types';
import {getRoleName} from '../../../utils';

const ManageUserScreen = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getUserAll'],
    queryFn: () => userApi.getAll(),
  });
  const handleAddUser = () => {
    navigation.navigate(screens.ADDUSER_SCREEN);
  };
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  return (
    <>
      <ContainerAdminComponent>
        <FlatList
          ListHeaderComponent={
            <SectionComponent styles={styles.wapperInputSearch}>
              <InputComponent
                value={search}
                onChange={val => setSearch(val)}
                placeholder="Họ và tên hoặc email"
                affix={
                  <SearchNormal
                    size={22}
                    color={search ? colors.primary : colors.gray5}
                  />
                }
                suffix={
                  <ButtonTextComponent
                    styles={styles.btnFilter}
                    onPress={() => {}}
                    affix={<Setting5 size={18} color={colors.white} />}
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
          keyExtractor={({userId}) => userId}
          renderItem={({item}) => <RenderItem item={item} />}
        />
        <SpaceComponent height={50} />
      </ContainerAdminComponent>
      <ButtonTextComponent
        styles={styles.btnAddUser}
        title="Thêm người dùng"
        onPress={handleAddUser}
        affix={<Add size={18} color={colors.white} />}
        textColor={colors.white}
      />
    </>
  );
};

const RenderItem = ({item}: {item: UserType}) => {
  const navigation: any = useNavigation();
  const handlePressDetail = (userId: string) => {
    navigation.navigate(screens.USERDETAIL_SCREEN, {userId});
  };
  return (
    <RowComponent
      gap={16}
      onPress={() => handlePressDetail(item.userId)}
      styles={[globalStyles.shadow, styles.wapperRenderItem]}>
      <AvatarComponent size={55} url={item.avatar} />
      <RowComponent flex={1} align="center">
        <RowComponent direction="column" gap={4} flex={1}>
          <TextComponent text={item.fullName} font={fontFamily.semibold} />
          <TextComponent text={item.email} numberOfLines={1} />
          <TextComponent text={item.phoneNumber} />
          <TextComponent
            text={item.workplace?.name ?? 'Chưa tham gia bộ môn'}
          />
          <TextComponent text={getRoleName(item.roleId)} />
        </RowComponent>
        <ArrowRight2 size={16} color={colors.gray5} />
      </RowComponent>
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
export default ManageUserScreen;
