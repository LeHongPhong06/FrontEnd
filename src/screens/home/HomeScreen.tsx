import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Filter} from 'iconsax-react-native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {taskApi} from '../../apis';
import {globalStyles} from '../../assets';
import {
  ButtonTextComponent,
  CircleComponent,
  ContainerComponent,
  PieChartComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {useAppSelector} from '../../hooks';
import {TaskType} from '../../types';
import {formatDateString, getColor} from '../../utils';

const HomeScreen = ({navigation}: any) => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const {userId} = dataAuth;
  const {data} = useQuery({
    queryKey: ['getTasksToday'],
    queryFn: () => taskApi.getTasksToday(userId),
  });
  const handleFilter = () => {
    navigation.navigate(screens.STATISTICAL_SCREEN);
  };
  const dataChart = [
    {
      name: 'Chưa hoàn thành',
      population: 12,
      color: colors.blue,
      legendFontColor: colors.text,
    },
    {
      name: 'Đã hoàn thành',
      population: 5,
      color: colors.green,
      legendFontColor: colors.text,
    },
    {
      name: 'Trễ hạn',
      population: 3,
      color: colors.danger,
      legendFontColor: colors.text,
    },
  ];
  return (
    <ContainerComponent>
      <SectionComponent>
        <RowComponent align="center">
          <TextComponent
            text={'Thống kê công việc'}
            color={colors.gray}
            size={13}
            flex={1}
          />
          <ButtonTextComponent
            title="Lọc"
            textColor={colors.white}
            styles={styles.btnFilter}
            onPress={handleFilter}
            affix={<Filter size={16} color={colors.white} />}
          />
        </RowComponent>
        <SpaceComponent height={8} />
        <RowComponent justify="center">
          <PieChartComponent data={dataChart} />
        </RowComponent>
        <SpaceComponent height={12} />
        <TextComponent text={'Việc cần làm trong ngày hôm nay'} />
      </SectionComponent>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.wapperNotFound}>
            <SvgNotFoundComponent
              width={150}
              textSize={12}
              height={150}
              text="Không có làm nào trong ngày hôm nay"
            />
          </View>
        }
        keyExtractor={({taskId}) => taskId}
        renderItem={({item}) => <RenderItem item={item} />}
      />
    </ContainerComponent>
  );
};
const RenderItem = ({item}: {item: TaskType}) => {
  const navigation: any = useNavigation();
  const handlePressTaskDetail = () => {
    navigation.navigate(screens.TASKWORKDETAIL_SCREEN, {
      taskId: item.taskId,
    });
  };
  return (
    <RowComponent
      gap={7}
      key={item.taskId}
      direction="column"
      styles={[styles.wapperTask, globalStyles.shadow]}
      onPress={handlePressTaskDetail}>
      <TextComponent
        text={item.title}
        numberOfLines={1}
        font={fontFamily.semibold}
      />
      <TextComponent
        numberOfLines={2}
        text={`Mô tả: ${item.description ?? 'Trống'}`}
      />
      <TextComponent
        text={`Thời gian: ${formatDateString(
          item.startDate,
        )} - ${formatDateString(item.endDate)}`}
      />
      <RowComponent gap={8} align="center">
        <CircleComponent
          height={8}
          width={8}
          bgColor={getColor(item.statusId)}
        />
        <TextComponent text={item.status?.name} />
      </RowComponent>
    </RowComponent>
  );
};
const styles = StyleSheet.create({
  wapperNotFound: {
    paddingVertical: 42,
  },
  btnFilter: {
    padding: 6,
    borderRadius: 8,
  },
  wapperTask: {
    marginHorizontal: 16,
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
});
export default HomeScreen;
