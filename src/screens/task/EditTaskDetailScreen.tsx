import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
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
import {
  AlertError,
  ShowToast,
  isDateBetween,
  isDateSameOrBefore,
} from '../../utils';

const EditTaskDetailScreen = ({navigation, route}: any) => {
  const queryClient = useQueryClient();
  const {dataTask, userIdList, workDate} = route.params;
  const {dataAuth} = useAppSelector(state => state.auth);
  const initialState = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'Không',
    performById: '',
  };
  const [task, setTask] = useState(initialState);
  const [isDisable, setIsDisable] = useState(false);
  const isDateValidDateTask =
    isDateBetween(task.startDate, workDate.startDate, workDate.endDate) &&
    isDateBetween(task.endDate, workDate.startDate, workDate.endDate);
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
  const updateTask = useMutation({
    mutationKey: ['updateTask'],
    mutationFn: async () => {
      if (dataTask.taskId) {
        return await taskApi.updateTask(dataTask.taskId, task);
      }
    },
    onSuccess: async res => {
      if (res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['getDetailProject', dataTask.projectId],
          exact: true,
        });
        ShowToast('Chỉnh sửa việc làm thành công');
        navigation.goBack();
      }
    },
  });
  useEffect(() => {
    const isDateCorrect = isDateSameOrBefore(task.startDate, task.endDate);
    if (!isDateCorrect) {
      setIsDisable(true);
      AlertError('Ngày bắt đầu công việc không thể sau ngày kết thúc');
    } else {
      setIsDisable(false);
    }
  }, [task.startDate, task.endDate]);
  useEffect(() => {
    if (dataTask) {
      const value = {
        ...dataTask,
        startDate: new Date(dataTask.startDate),
        endDate: new Date(dataTask.endDate),
      };
      setTask(value);
    }
  }, [dataTask]);

  const handleChangeValueTask = (id: string, value: string | Date) => {
    const dataChangeValue: any = {...task};
    dataChangeValue[`${id}`] = value;
    setTask(dataChangeValue);
  };
  const handleEditTask = () => {
    if (isDateValidDateTask) {
      updateTask.mutate();
    } else {
      setIsDisable(true);
      AlertError(
        'Thời gian thực hiện công việc không nằm trong khoảng thời gian được định trước, vui lòng chọn lại ngày thực hiện',
      );
    }
  };

  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  return (
    <>
      <ContainerComponent back title={`Chỉnh sửa việc làm ${dataTask.title}`}>
        <SectionComponent>
          <InputComponent
            lable="Tiêu đề"
            placeholder="Nhập tiêu đề công việc"
            value={task.title}
            onChange={val => handleChangeValueTask('title', val)}
          />
          <InputComponent
            placeholder="Mô tả công việc"
            lable="Mô tả"
            value={task.description}
            onChange={val => handleChangeValueTask('title', val)}
          />
          <PriorityComponent
            label="Độ ưu tiên"
            value={task.priority}
            onSelect={val => handleChangeValueTask('priority', val)}
          />
          <RowComponent align="center" gap={20}>
            <DatePickerComponent
              type="date"
              lable="Ngày bắt đầu"
              placeholder="Chọn ngày"
              value={task.startDate}
              onSelect={date => handleChangeValueTask('startDate', date)}
            />
            <DatePickerComponent
              type="date"
              lable="Ngày kết thúc"
              placeholder="Chọn ngày"
              value={task.endDate}
              onSelect={date => handleChangeValueTask('endDate', date)}
            />
          </RowComponent>
          <DropdownSingleComponent
            label="Người đảm nhiệm"
            userList={data}
            value={task.performById}
            onSeclect={val => handleChangeValueTask('performById', val)}
          />
        </SectionComponent>
      </ContainerComponent>
      <ButtonComponent
        title="Chỉnh sửa công việc"
        disable={isDisable}
        onPress={handleEditTask}
        textColor={colors.white}
        styles={styles.btnAddTask}
        textStyles={styles.textBtnAddTask}
      />
      <ModalLoading isVisable={updateTask.isPending} />
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
export default EditTaskDetailScreen;
