import {ArrowRight} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, TextInput} from 'react-native';
import {
  ButtonComponent,
  CircleComponent,
  ContainerAuthComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';

const VerificationScreen = ({route}: any) => {
  const {email} = route.params;
  const input1 = useRef<any>();
  const input2 = useRef<any>();
  const input3 = useRef<any>();
  const input4 = useRef<any>();
  const [codeVerify, setCodeVerify] = useState<string[]>([]);
  useEffect(() => {
    input1.current.focus();
  }, []);
  const handleChangeCodeVerify = (index: number, val: string) => {
    const item = [...codeVerify];
    item[index] = val;
    setCodeVerify(item);
  };
  return (
    <ContainerAuthComponent isBack title="Xác thực địa chỉ email">
      <TextComponent
        text={`Chúng tôi đã gửi cho bạn mã xác minh qua địa chỉ email ${
          email ?? ''
        }`}
        styles={styles.title}
      />
      <SpaceComponent height={26} />
      <RowComponent align="center" gap={20}>
        <TextInput
          ref={input1}
          placeholder="_"
          maxLength={1}
          onChangeText={val => {
            val.length > 0 && input2.current.focus();
            handleChangeCodeVerify(1, val);
          }}
          placeholderTextColor={colors.gray5}
          value={codeVerify[0]}
          keyboardType="number-pad"
          style={styles.inputNumber}
        />
        <TextInput
          ref={input2}
          placeholder="_"
          onChangeText={val => {
            val.length > 0 && input3.current.focus();
            handleChangeCodeVerify(2, val);
          }}
          placeholderTextColor={colors.gray5}
          value={codeVerify[0]}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.inputNumber}
        />
        <TextInput
          ref={input3}
          placeholder="_"
          onChangeText={val => {
            val.length > 0 && input4.current.focus();
            handleChangeCodeVerify(3, val);
          }}
          placeholderTextColor={colors.gray5}
          value={codeVerify[0]}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.inputNumber}
        />
        <TextInput
          ref={input4}
          placeholder="_"
          onChangeText={val => handleChangeCodeVerify(4, val)}
          placeholderTextColor={colors.gray5}
          value={codeVerify[0]}
          maxLength={1}
          keyboardType="number-pad"
          style={styles.inputNumber}
        />
      </RowComponent>
      <SpaceComponent height={36} />
      <SectionComponent>
        <ButtonComponent
          title="Tiếp tục"
          textColor={colors.white}
          textStyles={styles.textBtnSend}
          suffix={
            <CircleComponent width={30} height={30} bgColor="rgba(0,0,0,0.1)">
              <ArrowRight size={18} color={colors.white} />
            </CircleComponent>
          }
        />
      </SectionComponent>
    </ContainerAuthComponent>
  );
};
const styles = StyleSheet.create({
  title: {
    maxWidth: 320,
  },
  inputNumber: {
    borderWidth: 1,
    height: 55,
    width: 55,
    borderRadius: 12,
    padding: 12,
    borderColor: colors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
  },
  imageBg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    flex: 1,
  },
  textBtnSend: {
    fontFamily: fontFamily.semibold,
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 28,
    textAlign: 'center',
  },
});
export default VerificationScreen;
