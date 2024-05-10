import {ArrowDown2, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {globalStyles} from '../assets';
import {colors, fontFamily} from '../constants';
import ButtonComponent from './ButtonComponent';
import ButtonTextComponent from './ButtonTextComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
interface Props {
  value: string;
  onSeclect: (value: string) => void;
  label?: string;
  required?: boolean;
}
const DropdownRoleComponent = (props: Props) => {
  const roles = [
    {value: 'Leader', name: 'Trưởng bộ môn'},
    {value: 'User', name: 'Giảng viên'},
  ];
  const {value, label, required, onSeclect} = props;
  const modalizeRef = useRef<Modalize>();
  const [roleIdSelected, setRoleIdSelected] = useState('');
  const [isVisibleModalizer, setIsVisibleModalize] = useState(false);
  useEffect(() => {
    if (isVisibleModalizer) {
      modalizeRef.current?.open();
    }
  }, [isVisibleModalizer, modalizeRef]);
  useEffect(() => {
    if (value && isVisibleModalizer) {
      setRoleIdSelected(value);
    }
  }, [value, isVisibleModalizer]);
  const handleSeclect = () => {
    setIsVisibleModalize(true);
  };
  const handleSelectedrole = (roleId: string) => {
    setRoleIdSelected(roleId);
  };
  const handleConfirmSeclect = () => {
    onSeclect(roleIdSelected);
    modalizeRef.current?.close();
  };
  const handleColse = () => {
    modalizeRef.current?.close();
  };
  const rolePicker = (roleId: string) => {
    const role = roles.find(item => item.value === roleId);
    return <TextComponent text={role?.name} />;
  };
  return (
    <>
      <>
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
            rolePicker(value)
          ) : (
            <RowComponent align="center">
              <TextComponent
                text="Chọn quyền người dùng"
                color={colors.gray5}
                flex={1}
              />
              <ArrowDown2 size={12} color={colors.gray5} />
            </RowComponent>
          )}
        </RowComponent>
      </>
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
                text="Chọn quyền người dùng"
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
          <RowComponent styles={styles.wapperContainer} direction="column">
            {roles.length > 0 &&
              roles.map(role => {
                const isSelected = roleIdSelected === role.value;
                return (
                  <RowComponent
                    align="center"
                    key={role.value}
                    styles={styles.itemSelect}
                    onPress={() => handleSelectedrole(role.value)}>
                    <TextComponent
                      flex={1}
                      text={role.name}
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
    paddingVertical: 10,
  },
  textBtnAgree: {
    textAlign: 'center',
  },
});
export default DropdownRoleComponent;
