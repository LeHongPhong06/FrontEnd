import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import uuid from 'react-native-uuid';
import {taskApi, userApi} from '../../apis';
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
import {useAppSelector} from '../../hooks';
import {UserType} from '../../types';
import {AlertError, ShowToast, isDateSameOrAfter} from '../../utils';

const AddTaskWorkDetailScreen = ({navigation, route}: any) => {
  const queryClient = useQueryClient();
  const {userIdList, projectId} = route.params;
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
    projectId: projectId,
    performById: '',
  };
  const [task, setTask] = useState(initialState);
  const [isDisable, setIsDisable] = useState(false);
  const isDateCorrect = isDateSameOrAfter(task.endDate, task.startDate);
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
  const handleAddTask = useMutation({
    mutationKey: ['addTask'],
    mutationFn: () => taskApi.createTask(task),
    onSuccess: async res => {
      if (res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['getDetailProject', projectId],
          exact: true,
        });
        navigation.goBack();
        ShowToast('Thêm việc làm thành công');
      }
    },
  });
  useEffect(() => {
    if (!isDateCorrect) {
      setIsDisable(true);
      AlertError('Ngày bắt đầu công việc không thể sau ngày kết thúc');
    } else {
      setIsDisable(false);
    }
  }, [isDateCorrect]);

  if (!projectId) {
    return null;
  }
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  const handleChangeValueTask = (id: string, value: string | Date) => {
    const dataChangeValue: any = {...task};
    dataChangeValue[`${id}`] = value;
    setTask(dataChangeValue);
  };
  return (
    <>
      <ContainerComponent back title="Tạo việc làm">
        <SectionComponent>
          <InputComponent
            required
            lable="Tiêu đề"
            placeholder="Nhập tiêu đề công việc"
            value={task.title}
            onChange={val => handleChangeValueTask('title', val)}
          />
          <InputComponent
            placeholder="Mô tả công việc"
            lable="Mô tả"
            value={task.description}
            onChange={val => handleChangeValueTask('description', val)}
          />
          <PriorityComponent
            required
            label="Độ ưu tiên"
            value={task.priority}
            onSelect={val => handleChangeValueTask('priority', val)}
          />
          <RowComponent align="center" gap={20}>
            <DatePickerComponent
              required
              type="date"
              lable="Ngày bắt đầu"
              placeholder="Chọn ngày"
              value={task.startDate}
              onSelect={date => handleChangeValueTask('startDate', date)}
            />
            <DatePickerComponent
              required
              type="date"
              lable="Ngày kết thúc"
              placeholder="Chọn ngày"
              value={task.endDate}
              onSelect={date => handleChangeValueTask('endDate', date)}
            />
          </RowComponent>
          <DropdownSingleComponent
            required
            userList={data}
            label="Người đảm nhiệm"
            value={task.performById}
            onSeclect={val => handleChangeValueTask('performById', val)}
          />
        </SectionComponent>
      </ContainerComponent>
      <ButtonComponent
        title="Thêm việc làm"
        disable={isDisable}
        onPress={() => handleAddTask.mutate()}
        textColor={colors.white}
        styles={styles.btnAddTask}
        textStyles={styles.textBtnAddTask}
      />
      <ModalLoading isVisable={handleAddTask.isPending} />
    </>
  );
};
const styles = StyleSheet.create({
  btnAddTask: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    left: 16,
  },
  textBtnAddTask: {
    textAlign: 'center',
  },
});
export default AddTaskWorkDetailScreen;
