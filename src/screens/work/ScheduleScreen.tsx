import {taskApi} from '../../apis';
import {globalStyles} from '../../assets';
import {
  CalendarComponent,
  CircleComponent,
  ContainerComponent,
  RowComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {useAppSelector} from '../../hooks';
import {TaskType} from '../../types';
import {formatDateString, getColor} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

const ScheduleScreen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const [selected, setSelected] = useState('');
  const dateSelect = new Date(selected) ?? Date.now();
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getTaskAtDateByUserId', dateSelect],
    queryFn: () => {
      if (dataAuth.userId) {
        return taskApi.getTaskByUserIdForDate(dataAuth.userId, {
          date: dateSelect,
        });
      }
    },
  });
  return (
    <ContainerComponent title="Lịch làm việc" back styles={styles.container}>
      <CalendarComponent
        onSelect={date => setSelected(date)}
        selected={selected}
      />
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.wapperNotFound}>
            <SvgNotFoundComponent
              width={150}
              height={150}
              text={`Bạn không có công việc nào trong ngày ${
                selected ? formatDateString(dateSelect) : 'hôm nay'
              }`}
            />
          </View>
        }
        keyExtractor={({taskId}) => taskId}
        renderItem={({item}) => <RenderItem task={item} />}
      />
    </ContainerComponent>
  );
};
const RenderItem = ({task}: {task: TaskType}) => {
  const navigation: any = useNavigation();
  const handlePressTask = () => {
    navigation.navigate(screens.TASKWORKDETAIL_SCREEN, {dataTask: task});
  };
  return (
    <RowComponent
      gap={7}
      direction="column"
      onPress={handlePressTask}
      key={task.taskId}
      styles={[styles.wapperTask, globalStyles.shadow]}>
      <TextComponent
        text={task.title}
        numberOfLines={1}
        font={fontFamily.semibold}
      />
      <TextComponent
        text={`Ngày tạo: ${formatDateString(task.createAt ?? Date.now())}`}
      />
      <TextComponent
        numberOfLines={2}
        text={`Mô tả: ${task.description ?? 'Không có mô tả'}`}
      />
      <TextComponent
        text={`Thời gian: ${formatDateString(
          task.startDate,
        )} - ${formatDateString(task.endDate)}`}
      />
      <RowComponent gap={8} align="center">
        <CircleComponent
          height={8}
          width={8}
          bgColor={getColor(task.statusId)}
        />
        <TextComponent text={task.status?.name} />
      </RowComponent>
    </RowComponent>
  );
};
const styles = StyleSheet.create({
  container: {paddingTop: 0},
  wapperNotFound: {
    paddingTop: 42,
  },
  wapperTask: {
    marginBottom: 24,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
  },
});
export default ScheduleScreen;
