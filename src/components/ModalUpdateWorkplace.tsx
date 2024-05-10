import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Dimensions, Modal, StyleSheet, View} from 'react-native';
import {workplaceApi} from '../apis';
import {colors} from '../constants';
import {AlertError, ShowToast} from '../utils';
import ButtonTextComponent from './ButtonTextComponent';
import InputComponent from './InputComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  isVisable: boolean;
  value: string;
  workplaceId: string;
  onConfirm: () => void;
}
const ModalUpdateWorkplace = (props: Props) => {
  const {isVisable, value, workplaceId, onConfirm} = props;
  const queryClient = useQueryClient();
  const [name, setName] = useState(value);
  const updateWorkplace = useMutation({
    mutationKey: ['updateWorkplace'],
    mutationFn: () => workplaceApi.updateWorkplace(workplaceId, {name}),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getInfoWorkplaceById', workplaceId],
          exact: true,
        });
        ShowToast('Cập nhật bộ môn thành công');
        onConfirm();
      } else {
        AlertError(res.message ?? 'Cập nhật thất bại');
      }
    },
  });
  return (
    <Modal
      visible={isVisable}
      animationType="slide"
      transparent
      statusBarTranslucent
      style={styles.modal}>
      <View style={styles.wapper}>
        <RowComponent direction="column" gap={10} styles={styles.container}>
          <InputComponent
            value={name}
            allowClear
            onChange={val => setName(val)}
            lable="Tên bộ môn"
          />
          <RowComponent align="center" gap={12} justify="flex-end">
            <TextComponent text={'Đóng'} />
            <ButtonTextComponent
              title="Thay đổi"
              onPress={() => updateWorkplace.mutate()}
              textColor={colors.white}
            />
          </RowComponent>
        </RowComponent>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  wapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: Dimensions.get('window').width * 0.8,
    padding: 18,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
});
export default ModalUpdateWorkplace;
