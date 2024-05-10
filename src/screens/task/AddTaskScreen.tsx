import {useQuery} from '@tanstack/react-query';
import {formatISO} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import uuid from 'react-native-uuid';
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
import {useAppDispatch, useAppSelector} from '../../hooks';
import {createTask} from '../../redux/silces/taskSlice';
import {UserType} from '../../types';
import {AlertError, isDateSameOrAfter} from '../../utils';
const AddTaskScreen = ({navigation, route}: any) => {
  const {userIdList} = route.params;
  const dispatch = useAppDispatch();
  const {dataAuth} = useAppSelector(state => state.auth);
  let taskId = uuid.v4().toString();
  const initialState = {
    taskId,
    title: '',
    description: '',
    statusId: 'unfinished',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'Không',
    performById: '',
  };
  const [task, setTask] = useState(initialState);
  const [isDisable, setIsDisable] = useState(false);
  const isDateCorrect = isDateSameOrAfter(task.endDate, task.startDate);
  useEffect(() => {
    if (!isDateCorrect) {
      setIsDisable(true);
      AlertError('Ngày bắt đầu công việc không thể sau ngày kết thúc');
    } else {
      setIsDisable(false);
    }
  }, [isDateCorrect]);
  const {data, isLoading} = useQuery({
    queryKey: ['getUserListByWorkplaceId'],
    queryFn: async () => {
      if (dataAuth.workplaceId) {
        const res = await userApi.getUserAllByWorkplaceById(
          dataAuth.workplaceId,
        );
        const userList: UserType[] = [];
        userIdList?.forEach((item: any) => {
          res.forEach((user: UserType) => {
            if (item.userId === user.userId) {
              userList.push(user);
            }
          });
        });
        return userList;
      }
    },
  });
  const handleChangeValues = (id: string, value: string | Date | number) => {
    const dataChangeValue: any = {...task};
    dataChangeValue[`${id}`] = value;
    setTask(dataChangeValue);
  };
  const handleAddTask = () => {
    const startDate = formatISO(task.startDate);
    const endDate = formatISO(task.endDate);
    const dataAddTask = {...task, startDate, endDate};
    dispatch(createTask(dataAddTask));
    navigation.goBack();
  };
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  return (
    <ContainerComponent back title="Thêm công việc">
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
          title="Thêm công việc"
          disable={isDisable}
          onPress={handleAddTask}
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
export default AddTaskScreen;
