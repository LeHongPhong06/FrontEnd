import {TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {
  AvatarComponent,
  ButtonTextComponent,
  InputComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {ArrowRight2, SearchNormal1, UserAdd} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '../../assets/styles/globalStyle';

const TeacherList = () => {
  const navigation: any = useNavigation();
  const [search, setSearch] = useState('');
  const teacherList = [
    {
      id: 1,
      name: 'Teacher 1',
      phoneNumber: '0987654321',
      email: 'teacher1@example.com',
      avatar: '',
    },
    {
      id: 2,
      name: 'Teacher 2',
      phoneNumber: '0987654321',
      email: 'teacher2@example.com',
      avatar:
        'https://images.pexels.com/photos/20359985/pexels-photo-20359985/free-photo-of-d-c-x-ly-b-ng-vsco-v-i-cai-d-t-tr-c-a6.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      id: 3,
      name: 'Teacher 3',
      phoneNumber: '0987654321',
      email: 'teacher3@example.com',
      avatar:
        'https://images.pexels.com/photos/20359985/pexels-photo-20359985/free-photo-of-d-c-x-ly-b-ng-vsco-v-i-cai-d-t-tr-c-a6.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      id: 4,
      name: 'Teacher 4',
      phoneNumber: '0987654321',
      email: 'teacher4@example.com',
      avatar:
        'https://images.pexels.com/photos/20359985/pexels-photo-20359985/free-photo-of-d-c-x-ly-b-ng-vsco-v-i-cai-d-t-tr-c-a6.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      id: 5,
      name: 'Teacher 5',
      phoneNumber: '0987654321',
      email: 'teacher5@example.com',
      avatar: '',
    },
    {
      id: 6,
      name: 'Teacher 6',
      phoneNumber: '0987654321',
      email: 'teacher6@example.com',
      avatar:
        'https://images.pexels.com/photos/20359985/pexels-photo-20359985/free-photo-of-d-c-x-ly-b-ng-vsco-v-i-cai-d-t-tr-c-a6.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
      id: 7,
      name: 'Teacher 7',
      phoneNumber: '0987654321',
      email: 'teacher7@example.com',
      avatar: '',
    },
  ];
  const handleOnPressItem = () => {
    navigation.navigate(screens.INFOTEARCHERDETAIL_SCREEN);
  };
  const handleAddTeacher = () => {
    navigation.navigate(screens.ADDTEACHER_SCREEN);
  };
  return (
    <RowComponent styles={[styles.scrollContainer]}>
      <FlatList
        data={teacherList}
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
        keyExtractor={({id}) => String(id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.wapperItemTeacher, globalStyles.shadow]}
            onPress={handleOnPressItem}>
            <RowComponent gap={18} align="center">
              <AvatarComponent url={item.avatar} size={62} />
              <RowComponent direction="column" gap={3} flex={1}>
                <TextComponent text={item.name} font={fontFamily.semibold} />
                <RowComponent>
                  <TextComponent
                    text={item.email}
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
      <ButtonTextComponent
        onPress={handleAddTeacher}
        title="Mời giảng viên"
        styles={styles.btnAdd}
        textColor={colors.white}
        affix={<UserAdd size={18} color={colors.white} />}
      />
    </RowComponent>
  );
};
const styles = StyleSheet.create({
  btnAdd: {
    paddingHorizontal: 9,
    paddingVertical: 8,
    position: 'absolute',
    bottom: 48,
    right: -10,
  },
  inputSearch: {
    marginBottom: 12,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 38,
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
