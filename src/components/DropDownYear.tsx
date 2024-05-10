import {useQuery} from '@tanstack/react-query';
import {ArrowDown2, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {metadataApi} from '../apis';
import {globalStyles} from '../assets';
import {colors, fontFamily} from '../constants';
import ButtonComponent from './ButtonComponent';
import ButtonTextComponent from './ButtonTextComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
interface Props {
  value: number;
  onSeclect: (value: number) => void;
  label?: string;
  required?: boolean;
}
const DropDownYear = (props: Props) => {
  const {value, label, required, onSeclect} = props;
  const modalizeRef = useRef<Modalize>();
  const [monthSelected, setMonthSelected] = useState(0);
  const [isVisibleModalizer, setIsVisibleModalize] = useState(false);
  const {data} = useQuery({
    queryKey: ['getAllYearSelection'],
    queryFn: () => metadataApi.getYearSelect(),
  });
  useEffect(() => {
    if (isVisibleModalizer) {
      modalizeRef.current?.open();
    }
  }, [isVisibleModalizer]);
  useEffect(() => {
    if (value && isVisibleModalizer) {
      setMonthSelected(value);
    }
  }, [value, isVisibleModalizer]);
  const handleSeclect = () => {
    setIsVisibleModalize(true);
  };
  const handleSelectedMonth = (month: number) => {
    setMonthSelected(month);
  };
  const handleConfirmSeclect = () => {
    onSeclect(monthSelected);
    modalizeRef.current?.close();
  };
  const handleColse = () => {
    modalizeRef.current?.close();
  };
  if (!data) {
    return null;
  }
  return (
    <>
      <View style={styles.container}>
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
          onPress={handleSeclect}>
          {value ? (
            <TextComponent text={value} />
          ) : (
            <RowComponent align="center">
              <TextComponent
                text="Năm"
                color={colors.gray5}
                flex={1}
                textAlign="center"
              />
              <ArrowDown2 size={12} color={colors.gray5} />
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
                text="Chọn năm"
                size={16}
                font={fontFamily.semibold}
              />
              <ButtonTextComponent
                title="Đóng"
                onPress={handleColse}
                textColor={colors.white}
              />
            </RowComponent>
          }
          FooterComponent={
            <View style={styles.btnAgree}>
              <ButtonComponent
                title="Đồng ý"
                onPress={handleConfirmSeclect}
                textColor={colors.white}
                textStyles={styles.textBtnAgree}
              />
            </View>
          }>
          <RowComponent
            styles={styles.wapperContainer}
            direction="column"
            gap={12}>
            {data.map((item: any) => {
              const isSelected = monthSelected === item.value;
              return (
                <RowComponent
                  gap={12}
                  align="center"
                  key={item.value}
                  onPress={() => handleSelectedMonth(item.value)}>
                  <TextComponent
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
  container: {flex: 1},
  titleHeader: {
    marginTop: 30,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  btnAgree: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 8,
  },
  wapperContainer: {paddingHorizontal: 14},
  label: {
    marginBottom: 10,
  },
  itemSelect: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  textBtnAgree: {
    textAlign: 'center',
  },
});
export default DropDownYear;
