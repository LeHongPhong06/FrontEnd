import storage from '@react-native-firebase/storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, StyleSheet} from 'react-native';
import {DocumentPickerResponse} from 'react-native-document-picker';
import RNFetchBold from 'rn-fetch-blob';
import {memberApi, projectApi, userApi} from '../../apis';
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
  UploadFileComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppSelector} from '../../hooks';
import {
  Member,
  MemberProjectUpdate,
  PayloadFileType,
  ProgressFileType,
} from '../../types';
import {AlertError, ShowToast, isDateSameOrBefore} from '../../utils';

const EditWorkScreen = ({navigation, route}: any) => {
  const queryClient = useQueryClient();
  const {dataWork} = route.params;
  const initState = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'Không',
  };
  const {dataAuth} = useAppSelector(state => state.auth);
  const [work, setWork] = useState(initState);
  const [memberProject, setMemberProject] = useState<Member[]>(
    dataWork?.memberProject ?? [],
  );
  const [isDisableEditAddWork, setIsDisableEditAddWork] = useState(true);
  const [fileListPicker, setFileListPicker] = useState<
    DocumentPickerResponse[]
  >([]);
  const [progressUploadFile, setProgressUploadFile] =
    useState<ProgressFileType>();
  const isDateCorrect = isDateSameOrBefore(work.startDate, work.endDate);
  const {data, isLoading} = useQuery({
    queryKey: ['getUserListByWorkplaceId'],
    queryFn: () => {
      if (dataAuth.workplaceId) {
        return userApi.getUserAllByWorkplaceById(dataAuth.workplaceId);
      }
    },
  });
  const handleEditWork = useMutation({
    mutationKey: ['editWork'],
    mutationFn: async () => {
      if (dataWork.projectId) {
        return await projectApi.updateProject(dataWork.projectId, work);
      }
    },
    onSuccess: async res => {
      if (res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['getDetailProject', dataWork.projectId],
          exact: true,
        });
        ShowToast(`Cập nhật công việc ${res.data?.title} thành công`);
        navigation.goBack();
      }
    },
  });
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    }
  }, []);
  useEffect(() => {
    if (dataWork) {
      setWork({
        ...dataWork,
        startDate: new Date(dataWork.startDate),
        endDate: new Date(dataWork.endDate),
      });
    }
  }, [dataWork]);
  useEffect(() => {
    if (!isDateCorrect) {
      setIsDisableEditAddWork(true);
      AlertError('Ngày bắt đầu công việc không thể sau ngày kết thúc');
    } else {
      setIsDisableEditAddWork(false);
    }
  }, [isDateCorrect]);
  const handleChangeValue = (
    id: string,
    value: string | Date | Member[] | PayloadFileType,
  ) => {
    const dataWorkChange: any = {...work};
    dataWorkChange[id] = value;
    setWork(dataWorkChange);
  };
  const getFilePath = async (file: DocumentPickerResponse) => {
    if (Platform.OS === 'ios') {
      return file.uri;
    } else {
      return (await RNFetchBold.fs.stat(file.uri)).path;
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
            const dataImagePicker = {
              name: file.name ?? '',
              url,
              size: file.size ?? 0,
            };
            handleChangeValue('documents', dataImagePicker);
          });
      });
      res.catch(() => {
        console.log('Lỗi khi tải lên storage');
      });
    });
  };
  const handleConfirmChangeMember = useMutation({
    mutationKey: ['updateMemberProject'],
    mutationFn: (member: Member[]) => {
      const dataMember: MemberProjectUpdate[] = [];
      if (member.length > 0) {
        member.forEach(item =>
          dataMember.push({
            projectId: dataWork.projectId,
            userId: item.userId,
          }),
        );
      }
      return memberApi.updateMemberByProjectId(dataWork.projectId, dataMember);
    },
    onSuccess: async res => {
      if (res.success === true) {
        setMemberProject(res.data);
        await queryClient.invalidateQueries({
          queryKey: ['getUserListByWorkplaceId', dataWork.projectId],
          exact: true,
        });
        ShowToast('Cập nhật người tham gia thành công');
      } else {
        AlertError(res.message);
      }
    },
  });
  if (!dataWork) {
    return <ModalLoading isVisable />;
  }
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  return (
    <>
      <ContainerComponent title="Chỉnh sửa công việc" back isScroll>
        <SectionComponent>
          <InputComponent
            lable="Tiêu đề"
            placeholder="Tiêu đề công việc"
            value={work.title}
            onChange={val => handleChangeValue('title', val)}
          />
          <InputComponent
            lable="Mô tả"
            placeholder="Mô tả công việc"
            value={work.description}
            onChange={val => handleChangeValue('description', val)}
          />
          <PriorityComponent
            label="Độ ưu tiên"
            value={work.priority}
            onSelect={val => handleChangeValue('priority', val)}
          />
          <RowComponent gap={20} align="center">
            <DatePickerComponent
              type="date"
              lable="Ngày bắt đầu"
              value={work.startDate}
              placeholder="Chọn ngày"
              onSelect={date => handleChangeValue('startDate', date)}
            />
            <DatePickerComponent
              type="date"
              lable="Ngày kết thúc"
              placeholder="Chọn ngày"
              value={work.endDate}
              onSelect={date => handleChangeValue('endDate', date)}
            />
          </RowComponent>
          <DropdownPickerComponent
            listPicker={data}
            value={memberProject}
            label="Người tham gia"
            onSelect={val => handleConfirmChangeMember.mutate(val)}
          />
          <UploadFileComponent
            label="Tài liệu"
            onUpload={files => setFileListPicker(files)}
          />
          <ButtonComponent
            disable={isDisableEditAddWork}
            title="Chỉnh sửa công việc"
            onPress={() => handleEditWork.mutate()}
            textStyles={styles.textBtnEditWork}
          />
        </SectionComponent>
      </ContainerComponent>
      <ModalLoading
        isVisable={
          handleConfirmChangeMember.isPending || handleEditWork.isPending
        }
      />
    </>
  );
};
const styles = StyleSheet.create({
  textBtnEditWork: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
  },
});
export default EditWorkScreen;
