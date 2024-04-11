import {useNavigation} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {ArrowRight2, SearchNormal1, UserAdd} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {workplaceApi} from '../../apis';
import {globalStyles} from '../../assets/styles/globalStyle';
import {
  AvatarComponent,
  ButtonTextComponent,
  InputComponent,
  RowComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {useAppSelector} from '../../hooks/useRedux';

const TeacherList = () => {
  const navigation: any = useNavigation();
  const {dataAuth} = useAppSelector(state => state.auth);
  const initialQuery = {
    search: '',
    page: 1,
    limit: 10,
  };
  const [query, setQuery] = useState(initialQuery);
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getTeacherListByWorkplaceId'],
    queryFn: () => {
      if (dataAuth.workplaceId) {
        return workplaceApi.getTearcherList(dataAuth.workplaceId, query);
      }
    },
  });
  const handleChangeQuery = (id: string, val: string | number) => {
    const dataChange: any = {...query};
    dataChange[`${id}`] = val;
    setQuery(dataChange);
  };
  const handleOnPressItem = (userId: string) => {
    navigation.navigate(screens.INFOTEARCHERDETAIL_SCREEN, {userId});
  };
  const handleAddTeacher = () => {
    navigation.navigate(screens.ADDTEACHER_SCREEN);
  };
  return (
    <>
      <RowComponent styles={[styles.scrollContainer]}>
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
                  color={
                    query.search.length > 0 ? colors.primary : colors.gray5
                  }
                />
              }
              allowClear
              value={query.search}
              onChange={val => handleChangeQuery('search', val)}
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
          renderItem={({item}) => (
            <TouchableOpacity
              style={[styles.wapperItemTeacher, globalStyles.shadow]}
              onPress={() => handleOnPressItem(item.userId)}>
              <RowComponent gap={18} align="center">
                <AvatarComponent url={item.avatar} size={62} />
                <RowComponent direction="column" gap={3} flex={1}>
                  <TextComponent
                    text={item.fullName}
                    font={fontFamily.semibold}
                  />
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
      </RowComponent>
      <ButtonTextComponent
        onPress={handleAddTeacher}
        title="Mời giảng viên"
        styles={styles.btnAdd}
        textColor={colors.white}
        affix={<UserAdd size={18} color={colors.white} />}
      />
    </>
  );
};
const styles = StyleSheet.create({
  btnAdd: {
    paddingHorizontal: 9,
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    right: 5,
  },
  inputSearch: {
    marginBottom: 12,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 38,
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
    shadowColor: '#535353',
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
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
