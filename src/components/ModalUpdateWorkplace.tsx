import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {workplaceApi} from '../apis';
import {colors, fontFamily} from '../constants';
import {AlertError, ShowToast} from '../utils';
import ButtonTextComponent from './ButtonTextComponent';
import InputComponent from './InputComponent';
import SectionComponent from './SectionComponent';
import TextComponent from './TextComponent';

interface Props {
  value: string;
  workplaceId: string;
}
const ModalUpdateWorkplace = (props: Props) => {
  const modalizeRef = useRef<Modalize>(null);
  const {value, workplaceId} = props;
  const queryClient = useQueryClient();
  const [name, setName] = useState(value);
  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
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
        modalizeRef.current?.close();
      } else {
        AlertError(res.message ?? 'Cập nhật thất bại');
      }
    },
  });
  useEffect(() => {
    if (isVisibleModalize) {
      modalizeRef.current?.open();
    }
  }, [isVisibleModalize]);
  useEffect(() => {
    if (value) {
      setName(value);
    }
  }, [value]);
  return (
    <>
      <ButtonTextComponent
        title="Cập nhật"
        bgColor={colors.white}
        onPress={() => setIsVisibleModalize(true)}
        styles={styles.btnUpdate}
      />
      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          handlePosition="inside"
          onClose={() => setIsVisibleModalize(false)}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
          HeaderComponent={
            <View style={styles.titleHeader}>
              <TextComponent
                text="Tên bộ môn"
                font={fontFamily.semibold}
                size={17}
              />
            </View>
          }
          FooterComponent={
            <View style={styles.wapperBtnComfirm}>
              <ButtonTextComponent
                styles={styles.btnConfirm}
                title="Đồng ý"
                onPress={() => updateWorkplace.mutate()}
                textColor={colors.white}
              />
            </View>
          }>
          <SectionComponent>
            <InputComponent
              value={name}
              allowClear
              onChange={val => setName(val)}
            />
          </SectionComponent>
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    paddingHorizontal: 16,
    marginTop: 30,
    marginBottom: 16,
  },
  wapperBtnComfirm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnConfirm: {
    justifyContent: 'center',
  },
  btnUpdate: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 8,
  },
});
export default ModalUpdateWorkplace;
