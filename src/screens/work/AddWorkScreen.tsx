/* eslint-disable react-hooks/exhaustive-deps */
import storage from '@react-native-firebase/storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {projectApi, userApi} from '../../apis';
import {
  ButtonComponent,
  ContainerComponent,
  DatePickerComponent,
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
import {useAppSelector} from '../../hooks';
import {Member, PayloadFileType, ProgressFileType, TaskType} from '../../types';
import {
  AlertError,
  ShowToast,
  getFilePath,
  isDateSameOrBefore,
} from '../../utils';
const AddWorkScreen = ({navigation}: any) => {
  const queryClient = useQueryClient();
  const {dataAuth} = useAppSelector(state => state.auth);
  const {taskList} = useAppSelector(state => state.task);
  const initState = {
    title: '',
    createById: dataAuth.userId,
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    statusId: 'unfinished',
    priority: 'Không',
    documents: [],
    tasks: [],
    member: [],
  };
  const {roleId, userId} = dataAuth;
  const [work, setWork] = useState(initState);
  const [isDisableBtnAddWork, setIsDisableBtnAddWork] = useState(true);
  const [fileListPicker, setFileListPicker] = useState<
    DocumentPickerResponse[]
  >([]);
  console.log('object :>> ', fileListPicker);
  const [progressUploadFile, setProgressUploadFile] =
    useState<ProgressFileType>();
  const [documents, setDocuments] = useState<PayloadFileType[]>([]);
  const isDateCorrect = isDateSameOrBefore(work.startDate, work.endDate);
  const isLeader = roleId === 'Leader';
  const {data, isLoading} = useQuery({
    queryKey: ['getUserListByWorkplaceId'],
    queryFn: () => {
      if (dataAuth.workplaceId) {
        return userApi.getUserAllByWorkplaceById(dataAuth.workplaceId);
      }
    },
  });
  const mySelf = useQuery({
    queryKey: ['getDataMySelf', userId],
    queryFn: () => userApi.getById(userId),
  });
  const handleAddWork = useMutation({
    mutationKey: ['createProject'],
    mutationFn: async () => {
      if (fileListPicker.length > 0) {
        await handleUploadFileToStorage();
      }
      return projectApi.createProject(work);
    },
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getProjectList'],
        });
        setWork(initState);
        navigation.goBack();
        ShowToast('Tạo mới công việc thành công');
      }
    },
  });

  useEffect(() => {
    setWork(initState);
  }, []);
  useEffect(() => {
    handleSetTaskListForWork();
  }, [taskList]);
  useEffect(() => {
    if (!isDateCorrect) {
      setIsDisableBtnAddWork(true);
      AlertError('Ngày bắt đầu công việc không thể sau ngày kết thúc');
    } else {
      setIsDisableBtnAddWork(false);
    }
  }, [isDateCorrect]);
  const handleChangeValueAddWork = (
    id: string,
    val: string | Date | string[] | PayloadFileType[] | TaskType[] | Member[],
  ) => {
    const item: any = {...work};
    item[`${id}`] = val;
    setWork(item);
  };
  const handleSetTaskListForWork = () => {
    const dataTask: TaskType[] = [];
    if (taskList.length > 0) {
      taskList.forEach((task: TaskType) => {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.endDate);
        const taskBeforeParse = {...task, startDate, endDate};
        dataTask.push(taskBeforeParse);
      });
    }
    handleChangeValueAddWork('tasks', dataTask);
  };
  const handleUploadFileToStorage = async () => {
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
            const docs = {
              name: file.name ?? '',
              url,
              size: file.size ?? 0,
            };
            setDocuments([...documents, docs]);
          });
      });
      handleChangeValueAddWork('documents', documents);
      res.catch(err => {
        console.log('err :>> ', err);
        console.log('Lỗi khi tải lên storage');
      });
    });
  };

  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  if (!mySelf.data) {
    return <ModalLoading isVisable={mySelf.isLoading} />;
  }
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
            <DatePickerComponent
              required
              value={work.startDate}
              lable="Ngày bắt đầu"
              type="date"
              placeholder="Chọn ngày"
              onSelect={val => handleChangeValueAddWork('startDate', val)}
            />
            <DatePickerComponent
              required
              value={work.endDate}
              lable="Ngày kết thúc"
              type="date"
              placeholder="Chọn ngày"
              onSelect={val => handleChangeValueAddWork('endDate', val)}
            />
          </RowComponent>
          <DropdownPickerComponent
            listPicker={isLeader ? data : [mySelf.data]}
            required
            value={work.member}
            onSelect={val => handleChangeValueAddWork('member', val)}
            label="Người tham gia"
          />
          <UploadFileComponent
            label="Tài liệu"
            onUpload={files => setFileListPicker(files)}
          />
          <TaskComponent
            required
            value={work.tasks}
            label="Những việc cần làm"
            userIdList={work.member}
          />
          <ButtonComponent
            disable={isDisableBtnAddWork}
            title="Tạo công việc"
            onPress={() => handleAddWork.mutate()}
            textStyles={styles.textBtnAddWork}
          />
        </SectionComponent>
      </ContainerComponent>
      <ModalLoading
        isVisable={false}
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
