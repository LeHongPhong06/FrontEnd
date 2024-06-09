import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {statisticApi} from '../../apis';
import {globalStyles} from '../../assets';
import {
  ButtonTextComponent,
  CircleComponent,
  ContainerComponent,
  DatePickerComponent,
  ModalLoading,
  PieChartComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {useAppSelector} from '../../hooks';
import {TaskType} from '../../types';
import {
  AlertError,
  formatDateString,
  getColor,
  isDateSameOrBefore,
} from '../../utils';

const StatisticalScreen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const [disableFilter, setDisableFilter] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState<TaskType[]>([]);
  const [taskLate, setTaskLate] = useState<TaskType[]>([]);
  const [taskIncompleted, setTaskIncompleted] = useState<TaskType[]>([]);
  const [taskCompletedLate, setTaskCompletedLate] = useState<TaskType[]>([]);
  const [payload, setPayload] = useState({
    userId: dataAuth.userId,
    startDate: new Date(),
    endDate: new Date(),
  });
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    const isDateCorrect = isDateSameOrBefore(
      payload.startDate,
      payload.endDate,
    );
    if (isDateCorrect) {
      setDisableFilter(false);
    } else {
      setDisableFilter(true);
      AlertError('Ngày bắt đầu không thể sau ngày kết thúc');
    }
  }, [payload.startDate, payload.endDate]);
  const filter = useMutation({
    mutationKey: ['statisticTask'],
    mutationFn: () => statisticApi.getStatisticAboutDate(payload),
    onSuccess: res => {
      if (res.success === true) {
        setDataChart(res.data.chart);
        setTaskCompleted(res.data.taskList.finished);
        setTaskIncompleted(res.data.taskList.unfinished);
        setTaskLate(res.data.taskList.late);
        setTaskCompletedLate(res.data.taskList.completedlate);
      } else {
        AlertError(res.message);
      }
    },
  });
  const handleChangeTime = (id: string, val: Date) => {
    const data: any = {...payload};
    data[`${id}`] = val;
    setPayload(data);
  };
  return (
    <>
      <ContainerComponent
        back
        title="Thống kê"
        isScroll
        styles={styles.container}>
        <SectionComponent>
          <RowComponent align="center" gap={16}>
            <DatePickerComponent
              type="date"
              lable="Từ"
              value={payload.startDate}
              onSelect={date => handleChangeTime('startDate', date)}
            />
            <DatePickerComponent
              type="date"
              lable="Đến"
              value={payload.endDate}
              onSelect={date => handleChangeTime('endDate', date)}
            />
          </RowComponent>
          {dataChart.length > 0 && <PieChartComponent data={dataChart} />}
          <SpaceComponent height={16} />
          {taskCompleted.length > 0 && (
            <RowComponent gap={12} direction="column">
              <RowComponent align="center" gap={12}>
                <TextComponent text={'Công việc đã hoàn thành'} />
                <CircleComponent width={18} height={18} bgColor={colors.green}>
                  <TextComponent
                    text={taskCompleted.length}
                    size={10}
                    color={colors.white}
                  />
                </CircleComponent>
              </RowComponent>
              {taskCompleted.map((item: TaskType) => (
                <TaskItem data={item} key={item.taskId} />
              ))}
              <SpaceComponent height={2} />
            </RowComponent>
          )}
          {taskIncompleted.length > 0 && (
            <RowComponent gap={12} direction="column">
              <RowComponent align="center" gap={12}>
                <TextComponent text={'Công việc chưa hoàn thành'} />
                <CircleComponent width={18} height={18} bgColor={colors.blue}>
                  <TextComponent
                    text={taskIncompleted.length}
                    size={10}
                    color={colors.white}
                  />
                </CircleComponent>
              </RowComponent>
              {taskIncompleted.map((item: TaskType) => (
                <TaskItem data={item} key={item.taskId} />
              ))}
              <SpaceComponent height={2} />
            </RowComponent>
          )}
          {taskLate.length > 0 && (
            <RowComponent gap={12} direction="column">
              <RowComponent align="center" gap={12}>
                <TextComponent text={'Công việc trễ hạn'} />
                <CircleComponent width={18} height={18} bgColor={colors.danger}>
                  <TextComponent
                    text={taskLate.length}
                    size={10}
                    color={colors.white}
                  />
                </CircleComponent>
              </RowComponent>
              {taskLate.map((item: TaskType) => (
                <TaskItem data={item} key={item.taskId} />
              ))}
              <SpaceComponent height={2} />
            </RowComponent>
          )}
          {taskCompletedLate.length > 0 && (
            <RowComponent gap={12} direction="column">
              <RowComponent align="center" gap={12}>
                <TextComponent text={'Công việc hoàn thành trễ hạn'} />
                <CircleComponent width={18} height={18} bgColor={colors.yellow}>
                  <TextComponent
                    text={taskCompletedLate.length}
                    size={10}
                    color={colors.text}
                  />
                </CircleComponent>
              </RowComponent>
              {taskCompletedLate.map((item: TaskType) => (
                <TaskItem data={item} key={item.taskId} />
              ))}
              <SpaceComponent height={2} />
            </RowComponent>
          )}
        </SectionComponent>
      </ContainerComponent>
      <ButtonTextComponent
        title="Lọc"
        disable={disableFilter}
        textColor={colors.white}
        onPress={() => filter.mutate()}
        styles={styles.btnFilter}
      />
      <ModalLoading isVisable={filter.isPending} />
    </>
  );
};
const TaskItem = ({data}: {data: TaskType}) => {
  const navigation: any = useNavigation();
  const handlePressTaskDetail = (taskId: string) => {
    navigation.navigate(screens.TASKWORKDETAIL_SCREEN, {
      taskId,
    });
  };
  return (
    <RowComponent
      align="center"
      justify="space-between"
      onPress={() => handlePressTaskDetail(data.taskId)}
      styles={[styles.wapperTask, globalStyles.shadow]}>
      <RowComponent direction="column" gap={7} flex={1}>
        <TextComponent
          text={data.title}
          numberOfLines={1}
          font={fontFamily.semibold}
        />
        <TextComponent text={`Độ ưu tiên: ${data.priority}`} />
        <TextComponent text={`Mô tả: ${data.description ?? 'Trống'}`} />
        <TextComponent
          text={`Người đảm nhiệm: ${data.userPerformTask?.fullName}`}
        />
        <RowComponent align="center" gap={4}>
          <TextComponent
            text={`Liên hệ: ${
              data.userPerformTask?.phoneNumber ?? 'Chưa cập nhật'
            }`}
          />
        </RowComponent>
        <RowComponent align="center" gap={4}>
          <TextComponent
            text={`Email: ${data.userPerformTask?.email ?? 'Chưa cập nhật'}`}
          />
        </RowComponent>
        <TextComponent
          text={`Thời gian: ${formatDateString(
            data.startDate,
          )} - ${formatDateString(data.endDate)}`}
        />
        <RowComponent gap={8} align="center">
          <CircleComponent
            height={8}
            width={8}
            bgColor={getColor(data.statusId)}
          />
          <TextComponent text={data.status?.name} />
        </RowComponent>
      </RowComponent>
    </RowComponent>
  );
};
const styles = StyleSheet.create({
  btnFilter: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
  },
  wapperSelect: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.gray6,
  },
  itemSelect: {
    borderRadius: 6,
    paddingVertical: 8,
  },
  wapperTask: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
  },
  container: {
    paddingBottom: 42,
  },
});
export default StatisticalScreen;
