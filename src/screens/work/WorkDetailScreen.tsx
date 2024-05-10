import {projectApi} from '../../apis';
import {globalStyles} from '../../assets';
import {
  ButtonTextComponent,
  CircleComponent,
  ContainerComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {useAppSelector} from '../../hooks';
import {ProjectType} from '../../types';
import {
  ShowToast,
  formatDateString,
  getColor,
  isDateSameOrAfter,
  isDateSameOrBefore,
  socket,
} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Add, ArrowLeft2, Calendar} from 'iconsax-react-native';
import React from 'react';
import {
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const WorkDetailScreen = ({navigation, route}: any) => {
  const {projectId} = route.params;
  const queryClient = useQueryClient();
  const {dataAuth} = useAppSelector(state => state.auth);
  const {data, isLoading} = useQuery({
    queryKey: ['getDetailProject', projectId],
    queryFn: () => {
      if (projectId) {
        return projectApi.getProjectById(projectId);
      }
    },
  });
  const completedProject = useMutation({
    mutationKey: ['completedProject'],
    mutationFn: () => projectApi.completedProject(projectId),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getDetailProject', projectId],
          exact: true,
        });
        ShowToast('Công việc được hoàn thành');
      }
    },
  });
  if (!projectId) {
    return null;
  }
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  const isDateCorrect = isDateSameOrAfter(Date.now(), data.startDate);
  const completedStatus = ['completedlate', 'finished'];
  const taskCompleted = data.tasks.filter(item =>
    completedStatus.includes(item.status.statusId),
  );
  const isCompletedProject = taskCompleted.length === data.tasks?.length;
  const isMeCreated = data.createById === dataAuth.userId;
  const isAdd = isDateSameOrBefore(Date.now(), data.endDate);
  const isCompleted = completedStatus.includes(data.statusId);
  const handleCompleteProject = () => {
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
          onPress: () => completedProject.mutate(),
        },
      ],
    );
  };
  const handlePressTaskDetail = (taskId: string) => {
    navigation.navigate(screens.TASKWORKDETAIL_SCREEN, {
      taskId,
    });
  };
  const handleAddTask = () => {
    navigation.navigate(screens.ADDTASKWORKDETAIL_SCREEN, {
      userIdList: data.memberProject,
      projectId,
    });
  };
  const handleComment = () => {
    socket.emit('joinProject', data.projectId);
    navigation.navigate(screens.DISCUSS_SCREEN, {data});
  };
  const handlePressRequestListScreen = () => {
    navigation.navigate(screens.REQUESTCOMPLETE_SCREEN, {
      projectId: data.projectId,
    });
  };
  return (
    <>
      <ContainerComponent
        back
        header={<Header data={data} projectId={projectId} />}
        isScroll>
        <SectionComponent>
          <TextComponent
            text={'Mô tả công việc'}
            size={16}
            font={fontFamily.semibold}
          />
          <TextComponent
            color={!data.description ? colors.gray : colors.text}
            text={data.description ?? 'Không có mô tả công việc'}
          />
          <SpaceComponent height={24} />
          <TextComponent
            text={'Tài liệu'}
            size={16}
            font={fontFamily.semibold}
          />
          <RowComponent gap={8}>
            {data.document.length > 0 ? (
              data.document.map((docs, index) => (
                <TextComponent text={docs.name} key={index} />
              ))
            ) : (
              <TextComponent
                text={'Không có file dữ nào được tải lên'}
                color={colors.gray}
              />
            )}
          </RowComponent>
          <SpaceComponent height={24} />
          <RowComponent align="center" justify="space-between">
            <TextComponent
              size={16}
              font={fontFamily.semibold}
              text={'Những việc cần làm'}
            />
            {isMeCreated && isAdd && (
              <ButtonTextComponent
                onPress={handleAddTask}
                textColor={colors.white}
                styles={styles.btnAddTask}
                affix={<Add size={18} color={colors.white} />}
              />
            )}
          </RowComponent>
          <RowComponent
            gap={24}
            direction="column"
            styles={styles.wapperTaskList}>
            {data.tasks.length > 0 ? (
              data.tasks.map(task => {
                return (
                  <RowComponent
                    key={task.taskId}
                    align="center"
                    justify="space-between"
                    onPress={() => handlePressTaskDetail(task.taskId)}
                    styles={[styles.wapperTask, globalStyles.shadow]}>
                    <RowComponent direction="column" gap={7} flex={1}>
                      <TextComponent
                        text={task.title}
                        numberOfLines={1}
                        font={fontFamily.semibold}
                      />
                      <TextComponent
                        text={`Mô tả: ${task.description ?? 'Trống'}`}
                      />
                      <TextComponent
                        text={`Người đảm nhiệm: ${task.userPerformTask?.fullName}`}
                      />
                      <RowComponent align="center" gap={4}>
                        <TextComponent
                          text={`Liên hệ: ${
                            task.userPerformTask?.phoneNumber ?? 'Chưa cập nhật'
                          }`}
                        />
                      </RowComponent>
                      <RowComponent align="center" gap={4}>
                        <TextComponent
                          text={`Email: ${
                            task.userPerformTask?.email ?? 'Chưa cập nhật'
                          }`}
                        />
                      </RowComponent>
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
                  </RowComponent>
                );
              })
            ) : (
              <TextComponent text={'Trống'} color={colors.gray} />
            )}
          </RowComponent>
          <RowComponent gap={12}>
            {isMeCreated && (
              <ButtonTextComponent
                title="Yêu cầu hoàn thành"
                textColor={colors.white}
                onPress={handlePressRequestListScreen}
                styles={styles.btnListComplete}
              />
            )}
            <ButtonTextComponent
              title="Thảo luận"
              textColor={colors.primary}
              onPress={handleComment}
              bgColor={colors.white}
              styles={styles.btn}
            />
          </RowComponent>
          <SpaceComponent height={50} />
        </SectionComponent>
      </ContainerComponent>
      {isMeCreated && (
        <ButtonTextComponent
          disable={!isDateCorrect || isCompleted || !isCompletedProject}
          title={isCompleted ? 'Đã hoàn thành' : 'Hoàn thành'}
          textColor={colors.white}
          onPress={handleCompleteProject}
          styles={[styles.btn, styles.btnComplete]}
        />
      )}
    </>
  );
};
const Header = ({data, projectId}: {data: ProjectType; projectId: string}) => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const queryClient = useQueryClient();
  const navigation: any = useNavigation();
  const completedStatus = ['completedlate', 'finished'];
  const taskCompleted = data.tasks?.filter(item =>
    completedStatus.includes(item.statusId),
  );
  const isMeCreated = data.createById === dataAuth.userId;
  const isCompleted = completedStatus.includes(data.status.statusId);
  const deleteProject = useMutation({
    mutationKey: ['deleteProject'],
    mutationFn: () => projectApi.deleteProject(projectId),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getProjectList'],
        });
        ShowToast('Xóa công việc thành công');
        navigation.goBack();
      }
    },
  });
  const onPressBack = () => {
    navigation.goBack();
  };
  const handleDeleteWork = (title: string) => {
    Alert.alert('Xác nhận', `Bạn có chắc chắn muốn xóa công việc ${title} ?`, [
      {
        text: 'Từ chối',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        style: 'destructive',
        onPress: () => deleteProject.mutate(),
      },
    ]);
  };
  const handleEditWork = () => {
    navigation.navigate(screens.EDITWORK_SCREEN, {dataWork: data});
  };
  return (
    <SectionComponent styles={styles.header}>
      <RowComponent styles={styles.wapperTitle} gap={10} align="center">
        <TouchableOpacity onPress={onPressBack} style={styles.btnBack}>
          <ArrowLeft2 size={20} color={colors.white} />
        </TouchableOpacity>
        <TextComponent
          size={17}
          numberOfLines={1}
          color={colors.white}
          styles={styles.title}
          font={fontFamily.semibold}
          text={data?.title ?? 'Tiêu đề công việc'}
        />
      </RowComponent>
      <SpaceComponent height={20} />
      <RowComponent align="flex-end" justify="space-between">
        <RowComponent direction="column" gap={6}>
          <TextComponent text={'Thời gian'} color={colors.white} />
          <RowComponent align="center" gap={6}>
            <Calendar size={20} color={colors.white} />
            <TextComponent
              color={colors.white}
              text={`${formatDateString(data.startDate)} - ${formatDateString(
                data.endDate,
              )}`}
            />
          </RowComponent>
          <TextComponent
            color={colors.white}
            text={`Đã hoàn thành ${taskCompleted.length}/${data.tasks.length}`}
          />
        </RowComponent>
        {isMeCreated && (
          <RowComponent direction="column" align="flex-end" gap={4}>
            {!isCompleted && (
              <TextComponent
                text={'Chỉnh sửa'}
                color={colors.white}
                onPress={handleEditWork}
              />
            )}
            <TextComponent
              text={'Xóa'}
              color={colors.white}
              onPress={() => handleDeleteWork(data.title)}
            />
          </RowComponent>
        )}
      </RowComponent>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 18,
    marginBottom: 0,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    backgroundColor: colors.primary,
  },
  container: {
    backgroundColor: colors.white,
  },
  btnBack: {
    padding: 2,
  },
  wapperTitle: {
    paddingTop: 8,
  },
  title: {
    maxWidth: Dimensions.get('window').width * 0.7,
  },
  wapperTaskList: {
    marginVertical: 12,
  },
  wapperTask: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
  },
  btn: {
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnListComplete: {
    flex: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnAddTask: {
    padding: 8,
    borderRadius: 8,
  },
  btnUpdate: {
    padding: 4,
    borderRadius: 6,
  },

  btnCmt: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wapperCmtItem: {
    padding: 6,
    borderRadius: 12,
  },
  btnComplete: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    left: 16,
  },
});
export default WorkDetailScreen;
