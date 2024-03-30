import {ArrowDown2, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '.';
import {globalStyles} from '../assets/styles/globalStyle';
import {colors, fontFamily} from '../constants';

type User = {
  id: number;
  name: string;
  email: string;
};
interface Props {
  userList: User[];
  value: string | number;
  onSeclect: (value: string | number) => void;
  label?: string;
  required?: boolean;
}
const DropdownSingleComponent = (props: Props) => {
  const {value, userList, label, required, onSeclect} = props;
  const modalizeRef = useRef<Modalize>();
  const [userIdSelected, setUserIdSelected] = useState(0);
  const [isVisibleModalizer, setIsVisibleModalize] = useState(false);
  useEffect(() => {
    if (isVisibleModalizer) {
      modalizeRef.current?.open();
    }
  }, [isVisibleModalizer]);
  const handleSeclect = () => {
    setIsVisibleModalize(true);
  };
  const handleSelectedUser = (id: number) => {
    setUserIdSelected(id);
  };
  const handleConfirmSeclect = () => {
    onSeclect(userIdSelected);
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
          onPress={handleSeclect}>
          {value ? (
            <TextComponent text={String(value)} />
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
                text="Chọn người đảm nhiệm"
                size={16}
                font={fontFamily.semibold}
              />
            </View>
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
          <SectionComponent styles={styles.wapperContainer}>
            {userList.length > 0 &&
              userList.map(user => (
                <RowComponent
                  styles={styles.itemSelect}
                  align="center"
                  key={user.id}
                  onPress={() => handleSelectedUser(user.id)}>
                  <TextComponent
                    flex={1}
                    text={user.name}
                    color={
                      userIdSelected === user.id ? colors.primary : colors.text
                    }
                  />
                  {userIdSelected === user.id && (
                    <TickCircle size={18} color={colors.primary} />
                  )}
                </RowComponent>
              ))}
          </SectionComponent>
        </Modalize>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  btnAgree: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  wapperContainer: {marginTop: 10, marginBottom: 0},
  label: {
    marginBottom: 10,
  },
  itemSelect: {
    paddingVertical: 8,
  },
  textBtnAgree: {
    textAlign: 'center',
  },
});
export default DropdownSingleComponent;
