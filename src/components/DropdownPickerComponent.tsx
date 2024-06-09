import {ArrowDown2, SearchNormal, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {
  AvatarComponent,
  ButtonTextComponent,
  InputComponent,
  RowComponent,
  TextComponent,
} from '.';
import {globalStyles} from '../assets';
import {colors} from '../constants';
import {Member, UserType} from '../types';
interface Props {
  listPicker: UserType[];
  value: Member[];
  onSelect: (value: Member[]) => void;
  label?: string;
  required?: boolean;
}
const DropdownPickerComponent = (props: Props) => {
  const {value, label, onSelect, required, listPicker} = props;
  const modalizeRef = useRef<Modalize>();
  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState<Member[]>([]);
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
  const handleSelectedItems = (userId: string) => {
    const userInclude = selectedItems.find(item => item.userId === userId);
    if (userInclude) {
      const data = [...selectedItems];
      const index = selectedItems.findIndex(item => item.userId === userId);
      if (index !== -1) {
        data.splice(index, 1);
      }
      setSelectedItems(data);
    } else {
      setSelectedItems([...selectedItems, {userId}]);
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
            value.map(item => {
              const use = listPicker.find(user => user.userId === item.userId);
              return (
                use && (
                  <TextComponent
                    key={use.userId}
                    text={use.fullName}
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
          <RowComponent gap={12} styles={styles.wapperModal} direction="column">
            {listPicker?.map(item => {
              const userPicker = selectedItems.find(
                user => item.userId === user.userId,
              );
              return (
                <RowComponent
                  key={item.userId}
                  align="center"
                  gap={12}
                  styles={[
                    styles.wapperContainer,
                    {
                      borderColor: userPicker ? colors.primary : colors.gray5,
                    },
                  ]}
                  onPress={() => handleSelectedItems(item.userId)}>
                  <AvatarComponent url={item.avatar} size={45} />
                  <RowComponent direction="column" flex={1}>
                    <TextComponent
                      text={item.fullName}
                      color={userPicker ? colors.primary : colors.text}
                    />
                    <TextComponent
                      text={item.email}
                      numberOfLines={1}
                      flex={1}
                      color={userPicker ? colors.primary : colors.text}
                    />
                  </RowComponent>
                  {userPicker && (
                    <TickCircle size={22} color={colors.primary} />
                  )}
                </RowComponent>
              );
            })}
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
  wapperContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingTop: 20,
  },
  inputHeader: {marginBottom: 0},
  btnAgreeFooter: {
    justifyContent: 'center',
  },
  wapperInputHeader: {flex: 1},
  wapperFooter: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: colors.gray5,
  },
});
export default DropdownPickerComponent;
