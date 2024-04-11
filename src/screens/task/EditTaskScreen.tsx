import {useQuery} from '@tanstack/react-query';
import {formatISO} from 'date-fns';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {userApi} from '../../apis';
import {
  ButtonComponent,
  ContainerComponent,
  DatePickerComponent,
  DropdownSingleComponent,
  InputComponent,
  ModalLoading,
  PriorityComponent,
  RowComponent,
  SectionComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {updateTask} from '../../redux/silces/taskSlice';
dayjs.extend(isSameOrAfter);
const EditTaskScreen = ({navigation, route}: any) => {
  const {dataTask} = route.params;
  const initialValues = {
    ...dataTask,
    startDate: new Date(dataTask.startDate),
    endDate: new Date(dataTask.endDate),
  };
  const dispatch = useAppDispatch();
  const {dataAuth} = useAppSelector(state => state.auth);
  const [task, setTask] = useState(initialValues);
  const [isDisable, setIsDisable] = useState(false);
  const {data, isLoading} = useQuery({
    queryKey: ['getUserListByWorkplaceId'],
    queryFn: () => {
      if (dataAuth.workplaceId) {
        return userApi.getUserAllByWorkplaceById(dataAuth.workplaceId);
      }
    },
  });
  const isDateCorrect = dayjs(task.endDate).isSameOrAfter(task.startDate);
  useEffect(() => {
    if (!isDateCorrect) {
      setIsDisable(true);
      Alert.alert('Lỗi', 'Ngày bắt đầu công việc không thể sau ngày kết thúc', [
        {text: 'Đóng', style: 'cancel'},
      ]);
    } else {
      setIsDisable(false);
    }
  }, [isDateCorrect]);
  const handleChangeValues = (id: string, value: string | Date | number) => {
    const dataChangeValue: any = {...task};
    dataChangeValue[`${id}`] = value;
    setTask(dataChangeValue);
  };
  const handleUpdateTask = () => {
    const startDate = formatISO(task.startDate);
    const endDate = formatISO(task.endDate);
    const dataUpdateTask = {...task, startDate, endDate};
    dispatch(updateTask(dataUpdateTask));
    navigation.goBack();
  };
  if (!dataTask) {
    return null;
  }
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  return (
    <ContainerComponent back title="Chỉnh sửa công việc">
      <SectionComponent>
        <InputComponent
          allowClear
          required
          placeholder="Nhập tên công việc"
          value={task.title}
          lable="Tên công việc"
          onChange={val => handleChangeValues('title', val)}
        />
        <InputComponent
          allowClear
          placeholder="Nhập mô tả công việc"
          value={task.description}
          lable="Mô tả"
          onChange={val => handleChangeValues('description', val)}
        />
        <PriorityComponent
          required
          label="Độ ưu tiên"
          value={task.priority}
          onSelect={val => handleChangeValues('priority', val)}
        />
        <RowComponent align="center" gap={20}>
          <DatePickerComponent
            required
            type="date"
            placeholder="Chọn ngày"
            value={task.startDate}
            lable="Ngày bắt đầu"
            onSelect={val => handleChangeValues('startDate', val)}
          />
          <DatePickerComponent
            required
            type="date"
            placeholder="Chọn ngày"
            value={task.endDate}
            lable="Ngày kết thúc"
            onSelect={val => handleChangeValues('endDate', val)}
          />
        </RowComponent>
        <DropdownSingleComponent
          required
          label="Người đảm nhiệm"
          userList={data}
          value={task.performById}
          onSeclect={val => handleChangeValues('performById', val)}
        />
        <ButtonComponent
          title="Chỉnh sửa công việc"
          disable={isDisable}
          onPress={handleUpdateTask}
          textColor={colors.white}
          textStyles={styles.textBtnAddTask}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};
const styles = StyleSheet.create({
  textBtnAddTask: {
    textAlign: 'center',
  },
});
export default EditTaskScreen;
