import {ArrowDown2, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {
  AvatarComponent,
  ButtonComponent,
  ButtonTextComponent,
  RowComponent,
  TextComponent,
} from '.';
import {globalStyles} from '../assets';
import {colors, fontFamily} from '../constants';
import {UserType} from '../types';

interface Props {
  userList: UserType[];
  value: string;
  onSeclect: (value: string) => void;
  label?: string;
  required?: boolean;
}
const DropdownSingleComponent = (props: Props) => {
  const {value, userList, label, required, onSeclect} = props;
  const modalizeRef = useRef<Modalize>();
  const [userIdSelected, setUserIdSelected] = useState('');
  const [isVisibleModalizer, setIsVisibleModalize] = useState(false);
  useEffect(() => {
    if (isVisibleModalizer) {
      modalizeRef.current?.open();
    }
  }, [isVisibleModalizer]);
  useEffect(() => {
    if (value && isVisibleModalizer) {
      setUserIdSelected(value);
    }
  }, [value, isVisibleModalizer]);
  const handleSeclect = () => {
    setIsVisibleModalize(true);
  };
  const handleSelectedUser = (userId: string) => {
    setUserIdSelected(userId);
  };
  const handleConfirmSeclect = () => {
    onSeclect(userIdSelected);
    modalizeRef.current?.close();
  };
  const handleColse = () => {
    modalizeRef.current?.close();
  };
  const userPicker = (userId: string) => {
    const user = userList.find(item => item.userId === userId);
    return <TextComponent text={user?.fullName} />;
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
            userPicker(value)
          ) : (
            <RowComponent align="center">
              <TextComponent
                text="Chọn người đảm nhiệm"
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
                text="Chọn người đảm nhiệm"
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
            {userList.length > 0 &&
              userList.map(user => {
                const isSelected = userIdSelected === user.userId;
                return (
                  <RowComponent
                    gap={12}
                    align="center"
                    key={user.userId}
                    styles={[
                      styles.itemSelect,
                      {
                        borderColor: isSelected ? colors.primary : colors.gray5,
                      },
                    ]}
                    onPress={() => handleSelectedUser(user.userId)}>
                    <AvatarComponent size={45} url={user.avatar} />
                    <RowComponent direction="column" flex={1} gap={4}>
                      <TextComponent
                        flex={1}
                        text={user.fullName}
                        color={isSelected ? colors.primary : colors.text}
                      />
                      <TextComponent
                        flex={1}
                        text={user.email}
                        color={isSelected ? colors.primary : colors.text}
                      />
                    </RowComponent>
                    {isSelected && (
                      <TickCircle size={22} color={colors.primary} />
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  textBtnAgree: {
    textAlign: 'center',
  },
});
export default DropdownSingleComponent;
