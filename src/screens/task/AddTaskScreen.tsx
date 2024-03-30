import {formatISO} from 'date-fns';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import uuid from 'react-native-uuid';
import {
  ButtonComponent,
  ContainerComponent,
  DropdownSingleComponent,
  InputComponent,
  PriorityComponent,
  RowComponent,
  SectionComponent,
} from '../../components';
import DatePickerComponent from '../../components/DateTimePickerComponent';
import {colors} from '../../constants';
import {useAppDispatch} from '../../hooks/useRedux';
import {createTask} from '../../redux/silces/taskSlice';
dayjs.extend(isSameOrAfter);
const AddTaskScreen = ({navigation, route}: any) => {
  const {userIdList} = route.params;
  const dispatch = useAppDispatch();
  let taskId = uuid.v4().toString();
  const initialState = {
    taskId,
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'Không',
    projectId: '',
    performById: 0,
    createById: '',
    statusId: '',
  };
  const [task, setTask] = useState(initialState);
  const [isDisable, setIsDisable] = useState(false);
  const [userList, setUserList] = useState([
    {
      id: 1,
      name: 'Phong 1',
      email: 'lehongphong1@gmail.com',
    },
    {
      id: 2,
      name: 'Phong 2',
      email: 'lehongphong2@gmail.com',
    },
    {
      id: 3,
      name: 'Phong 3',
      email: 'lehongphong3@gmail.com',
    },
  ]);
  const isDateCorrect = dayjs(task.endDate).isSameOrAfter(task.startDate);
  // useEffect(() => {
  //   if (userIdList) {
  //     userIdList.map(async userId => {
  //       const user = await get
  //     });
  //   }
  // }, [userIdList]);
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
    const data: any = {...task};
    data[`${id}`] = value;
    setTask(data);
  };
  const handleAddTask = () => {
    const startDate = formatISO(task.startDate);
    const endDate = formatISO(task.endDate);
    const data = {...task, startDate, endDate};
    dispatch(createTask(data));
    navigation.goBack();
  };
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
          userList={userList}
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
