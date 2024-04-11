import {useQuery} from '@tanstack/react-query';
import {format} from 'date-fns';
import {ArrowRight2, SearchNormal} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {projectApi} from '../../apis/project';
import {globalStyles} from '../../assets/styles/globalStyle';
import {
  CircleComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';
import {fontFamily, screens} from '../../constants';
import {colors} from '../../constants/colors';

const WorkListScreen = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  const [workType, setWorkType] = useState('Tất cả');
  const [page, setPage] = useState(1);
  const listWorkType = [
    {id: 0, title: 'Tất cả'},
    {id: 1, title: 'Chưa hoàn thành'},
    {id: 2, title: 'Hoàn thành'},
    {id: 3, title: 'Quá hạn'},
  ];
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getProjectList', search, page],
    queryFn: () => projectApi.getAll(search, page),
  });
  const handlePressCategory = (type: string) => {
    setWorkType(type);
  };
  const handlePressWorkItem = (projectId: string) => {
    if (projectId) {
      navigation.navigate(screens.WORKDETAIL_SCREEN, {projectId});
    }
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
          style={[globalStyles.shadow, styles.input]}
          onChange={val => setSearch(val)}
          placeholder="Nhập tên hoặc mô tả công việc"
        />
      </SectionComponent>
      <SectionComponent>
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
                    workType === item.title ? colors.primary : '#E8F1FF',
                },
                styles.category,
              ]}
              onPress={() => handlePressCategory(item.title)}>
              <TextComponent
                text={item.title}
                color={workType === item.title ? colors.white : colors.text}
              />
            </TouchableOpacity>
          )}
        />
      </SectionComponent>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        }
        keyExtractor={({projectId}) => String(projectId)}
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
          <RowComponent
            onPress={() => handlePressWorkItem(item.projectId ?? '')}
            styles={[styles.work, globalStyles.shadow]}
            align="center"
            gap={16}
            justify="space-between">
            <RowComponent direction="column" gap={4}>
              <TextComponent
                text={`Tiêu đề: ${item.title}`}
                numberOfLines={2}
                font={fontFamily.semibold}
              />
              <TextComponent
                text={`Mô tả: ${item.description}`}
                numberOfLines={2}
              />
              <RowComponent align="center" gap={4}>
                <TextComponent text={'Độ ưu tiên:'} />
                <TextComponent text={item.priority} />
              </RowComponent>
              <TextComponent
                text={`Thời gian: ${format(
                  item.startDate,
                  'dd/MM/yyyy',
                )} -  ${format(item.endDate, 'dd/MM/yyyy')}`}
              />
              <RowComponent gap={8} align="center">
                <CircleComponent height={8} width={8} bgColor={colors.blue} />
                <TextComponent text={item.status.name} />
              </RowComponent>
            </RowComponent>
            <ArrowRight2 size={16} color={colors.gray2} />
          </RowComponent>
        )}
      />
    </ContainerComponent>
  );
};
const styles = StyleSheet.create({
  input: {
    marginBottom: 0,
  },
  category: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginRight: 14,
  },
  work: {
    marginTop: 4,
    marginBottom: 16,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  wapperNotFound: {
    paddingVertical: 42,
  },
});
export default WorkListScreen;
