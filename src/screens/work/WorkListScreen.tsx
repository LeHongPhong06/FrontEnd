import {projectApi} from '../../apis';
import {globalStyles} from '../../assets';
import {
  CircleComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {useAppDedounce, useAppSelector} from '../../hooks';
import {formatDateString, getColor} from '../../utils';
import {useQuery} from '@tanstack/react-query';
import {ArrowRight2, SearchNormal} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const WorkListScreen = ({navigation}: any) => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const [search, setSearch] = useState('');
  const [workType, setWorkType] = useState('');
  const titleProject = useAppDedounce(search);
  const listWorkType = [
    {id: '', title: 'Tất cả'},
    {id: 'unfinished', title: 'Chưa hoàn thành'},
    {id: 'finished', title: 'Hoàn thành'},
    {id: 'completedlate', title: 'Hoàn thành trễ hạn'},
    {id: 'late', title: 'Trễ hạn'},
  ];
  const page = 1;
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getProjectList', dataAuth.userId, titleProject, page, workType],
    queryFn: () => {
      if (dataAuth.userId) {
        return projectApi.getProjectByUserId(
          dataAuth.userId,
          search,
          page,
          workType,
        );
      }
    },
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
          placeholder="Tiêu đề công việc"
        />
      </SectionComponent>
      <SectionComponent>
        <FlatList
          horizontal
          keyExtractor={item => String(item.id)}
          showsHorizontalScrollIndicator={false}
          data={listWorkType}
          renderItem={({item}) => {
            const isSelected = workType === item.id;
            return (
              <TouchableOpacity
                style={[
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    backgroundColor: isSelected ? colors.primary : '#E8F1FF',
                  },
                  styles.category,
                ]}
                onPress={() => handlePressCategory(item.id)}>
                <TextComponent
                  text={item.title}
                  color={isSelected ? colors.white : colors.text}
                />
              </TouchableOpacity>
            );
          }}
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
            gap={24}
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
                text={`Thời gian: ${formatDateString(
                  item.startDate,
                )} -  ${formatDateString(item.endDate)}`}
              />
              <RowComponent gap={8} align="center">
                <CircleComponent
                  height={8}
                  width={8}
                  bgColor={getColor(item.status.statusId)}
                />
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
