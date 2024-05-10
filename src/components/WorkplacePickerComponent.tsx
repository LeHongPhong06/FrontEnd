import {useQuery} from '@tanstack/react-query';
import {ArrowDown2, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {workplaceApi} from '../apis';
import {globalStyles} from '../assets';
import {colors, fontFamily} from '../constants';
import {WorkplaceType} from '../types';
import ButtonTextComponent from './ButtonTextComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
interface Props {
  label?: string;
  value: string;
  onSelect: (val: string) => void;
  required?: boolean;
}
const WorkplacePickerComponent = (props: Props) => {
  const {label, value, onSelect, required} = props;
  const modalizeRef = useRef<Modalize>();
  const [workplaceSelect, setworkplaceSelect] = useState('');
  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  const {data} = useQuery({
    queryKey: ['getAllWorkplace'],
    queryFn: () =>
      workplaceApi.getAllWorkplace({page: 1, search: '', limit: 10}),
  });
  useEffect(() => {
    if (isVisibleModalize) {
      modalizeRef.current?.open();
    }
  }, [isVisibleModalize]);
  useEffect(() => {
    if (value) {
      setworkplaceSelect(value);
    }
  }, [value]);
  const handlePressSelectWorkplace = () => {
    setIsVisibleModalize(true);
  };
  const handleSelectWorklace = (item: WorkplaceType) => {
    setworkplaceSelect(item.workplaceId);
  };
  const handleConfirmSelectWorkplace = () => {
    onSelect(workplaceSelect);
    modalizeRef.current?.close();
  };
  const handleColse = () => {
    modalizeRef.current?.close();
  };
  if (!data) {
    return null;
  }
  const workplacePicker = (workplaceId: string) => {
    const workplace = data.find(item => item.workplaceId === workplaceId);
    return <TextComponent text={workplace?.name} />;
  };
  return (
    <>
      <View>
        {label && (
          <RowComponent gap={8} align="center">
            {required && (
              <TextComponent text="*" size={18} color={colors.danger} />
            )}
            <TextComponent text={label} size={14} styles={styles.label} />
          </RowComponent>
        )}
        <RowComponent
          styles={[globalStyles.inputContainer]}
          onPress={handlePressSelectWorkplace}>
          {value ? (
            workplacePicker(value)
          ) : (
            <RowComponent align="center">
              <TextComponent text="Chon bộ môn" color={colors.gray5} flex={1} />
              <ArrowDown2 color={colors.gray5} size={12} />
            </RowComponent>
          )}
        </RowComponent>
      </View>
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
            <RowComponent
              styles={styles.titleHeader}
              justify="space-between"
              align="center">
              <TextComponent
                text="Chọn độ ưu tiên"
                font={fontFamily.semibold}
                size={17}
              />
              <ButtonTextComponent
                title="Đóng"
                onPress={handleColse}
                textColor={colors.white}
              />
            </RowComponent>
          }
          FooterComponent={
            <View style={styles.wapperBtnComfirm}>
              <ButtonTextComponent
                styles={styles.btnConfirm}
                title="Đồng ý"
                onPress={handleConfirmSelectWorkplace}
                textColor={colors.white}
              />
            </View>
          }>
          <RowComponent direction="column" gap={8} styles={styles.wapperItem}>
            {data.length > 0 &&
              data.map(item => {
                const isSelected = workplaceSelect === item.workplaceId;
                return (
                  <RowComponent
                    align="center"
                    key={item.workplaceId}
                    styles={styles.itemSelect}
                    onPress={() => handleSelectWorklace(item)}>
                    <TextComponent
                      flex={1}
                      text={item.name}
                      color={isSelected ? colors.primary : colors.text}
                    />
                    {isSelected && (
                      <TickCircle size={18} color={colors.primary} />
                    )}
                  </RowComponent>
                );
              })}
          </RowComponent>
        </Modalize>
      </Portal>
    </>
  );
};
const styles = StyleSheet.create({
  titleHeader: {
    paddingHorizontal: 16,
    marginTop: 30,
    marginBottom: 8,
  },
  label: {marginBottom: 10},
  wapperItem: {paddingHorizontal: 16},
  itemSelect: {
    paddingVertical: 10,
  },
  wapperBtnComfirm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnConfirm: {
    marginTop: 12,
    justifyContent: 'center',
  },
});
export default WorkplacePickerComponent;
