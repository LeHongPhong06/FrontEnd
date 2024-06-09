import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {ArrowRight2, SearchNormal1} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {workplaceApi} from '../../apis';
import {globalStyles} from '../../assets';
import {
  AvatarComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {useAppDedounce, useAppSelector} from '../../hooks';

const TeacherList = () => {
  const navigation: any = useNavigation();
  const {dataAuth} = useAppSelector(state => state.auth);
  const isLeader = dataAuth.roleId === 'Leader';
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const valueSearch = useAppDedounce(search);
  const {data, isLoading, refetch} = useQuery({
    queryKey: [
      'getTeacherListByWorkplaceId',
      dataAuth.workplaceId,
      page,
      10,
      valueSearch,
    ],
    queryFn: () => {
      if (dataAuth.workplaceId) {
        return workplaceApi.getTearcherList(
          dataAuth.workplaceId,
          page,
          10,
          valueSearch,
        );
      }
    },
  });
  const handleOnPressItem = (userId: string) => {
    navigation.navigate(screens.INFOTEARCHERDETAIL_SCREEN, {userId});
  };
  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          colors={[colors.primary]}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      }
      ListHeaderComponent={
        <InputComponent
          style={[styles.inputSearch]}
          placeholder="Nhập tên hoặc email giảng viên"
          affix={
            <SearchNormal1
              size={22}
              color={search.length > 0 ? colors.primary : colors.gray5}
            />
          }
          allowClear
          value={search}
          onChange={val => setSearch(val)}
        />
      }
      keyExtractor={({userId}) => String(userId)}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.wapperNotFound}>
          <SvgNotFoundComponent
            width={250}
            textSize={14}
            height={250}
            text="Không có giảng viên nào trong bộ môn"
          />
        </View>
      }
      ListFooterComponent={<SpaceComponent height={isLeader ? 100 : 50} />}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[styles.wapperItemTeacher, globalStyles.shadow]}
          onPress={() => handleOnPressItem(item.userId)}>
          <RowComponent gap={18} align="center">
            <AvatarComponent url={item.avatar} size={62} />
            <RowComponent direction="column" gap={3} flex={1}>
              <TextComponent text={item.fullName} font={fontFamily.semibold} />
              <RowComponent>
                <TextComponent
                  text={item.email}
                  numberOfLines={1}
                  size={12}
                  color={colors.gray4}
                />
              </RowComponent>
              <TextComponent
                text={item.phoneNumber}
                size={12}
                color={colors.gray4}
              />
            </RowComponent>
            <ArrowRight2 color={colors.gray5} size={16} />
          </RowComponent>
        </TouchableOpacity>
      )}
    />
  );
};
const styles = StyleSheet.create({
  inputSearch: {
    marginBottom: 12,
  },
  wapperNotFound: {
    paddingVertical: 42,
  },
  wapperItemTeacher: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  imageAvatar: {
    width: 65,
    height: 65,
    resizeMode: 'cover',
    borderRadius: 999,
  },
});
export default TeacherList;
