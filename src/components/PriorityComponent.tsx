import {ArrowDown2, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {ButtonTextComponent, RowComponent, TextComponent} from '.';
import {globalStyles} from '../assets/styles/globalStyle';
import {colors, fontFamily, priorityList} from '../constants';
import {PriorityType} from '../types/priorityType';

interface Props {
  label?: string;
  value: string;
  onSelect: (val: string) => void;
  required?: boolean;
}
const PriorityComponent = (props: Props) => {
  const {label, value, onSelect, required} = props;
  const modalizeRef = useRef<Modalize>();
  const [prioritySelect, setPrioritySelect] = useState('');
  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  useEffect(() => {
    if (isVisibleModalize) {
      modalizeRef.current?.open();
    }
  }, [isVisibleModalize]);
  useEffect(() => {
    if (value) {
      setPrioritySelect(value);
    }
  }, [value]);
  const handlePressSelectPriority = () => {
    setIsVisibleModalize(true);
  };
  const handleSelectPriority = (item: PriorityType) => {
    setPrioritySelect(item.value);
  };
  const handleConfirmSelectPriority = () => {
    onSelect(prioritySelect);
    modalizeRef.current?.close();
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
          onPress={handlePressSelectPriority}>
          {value ? (
            <TextComponent text={value} />
          ) : (
            <RowComponent align="center">
              <TextComponent
                text="Chon độ ưu tiên"
                color={colors.gray5}
                flex={1}
              />
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
            <View style={styles.titleHeader}>
              <TextComponent
                text="Chọn độ ưu tiên"
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
                onPress={handleConfirmSelectPriority}
                textColor={colors.white}
              />
            </View>
          }>
          <RowComponent direction="column" gap={8} styles={styles.wapperItem}>
            {priorityList.length > 0 &&
              priorityList.map(item => (
                <RowComponent
                  styles={styles.item}
                  key={item.id}
                  onPress={() => handleSelectPriority(item)}>
                  <TextComponent
                    text={item.value}
                    flex={1}
                    color={
                      prioritySelect === item.value
                        ? colors.primary
                        : colors.text
                    }
                  />
                  {prioritySelect === item.value && (
                    <TickCircle size={16} color={colors.primary} />
                  )}
                </RowComponent>
              ))}
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
    marginBottom: 16,
  },
  label: {marginBottom: 10},
  wapperItem: {paddingHorizontal: 16},
  item: {
    paddingVertical: 4,
  },
  wapperBtnComfirm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnConfirm: {
    justifyContent: 'center',
  },
});
export default PriorityComponent;
