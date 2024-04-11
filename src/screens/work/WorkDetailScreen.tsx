import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {format} from 'date-fns';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {ArrowLeft2, Calendar, Call} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {projectApi, taskApi} from '../../apis';
import {globalStyles} from '../../assets/styles/globalStyle';
import {
  AvatarComponent,
  ButtonTextComponent,
  InputComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {useAppSelector} from '../../hooks/useRedux';
dayjs.extend(isSameOrAfter);
const WorkDetailScreen = ({navigation, route}: any) => {
  const {projectId} = route.params;
  const queryClient = useQueryClient();
  const {dataAuth} = useAppSelector(state => state.auth);
  const [isDisabled, setIsDisabled] = useState(true);
  const [conentComment, setContentComment] = useState('');
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['getDetailProject', projectId],
    queryFn: () => {
      if (projectId) {
        return projectApi.getProjectById(projectId);
      }
    },
  });
  const deleleTask = useMutation({
    mutationKey: ['deleterTask'],
    mutationFn: (taskId: string) => taskApi.deleteTask(taskId),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getDetailProject', projectId],
          exact: true,
        });
        ToastAndroid.show('Xóa việc làm thành công', 2);
      }
    },
  });
  const deleteProject = useMutation({
    mutationKey: ['deleteProject'],
    mutationFn: () => projectApi.deleteProject(projectId),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getProjectList'],
        });
        ToastAndroid.show('Xóa công việc thành công', 2);
        navigation.goBack();
      }
    },
  });
  const isDateCorrect = dayjs(Date.now()).isSameOrAfter(data?.startDate);
  useEffect(() => {
    if (isDateCorrect) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isDateCorrect]);
  const onPressBack = () => {
    navigation.goBack();
  };
  const handleEditWork = () => {
    navigation.navigate(screens.EDITWORK_SCREEN, {dataWork: data});
  };
  const handlePressUpdateTask = () => {};
  const handleSendCmt = () => {};
  const handlePressComplete = () => {};
  const handleDeleteTask = (title: string, taskId: string) => {
    Alert.alert('Xác nhận', `Bạn có chắc chắn muốn xóa việc làm ${title} ?`, [
      {
        text: 'Từ chối',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        style: 'default',
        onPress: () => deleleTask.mutate(taskId),
      },
    ]);
  };
  const handleDeleteWork = (title: string) => {
    Alert.alert('Xác nhận', `Bạn có chắc chắn muốn xóa công việc ${title} ?`, [
      {
        text: 'Từ chối',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        style: 'default',
        onPress: () => deleteProject.mutate(),
      },
    ]);
  };
  const handlePressLinking = (
    type: 'email' | 'phone',
    payload: string | undefined,
  ) => {
    if (type === 'email') {
      Linking.openURL(`mailto:${payload}`);
    } else if (type === 'phone') {
      Linking.openURL(`tel:${payload}`);
    }
  };
  if (!projectId) {
    return null;
  }
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={[colors.primary]}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      }>
      <View style={styles.container}>
        <SectionComponent styles={styles.header}>
          <RowComponent styles={styles.wapperTitle} gap={10} align="center">
            <TouchableOpacity onPress={onPressBack} style={styles.btnBack}>
              <ArrowLeft2 size={20} color={colors.white} />
            </TouchableOpacity>
            <TextComponent
              numberOfLines={1}
              text={data?.title ?? 'Tiêu đề công việc'}
              color={colors.white}
              size={17}
              styles={styles.title}
              font={fontFamily.semibold}
            />
          </RowComponent>
          <SpaceComponent height={20} />
          <RowComponent align="center" justify="space-between">
            <RowComponent direction="column" gap={4}>
              <TextComponent text={'Thời gian'} color={colors.white} />
              <RowComponent align="center" gap={6}>
                <Calendar size={20} color={colors.white} />
                <TextComponent
                  color={colors.white}
                  text={`${format(data.startDate, 'dd/MM/yyyy')} -  ${format(
                    data.endDate,
                    'dd/MM/yyyy',
                  )}`}
                />
              </RowComponent>
            </RowComponent>
            <RowComponent direction="column" align="flex-end" gap={4}>
              <TextComponent
                text={'Chỉnh sửa'}
                color={colors.white}
                onPress={handleEditWork}
              />
              <TextComponent
                text={'Xóa'}
                color={colors.white}
                onPress={() => handleDeleteWork(data.title)}
              />
            </RowComponent>
          </RowComponent>
        </SectionComponent>
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
          <TextComponent
            text={'Những việc cần làm'}
            size={16}
            font={fontFamily.semibold}
          />
          <RowComponent
            gap={24}
            direction="column"
            styles={styles.wapperTaskList}>
            {data.tasks.length > 0 ? (
              data.tasks.map(task => {
                const isUpdateTask =
                  task.userPerformTask?.userId === dataAuth.userId;
                return (
                  <RowComponent
                    gap={7}
                    direction="column"
                    key={task.taskId}
                    styles={[styles.wapperTask, globalStyles.shadow]}>
                    <TextComponent
                      text={task.title}
                      numberOfLines={1}
                      font={fontFamily.semibold}
                    />
                    <TextComponent
                      numberOfLines={2}
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
                      {task.userPerformTask?.phoneNumber && (
                        <Call
                          size={22}
                          color={colors.green}
                          onPress={() =>
                            handlePressLinking(
                              'phone',
                              task.userPerformTask?.phoneNumber,
                            )
                          }
                        />
                      )}
                    </RowComponent>
                    <RowComponent align="center" gap={4}>
                      <TextComponent
                        text={`Email: ${
                          task.userPerformTask?.email ?? 'Chưa cập nhật'
                        }`}
                      />
                      <Call />
                    </RowComponent>
                    <TextComponent
                      text={`Thời gian: ${format(
                        task.startDate,
                        'dd/MM/yyyy',
                      )} - ${format(task.endDate, 'dd/MM/yyyy')}`}
                    />
                    <TextComponent text={`Trạng thái: ${task.status?.name}`} />
                    <SpaceComponent height={2} />
                    <RowComponent align="center" gap={16}>
                      <ButtonTextComponent
                        disable={isUpdateTask ? false : true}
                        textColor={colors.white}
                        styles={styles.btnUpdate}
                        title="Cập nhật"
                        onPress={() => handlePressUpdateTask()}
                      />
                      <TextComponent
                        text={'Xóa'}
                        color={colors.danger}
                        onPress={() =>
                          handleDeleteTask(task.title, task.taskId)
                        }
                      />
                    </RowComponent>
                  </RowComponent>
                );
              })
            ) : (
              <TextComponent text={'Trống'} color={colors.gray} />
            )}
          </RowComponent>
          <SpaceComponent height={24} />
          <TextComponent
            text={'Thảo luận'}
            size={16}
            font={fontFamily.semibold}
          />
          {data.comment.length > 0 ? (
            data.comment.map(cmt => {
              return (
                <View key={cmt.commentId}>
                  <TextComponent text={cmt.content} />
                </View>
              );
            })
          ) : (
            <TextComponent
              text={'Không có ai bình luận về công việc'}
              color={colors.gray}
            />
          )}
          <SpaceComponent height={8} />
          <InputComponent
            allowClear
            placeholder="Suy nghĩ của bạn..."
            numberOfLines={1}
            affix={<AvatarComponent url={dataAuth.avatar} size={35} />}
            suffix={
              conentComment.length > 0 && (
                <ButtonTextComponent
                  title="Gửi"
                  onPress={handleSendCmt}
                  styles={styles.btnSendCmt}
                  textColor={colors.white}
                />
              )
            }
            value={conentComment}
            onChange={val => setContentComment(val)}
          />
          <ButtonTextComponent
            disable={isDisabled}
            title="Hoàn thành"
            textColor={colors.white}
            onPress={handlePressComplete}
            styles={styles.btn}
          />
        </SectionComponent>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 18,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    backgroundColor: colors.primary,
  },
  container: {
    minHeight: Dimensions.get('window').height,
    backgroundColor: colors.white,
  },
  btnBack: {
    padding: 2,
  },
  wapperTitle: {
    paddingTop: 8,
  },
  title: {
    paddingRight: 30,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnUpdate: {
    padding: 4,
    borderRadius: 6,
  },
  btnSendCmt: {
    borderRadius: 8,
    padding: 6,
    marginLeft: 6,
  },
});
export default WorkDetailScreen;
