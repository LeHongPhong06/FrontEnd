import {Calendar} from 'iconsax-react-native';
import React, {ReactNode, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  ButtonTextComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {globalStyles} from '../assets';
import {colors} from '../constants';
interface Props {
  lable?: string;
  value: Date;
  onSelect: (val: Date) => void;
  placeholder?: string;
  type?: 'date' | 'time' | 'datetime';
  affix?: ReactNode;
  required?: boolean;
  suffix?: ReactNode;
  startDate?: Date;
}
const DatePickerComponent = (props: Props) => {
  const {value, placeholder, lable, onSelect, type, affix, suffix, required} =
    props;
  const [openModal, setOpenModal] = useState(false);
  const [dateSelect, setDateSelect] = useState(value ?? new Date());
  const handlePressSelectDate = () => {
    setOpenModal(true);
  };
  const handleConfirmSelectDate = () => {
    onSelect(dateSelect);
    setOpenModal(false);
  };
  const handleCloseDatePicker = () => {
    setOpenModal(false);
  };
  return (
    <>
      <View style={styles.wapperContainer}>
        {lable && (
          <RowComponent gap={8} align="center">
            {required && (
              <TextComponent text="*" size={18} color={colors.danger} />
            )}
            <TextComponent text={lable} size={14} styles={styles.lable} />
          </RowComponent>
        )}
        <RowComponent
          styles={[globalStyles.inputContainer]}
          onPress={handlePressSelectDate}>
          {affix && affix}
          {type === 'date' ? (
            <TextComponent
              text={`${value.getDate()} / ${
                value.getMonth() + 1
              } / ${value.getFullYear()}`}
              flex={1}
            />
          ) : (
            <TextComponent text={placeholder} flex={1} color={colors.gray5} />
          )}
          {suffix ?? <Calendar size={18} color={colors.gray5} />}
        </RowComponent>
      </View>
      <Modal visible={openModal} animationType="slide" transparent>
        <View style={styles.wapperDatePicker}>
          <View style={styles.containerDatePicker}>
            <DatePicker
              date={dateSelect}
              mode={'date'}
              onDateChange={date => setDateSelect(date)}
              locale="vi-VN"
            />
            <SpaceComponent height={30} />
            <RowComponent justify="flex-end" gap={16} align="center">
              <TextComponent
                text="Đóng"
                onPress={handleCloseDatePicker}
                color={colors.primary}
              />
              <ButtonTextComponent
                title="Xác nhận"
                onPress={handleConfirmSelectDate}
                textColor={colors.white}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  wapperContainer: {
    flex: 1,
  },
  lable: {
    marginBottom: 10,
  },
  wapperDatePicker: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDatePicker: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 20,
  },
});
export default DatePickerComponent;
