import storage from '@react-native-firebase/storage';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import React, {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
import {DocumentPickerResponse} from 'react-native-document-picker';
import RNFetchBold from 'rn-fetch-blob';
import {
  ButtonComponent,
  ContainerComponent,
  DateTimePickerComponent,
  DropdownPickerComponent,
  InputComponent,
  ModalLoading,
  PriorityComponent,
  RowComponent,
  SectionComponent,
  TaskComponent,
  TextComponent,
  UploadFileComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppSelector} from '../../hooks/useRedux';
import {TaskType} from '../../types';
import {PayloadFileType, ProgressFileType} from '../../types/uploadFile';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const AddWorkScreen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const {taskList} = useAppSelector(state => state.task);
  const initState = {
    title: '',
    createById: dataAuth.userId,
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'Không',
    documents: [],
    tasks: [],
    member: [],
  };
  const [work, setWork] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisableBtnAddWork, setIsDisableBtnAddWork] = useState(true);
  const [fileListPicker, setFileListPicker] = useState<
    DocumentPickerResponse[]
  >([]);
  const [progressUploadFile, setProgressUploadFile] =
    useState<ProgressFileType>();
  const isDateCorrect = dayjs(work.startDate).isSameOrBefore(work.endDate);
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    }
  }, []);

  useEffect(() => {
    handleSetTaskListForWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList.length]);
  useEffect(() => {
    if (!isDateCorrect) {
      setIsDisableBtnAddWork(true);
      Alert.alert('Lỗi', 'Ngày bắt đầu công việc không thể sau ngày kết thúc', [
        {text: 'Đóng', style: 'cancel'},
      ]);
    } else {
      setIsDisableBtnAddWork(false);
    }
  }, [isDateCorrect]);
  const handleChangeValueAddWork = (
    id: string,
    val: string | Date | string[] | PayloadFileType | TaskType[],
  ) => {
    const item: any = {...work};
    item[`${id}`] = val;
    setWork(item);
  };
  const getFilePath = async (file: DocumentPickerResponse) => {
    if (Platform.OS === 'ios') {
      return file.uri;
    } else {
      return (await RNFetchBold.fs.stat(file.uri)).path;
    }
  };
  const handleSetTaskListForWork = () => {
    if (taskList.length > 0) {
      const data: TaskType[] = [];
      taskList.forEach(task => {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.endDate);
        const taskBeforeParse = {...task, startDate, endDate};
        data.push(taskBeforeParse);
      });
      handleChangeValueAddWork('tasks', data);
    }
  };
  const handleUploadFileToStorage = () => {
    fileListPicker.forEach(async file => {
      const path = `/documents/${file.name}`;
      const uri = await getFilePath(file);
      const res = storage().ref(path).putFile(uri);
      res.on('state_changed', task => {
        setProgressUploadFile({
          name: file.name ?? 'Tài liệu',
          transfer: task.bytesTransferred,
          total: task.totalBytes,
        });
      });
      res.then(() => {
        storage()
          .ref(path)
          .getDownloadURL()
          .then(url => {
            const data = {name: file.name ?? '', url, size: file.size ?? 0};
            handleChangeValueAddWork('documents', data);
          });
      });
      res.catch(() => {
        console.log('Lỗi khi tải lên storage');
      });
    });
  };
  const handleSelectFile = (files: DocumentPickerResponse[]) => {
    setFileListPicker(files);
  };
  const handleAddWork = () => {
    work.tasks.forEach((item: TaskType) => {
      const isDateStartTask =
        dayjs(item.startDate).isSameOrBefore(work.startDate, 'day') &&
        dayjs(item.startDate).isSameOrBefore(work.endDate, 'day');
      const isDateEndTask =
        dayjs(item.startDate).isSameOrBefore(work.startDate, 'day') &&
        dayjs(item.startDate).isSameOrBefore(work.endDate, 'day');
      if (!isDateStartTask || !isDateEndTask) {
        return Alert.alert(
          'Thất bại',
          'Thời gian việc cần làm không nằm trong khoảng thời gian tạo công việc. Vui lòng thử lại',
          [{text: 'Đóng', style: 'cancel'}],
        );
      } else {
        setIsLoading(true);
        handleUploadFileToStorage();
      }
    });
  };
  return (
    <>
      <ContainerComponent back title="Tạo công việc" isScroll>
        <SectionComponent>
          <InputComponent
            allowClear
            required
            value={work.title}
            lable="Tên công việc"
            placeholder="Nhập tên công việc"
            onChange={val => handleChangeValueAddWork('title', val)}
          />
          <InputComponent
            value={work.description}
            lable="Mô tả"
            allowClear
            placeholder="Nhập tên công việc"
            onChange={val => handleChangeValueAddWork('description', val)}
          />
          <PriorityComponent
            required
            label="Độ ưu tiên"
            value={work.priority}
            onSelect={val => handleChangeValueAddWork('priority', val)}
          />
          <RowComponent gap={20} align="center">
            <DateTimePickerComponent
              required
              value={work.startDate}
              lable="Ngày bắt đầu"
              type="date"
              placeholder="Chọn ngày"
              onSelect={val => handleChangeValueAddWork('startDate', val)}
            />
            <DateTimePickerComponent
              required
              value={work.endDate}
              lable="Ngày kết thúc"
              type="date"
              placeholder="Chọn ngày"
              onSelect={val => handleChangeValueAddWork('endDate', val)}
            />
          </RowComponent>
          <DropdownPickerComponent
            required
            value={work.member}
            onSelect={val => handleChangeValueAddWork('member', val)}
            label="Người tham gia"
          />
          <UploadFileComponent
            label="Tài liệu"
            onUpload={files => handleSelectFile(files)}
          />
          <TaskComponent
            required
            values={work.tasks}
            label="Những việc cần làm"
            userIdList={work.member}
          />
          <ButtonComponent
            disable={isDisableBtnAddWork}
            title="Tạo công việc"
            onPress={handleAddWork}
            textStyles={styles.textBtnAddWork}
          />
        </SectionComponent>
      </ContainerComponent>
      <ModalLoading
        isVisable={isLoading}
        text={progressUploadFile ? 'Đang tải ảnh...' : 'Đang tải...'}
        contentLoad={
          <RowComponent direction="column" gap={4} align="flex-start">
            <TextComponent
              text={progressUploadFile?.name ?? 'File name'}
              color={colors.white}
            />
            <TextComponent
              color={colors.white}
              text={`${progressUploadFile?.transfer ?? 0} / ${
                progressUploadFile?.total ?? 0
              }`}
            />
          </RowComponent>
        }
      />
    </>
  );
};
const styles = StyleSheet.create({
  textBtnAddWork: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
  },
});
export default AddWorkScreen;
