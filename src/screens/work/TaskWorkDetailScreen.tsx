import {requestCompleteApi, taskApi} from '../../apis';
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  TextComponent,
  UploadFileComponent,
} from '../../components';
import {colors, fontFamily, navigator, screens} from '../../constants';
import {useAppSelector} from '../../hooks';
import {PayloadFileType, TaskType} from '../../types';
import {
  ShowToast,
  formatDateString,
  getFilePath,
  isDateSameOrBefore,
} from '../../utils';
import storage from '@react-native-firebase/storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ArrowRight2} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Alert, Dimensions, StyleSheet} from 'react-native';
import {DocumentPickerResponse} from 'react-native-document-picker';

const TaskWorkDetailScreen = ({navigation, route}: any) => {
  const {taskId} = route.params;
  const queryClient = useQueryClient();
  const {dataAuth} = useAppSelector(state => state.auth);
  const [fileResult, setFileResult] = useState<DocumentPickerResponse[]>([]);
  const [results, setResults] = useState<PayloadFileType[]>([]);
  const {data, isLoading} = useQuery({
    queryKey: ['getTaskDetailByTaskId', taskId],
    queryFn: () => {
      if (taskId) {
        return taskApi.getTaskDetails(taskId);
      }
    },
  });
  const completeTask = useMutation({
    mutationKey: ['completedTask', taskId],
    mutationFn: () => requestCompleteApi.createRequest(taskId),
    onSuccess: async res => {
      if (res.success === true) {
        // await handleUploadFileToStorage();
        queryClient.invalidateQueries({
          queryKey: ['getDetailProject', data?.project.projectId],
          exact: true,
        });
        navigation.goBack();
        ShowToast('Bạn đã gửi thành công yêu cầu tham gia. Hãy đợi duyệt');
      }
    },
  });
  const deleleTask = useMutation({
    mutationKey: ['deleterTask'],
    mutationFn: (task: string) => taskApi.deleteTask(task),
    onSuccess: async res => {
      if (res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['getDetailProject', data?.project.projectId],
          exact: true,
        });
        navigation.goBack();
        ShowToast('Xóa việc làm thành công');
      }
    },
  });
  if (!taskId) {
    return null;
  }
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  const handleUploadFileToStorage = async () => {
    if (fileResult.length > 0) {
      fileResult.forEach(async file => {
        const path = `/result/${file.name}`;
        const uri = await getFilePath(file);
        const res = storage().ref(path).putFile(uri);
        res.then(() => {
          storage()
            .ref(path)
            .getDownloadURL()
            .then(url => {
              const resultFile = {
                name: file.name ?? '',
                url,
                size: file.size ?? 0,
              };
              setResults([...results, resultFile]);
            });
        });
        res.catch(() => {
          console.log('Lỗi khi tải lên storage');
        });
      });
    }
  };
  const handleCompleted = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc mình đã hoàn thành công việc của mình?. Sau khi xác nhận sẽ không thể cập nhật',
      [
        {
          text: 'Đóng',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          style: 'destructive',
          onPress: () => completeTask.mutate(),
        },
      ],
    );
  };

  const handlePressUserPerform = (userId: string) => {
    navigation.navigate(navigator.WORKPLACE_NAVIGATOR, {
      screen: screens.INFOTEARCHERDETAIL_SCREEN,
      params: {userId},
    });
  };
  const handlePressEditTask = (task: TaskType) => {
    navigation.navigate(screens.EDITTASKWORKDETAIL_SCREEN, {
      dataTask: task,
      workDate: {
        startDate: data.project?.startDate,
        endDate: data.project?.endDate,
      },
      userIdList: data.project?.memberProject,
    });
  };
  const handleDeleteTask = (title: string, task: string) => {
    Alert.alert('Xác nhận', `Bạn có chắc chắn muốn xóa việc làm ${title} ?`, [
      {
        text: 'Từ chối',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        style: 'default',
        onPress: () => deleleTask.mutate(task),
      },
    ]);
  };
  const pendingStatus = ['pending'];
  const completedStatus = ['completedlate', 'finished'];
  const isDateCorrect = isDateSameOrBefore(data.startDate, Date.now());
  const isCompleted = completedStatus.includes(data.status.statusId);
  const isPending = pendingStatus.includes(data.status.statusId);
  const isUpdate = data.project.createById === dataAuth.userId;
  return (
    <>
      <ContainerComponent back title={data.title} isScroll>
        <SectionComponent>
          <RowComponent direction="column" gap={22}>
            <RowComponent direction="column" gap={4}>
              <TextComponent
                text={'Mô tả'}
                size={16}
                font={fontFamily.semibold}
              />
              <TextComponent text={data.description ?? 'Trống'} />
            </RowComponent>
            <RowComponent direction="column" gap={4}>
              <TextComponent
                text={'Ngày tạo'}
                size={16}
                font={fontFamily.semibold}
              />
              <TextComponent text={`${formatDateString(data.createAt)}`} />
            </RowComponent>
            <RowComponent
              direction="column"
              gap={4}
              onPress={() =>
                handlePressUserPerform(data.userPerformTask?.userId)
              }>
              <TextComponent
                text={'Người phụ trách'}
                size={16}
                font={fontFamily.semibold}
              />
              <RowComponent
                gap={18}
                align="center"
                styles={styles.wapperUserPerform}>
                <AvatarComponent url={data.userPerformTask.avatar} size={54} />
                <RowComponent direction="column" gap={3} flex={1}>
                  <TextComponent
                    text={data.userPerformTask?.fullName}
                    font={fontFamily.semibold}
                  />
                  <RowComponent>
                    <TextComponent
                      text={data.userPerformTask?.email}
                      numberOfLines={1}
                      size={12}
                      color={colors.gray4}
                    />
                  </RowComponent>
                  <TextComponent
                    text={
                      data.userPerformTask.phoneNumber ??
                      'Số điện thoại chưa cập nhật'
                    }
                    size={12}
                    color={colors.gray4}
                  />
                </RowComponent>
                <ArrowRight2 color={colors.gray5} size={14} />
              </RowComponent>
            </RowComponent>
            <RowComponent direction="column" gap={4}>
              <TextComponent
                text={'Thời gian thực hiện'}
                size={16}
                font={fontFamily.semibold}
              />
              <TextComponent
                text={`${formatDateString(
                  data.startDate,
                )} -  ${formatDateString(data.endDate)}`}
              />
            </RowComponent>
            <RowComponent direction="column" gap={4}>
              <TextComponent
                text={'Độ ưu tiên'}
                size={16}
                font={fontFamily.semibold}
              />
              <TextComponent text={data.priority} />
            </RowComponent>
            <RowComponent direction="column" gap={4}>
              <TextComponent
                text={'Trạng thái'}
                size={16}
                font={fontFamily.semibold}
              />
              <TextComponent text={data.status?.name} />
            </RowComponent>
            <RowComponent direction="column" gap={4}>
              <TextComponent
                text={'Kết quả'}
                size={16}
                font={fontFamily.semibold}
              />
              <UploadFileComponent
                placeholder="Chọn file kết quả đạt được ( nếu có )"
                onUpload={file => setFileResult(file)}
                style={styles.btnUpload}
              />
            </RowComponent>
            {isUpdate && (
              <RowComponent align="center" gap={12}>
                {!isCompleted && (
                  <ButtonTextComponent
                    title="Chỉnh sửa"
                    bgColor={colors.white}
                    styles={styles.btnEdit}
                    onPress={() => handlePressEditTask(data)}
                  />
                )}
                <ButtonTextComponent
                  title={isCompleted ? 'Xóa việc làm' : 'Xóa'}
                  styles={[styles.btnDelete, {flex: isCompleted ? 1 : 0}]}
                  borderColor={colors.danger}
                  bgColor={colors.white}
                  textColor={colors.danger}
                  onPress={() => handleDeleteTask(data.title, data.taskId)}
                />
              </RowComponent>
            )}
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      {dataAuth.userId === data.performById && (
        <ButtonTextComponent
          title={isCompleted ? 'Đã hoàn thành' : 'Yêu cầu hoàn thành'}
          textColor={colors.white}
          styles={styles.btnCompleted}
          onPress={handleCompleted}
          disable={!isDateCorrect || isCompleted || isPending}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height * 0.8,
  },
  btnUpload: {
    marginBottom: 0,
  },
  btnCompleted: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    left: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wapperUserPerform: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray5,
  },
  btnEdit: {
    flex: 2,
    borderRadius: 8,
    justifyContent: 'center',
  },
  btnDelete: {
    borderRadius: 8,
    justifyContent: 'center',
  },
});
export default TaskWorkDetailScreen;
