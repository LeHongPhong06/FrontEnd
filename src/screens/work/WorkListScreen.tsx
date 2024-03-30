import {SearchNormal} from 'iconsax-react-native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../assets/styles/globalStyle';

const WorkListScreen = () => {
  const [search, setSearch] = useState('');
  const [workType, setWorkType] = useState(0);
  const listWorkType = [
    {id: 0, title: 'Tất cả', total: 13},
    {id: 1, title: 'Chưa hoàn thành', total: 5},
    {id: 2, title: 'Hoàn thành', total: 3},
    {id: 3, title: 'Quá hạn', total: 5},
  ];
  const workList: any = [
    // {
    //   id: 1,
    //   title: 'work1',
    //   description: 'desc 1',
    //   startDate: '22/12/2002',
    //   endDate: '23/12/2002',
    //   status: 'Chưa hoàn thành',
    // },
    // {
    //   id: 2,
    //   title: 'work1',
    //   description: 'desc 1',
    //   startDate: '22/12/2002',
    //   endDate: '23/12/2002',
    //   status: 'Chưa hoàn thành',
    // },
    // {
    //   id: 3,
    //   title: 'work1',
    //   description: 'desc 1',
    //   startDate: '22/12/2002',
    //   endDate: '23/12/2002',
    //   status: 'Chưa hoàn thành',
    // },
    // {
    //   id: 4,
    //   title: 'work1',
    //   description: 'desc 1',
    //   startDate: '22/12/2002',
    //   endDate: '23/12/2002',
    //   status: 'Chưa hoàn thành',
    // },
    // {
    //   id: 5,
    //   title: 'work1',
    //   description: 'desc 1',
    //   startDate: '22/12/2002',
    //   endDate: '23/12/2002',
    //   status: 'Chưa hoàn thành',
    // },
  ];
  const handlePressCategory = (id: number) => {
    setWorkType(id);
  };
  return (
    <ContainerComponent back title="Danh sách công việc">
      <SectionComponent>
        <InputComponent
          value={search}
          affix={
            <SearchNormal
              size={22}
              color={search.length > 0 ? colors.primary : colors.gray5}
            />
          }
          allowClear
          style={globalStyles.shadow}
          onChange={val => setSearch(val)}
          placeholder="Nhập tên hoặc mô tả công việc"
        />
        <FlatList
          horizontal
          keyExtractor={item => String(item.id)}
          showsHorizontalScrollIndicator={false}
          data={listWorkType}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor:
                    workType === item.id ? colors.primary : '#E8F1FF',
                },
                styles.category,
              ]}
              onPress={() => handlePressCategory(item.id)}>
              <TextComponent
                text={item.title}
                color={workType === item.id ? colors.white : colors.text}
              />
            </TouchableOpacity>
          )}
        />
        <SpaceComponent height={20} />
        <FlatList
          data={workList}
          keyExtractor={({id}) => String(id)}
          ListEmptyComponent={
            <View style={styles.wapperNotFound}>
              <SvgNotFoundComponent
                width={250}
                textSize={14}
                height={250}
                text="Không có công việc nào được tìm thấy"
              />
            </View>
          }
          renderItem={({item}) => (
            <TouchableOpacity style={styles.work}>
              <TextComponent text={item.title} />
            </TouchableOpacity>
          )}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};
const styles = StyleSheet.create({
  category: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginRight: 16,
  },
  work: {},
  wapperNotFound: {
    paddingVertical: 42,
  },
});
export default WorkListScreen;
