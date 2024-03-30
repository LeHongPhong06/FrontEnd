import {StyleSheet} from 'react-native';
import React from 'react';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import {RowComponent, TextComponent} from '.';
import {colors} from '../constants';

interface Props {
  label?: string;
  value: string;
  required?: boolean;
  onSelect: (val: string) => void;
}
const RadioButtonComponent = (props: Props) => {
  const {label, value, required, onSelect} = props;
  const data: RadioButtonProps[] = [
    {
      color: colors.primary,
      borderColor: colors.gray5,
      size: 20,
      id: 'male',
      value: 'male',
      borderSize: 1.5,
      containerStyle: {
        gap: 10,
      },
      label: <TextComponent text={'Nam'} color={colors.gray5} />,
    },
    {
      color: colors.primary,
      borderSize: 1.5,
      containerStyle: {
        gap: 10,
      },
      borderColor: colors.gray5,
      size: 20,
      id: 'female',
      value: 'female',
      label: <TextComponent text={'Nữ'} color={colors.gray5} />,
    },
  ];
  return (
    <>
      {label && (
        <RowComponent gap={8} align="center">
          {required && (
            <TextComponent text="*" size={18} color={colors.danger} />
          )}
          <TextComponent text={label} size={14} styles={styles.label} />
        </RowComponent>
      )}
      <RadioGroup
        layout="row"
        containerStyle={styles.container}
        radioButtons={data}
        onPress={selectedId => onSelect(selectedId)}
        selectedId={value}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    minHeight: 56,
    marginBottom: 16,
    borderRadius: 12,
    borderColor: colors.gray5,
    borderWidth: 1,
  },
  label: {
    marginBottom: 10,
  },
});
export default RadioButtonComponent;
