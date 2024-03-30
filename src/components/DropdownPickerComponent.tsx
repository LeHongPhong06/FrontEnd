import {ArrowDown2, SearchNormal, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {
  ButtonTextComponent,
  InputComponent,
  RowComponent,
  TextComponent,
} from '.';
import {globalStyles} from '../assets/styles/globalStyle';
import {colors, userList} from '../constants';
interface Props {
  value: string[];
  onSelect: (value: string[]) => void;
  label?: string;
  required?: boolean;
}
const DropdownPickerComponent = (props: Props) => {
  const {value, label, onSelect, required} = props;
  const modalizeRef = useRef<Modalize>();
  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  useEffect(() => {
    if (isVisibleModalize) {
      modalizeRef.current?.open();
    }
  }, [isVisibleModalize]);
  useEffect(() => {
    if (isVisibleModalize && value && value.length > 0) {
      setSelectedItems(value);
    }
  }, [value, isVisibleModalize]);
  const handleSelectedItems = (email: string) => {
    if (selectedItems.includes(email)) {
      const data = [...selectedItems];
      const index = selectedItems.findIndex(e => e === email);
      if (index !== -1) {
        data.splice(index, 1);
      }
      setSelectedItems(data);
    } else {
      setSelectedItems([...selectedItems, email]);
    }
  };
  const handlePressOpenModalize = () => {
    setIsVisibleModalize(true);
  };
  const handleAgree = () => {
    onSelect(selectedItems);
    modalizeRef.current?.close();
  };
  return (
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
        gap={12}
        onPress={handlePressOpenModalize}>
        <RowComponent styles={styles.wapperUserInvited} gap={8} align="center">
          {value.length > 0 ? (
            selectedItems.map(item => {
              const use = userList.find(u => u.email === item);
              return (
                use && (
                  <TextComponent
                    key={use.id}
                    text={use.name}
                    styles={styles.userInvited}
                  />
                )
              );
            })
          ) : (
            <RowComponent align="center">
              <TextComponent
                text="Chọn người tham gia"
                color={colors.gray5}
                flex={1}
              />
              <ArrowDown2 size={12} color={colors.gray5} />
            </RowComponent>
          )}
        </RowComponent>
      </RowComponent>
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
            <View style={styles.headerModal}>
              <RowComponent align="center" gap={10}>
                <View style={styles.wapperInputHeader}>
                  <InputComponent
                    affix={
                      <SearchNormal
                        size={18}
                        color={
                          valueSearch.length > 0 ? colors.primary : colors.gray5
                        }
                      />
                    }
                    allowClear
                    style={styles.inputHeader}
                    value={valueSearch}
                    placeholder="Nhập tên giảng viên"
                    onChange={val => setValueSearch(val)}
                  />
                </View>
                <ButtonTextComponent
                  title="Đóng"
                  onPress={() => modalizeRef.current?.close()}
                  textColor={colors.white}
                />
              </RowComponent>
            </View>
          }
          FooterComponent={
            <View style={styles.wapperFooter}>
              <ButtonTextComponent
                title="Đồng ý"
                styles={styles.btnAgreeFooter}
                onPress={handleAgree}
                textColor={colors.white}
              />
            </View>
          }>
          <RowComponent
            styles={styles.wapperModal}
            direction="column"
            gap={20}
            align="center">
            {userList.map(item => (
              <RowComponent
                key={item.id}
                align="center"
                onPress={() => handleSelectedItems(item.email)}>
                <TextComponent
                  text={item.email}
                  flex={1}
                  color={
                    selectedItems.includes(item.email)
                      ? colors.primary
                      : colors.text
                  }
                />
                {selectedItems.includes(item.email) && (
                  <TickCircle size={16} color={colors.primary} />
                )}
              </RowComponent>
            ))}
          </RowComponent>
        </Modalize>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  wapperUserInvited: {
    flexWrap: 'wrap',
  },
  userInvited: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  label: {
    marginBottom: 10,
  },
  headerModal: {
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  wapperModal: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 20,
  },
  inputHeader: {marginBottom: 0},
  btnAgreeFooter: {
    justifyContent: 'center',
  },
  wapperInputHeader: {flex: 1},
  wapperFooter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1.5,
    borderColor: colors.gray5,
  },
});
export default DropdownPickerComponent;
