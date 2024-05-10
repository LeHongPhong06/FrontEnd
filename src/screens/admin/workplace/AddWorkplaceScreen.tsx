import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {workplaceApi} from '../../../apis';
import {
  ButtonTextComponent,
  ContainerAdminComponent,
  InputComponent,
  ModalLoading,
  SectionComponent,
} from '../../../components';
import {colors} from '../../../constants';
import {AlertError, ShowToast} from '../../../utils';

const AddWorkplaceScreen = ({navigation}: any) => {
  const queryClient = useQueryClient();
  const [workplace, setWorkplace] = useState({
    workplaceId: '',
    name: '',
  });
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (workplace.name && workplace.workplaceId) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [workplace.name, workplace.workplaceId]);
  const addWorkplace = useMutation({
    mutationKey: ['addWorkplace'],
    mutationFn: () => workplaceApi.createWorkplace(workplace),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({queryKey: ['getWorkplaceAll']});
        navigation.goBack();
        ShowToast('Thêm bộ môn thành công');
      } else {
        AlertError(res.message ?? 'Tạo bộ môn thất bại');
      }
    },
  });
  const handleChangeValue = (id: string, val: string) => {
    const data: any = {...workplace};
    data[`${id}`] = val;
    setWorkplace(data);
  };
  return (
    <>
      <ContainerAdminComponent back title="Thêm bộ môn">
        <SectionComponent>
          <InputComponent
            value={workplace.workplaceId}
            lable="Mã bộ môn"
            allowClear
            placeholder="Mã bộ môn"
            required
            onChange={val => handleChangeValue('workplaceId', val)}
          />
          <InputComponent
            value={workplace.name}
            lable="Tên bộ môn"
            placeholder="Tên bộ môn"
            allowClear
            required
            onChange={val => handleChangeValue('name', val)}
          />
        </SectionComponent>
      </ContainerAdminComponent>
      <ButtonTextComponent
        title="Thêm bộ môn"
        disable={disable}
        textColor={colors.white}
        styles={styles.btnAdd}
        onPress={() => addWorkplace.mutate()}
      />
      <ModalLoading isVisable={addWorkplace.isPending} />
    </>
  );
};

const styles = StyleSheet.create({
  btnAdd: {
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 8,
    bottom: 8,
    right: 16,
    left: 16,
  },
});
export default AddWorkplaceScreen;
