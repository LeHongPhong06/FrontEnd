import {Call, User} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ButtonTextComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppSelector} from '../../hooks/useRedux';
import {userApi} from '../../apis';

const AccountScreen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const initialValues = {
    fullName: dataAuth.fullName,
    phoneNumber: dataAuth.phoneNumber,
  };
  const [userValue, setUserValue] = useState(initialValues);
  const {fullName, phoneNumber} = userValue;
  const handleChangeValues = (key: string, value: string) => {
    const data: any = {...userValue};
    data[`${key}`] = value;
    setUserValue(data);
  };
  const handleConfirmChangeProfile = async () => {
    if (dataAuth.userId) {
      try {
        const res = await userApi.updateInfo(dataAuth.userId, userValue);
        if (res.success === true) {
        } else {
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  };
  return (
    <ContainerComponent title="Thay đổi thông tin cá nhân" back>
      <SectionComponent>
        <TextComponent
          styles={styles.title}
          text={`Thông tin cá nhân tài khoản ${dataAuth.email}`}
          color={colors.gray}
        />
        <InputComponent
          allowClear
          placeholder="Nguyễn Văn A"
          affix={<User size={22} color={colors.gray5} />}
          value={fullName}
          onChange={val => handleChangeValues('fullName', val)}
        />
        <InputComponent
          allowClear
          placeholder="+84"
          affix={<Call size={22} color={colors.gray5} />}
          value={phoneNumber}
          onChange={val => handleChangeValues('phoneNumber', val)}
        />
        <ButtonTextComponent
          styles={styles.btnConfirm}
          textColor={colors.white}
          onPress={handleConfirmChangeProfile}
          title="Thay đổi thông tin"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 18,
  },
  btnConfirm: {
    justifyContent: 'center',
  },
});
export default AccountScreen;
