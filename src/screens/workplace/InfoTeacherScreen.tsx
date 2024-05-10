import {userApi} from '../../apis';
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily} from '../../constants';
import {useQuery} from '@tanstack/react-query';
import {Call, Sms} from 'iconsax-react-native';
import React from 'react';
import {Linking, StyleSheet} from 'react-native';

const InfodataScreen = ({route}: any) => {
  const {userId} = route.params;
  const {data, isLoading} = useQuery({
    queryKey: ['getDatadataDetial', userId],
    queryFn: () => {
      if (userId) {
        return userApi.getById(userId);
      }
    },
  });
  const handleContact = (type: 'email' | 'phoneNumber', value: string) => {
    if (type === 'email') {
      Linking.openURL(`mailto:${value}`);
    }
    if (type === 'phoneNumber') {
      Linking.openURL(`tel:${value}`);
    }
  };
  if (!userId) {
    return <ModalLoading isVisable />;
  }
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  return (
    <ContainerComponent back title="Thông tin giảng viên">
      <RowComponent
        styles={styles.wapperAvatar}
        direction="column"
        align="center"
        gap={20}>
        <AvatarComponent size={100} url={data.avatar} />
        <TextComponent text={data.fullName} size={18} />
        <TextComponent text="Đã hoàn thành 4 công việc được giao" />
      </RowComponent>
      <SpaceComponent height={20} />
      <TextComponent
        styles={styles.title}
        text="Thông tin cá nhân"
        font={fontFamily.semibold}
        size={16}
      />
      <SectionComponent>
        <RowComponent styles={styles.wapperInfo} direction="column" gap={16}>
          <RowComponent align="center" justify="space-between">
            <TextComponent text={data.email} />
            <ButtonTextComponent
              bgColor={colors.white}
              onPress={() => handleContact('email', data.email)}
              styles={styles.btnContact}
              title="Gửi"
              textColor={colors.primary}
              affix={<Sms color={colors.primary} size={18} />}
            />
          </RowComponent>
          <RowComponent align="center" justify="space-between">
            <TextComponent text={`Số điện thoại: ${data.phoneNumber}`} />
            <ButtonTextComponent
              bgColor={colors.danger}
              borderColor={colors.danger}
              onPress={() => handleContact('phoneNumber', data.phoneNumber)}
              styles={styles.btnContact}
              title="Gọi"
              textColor={colors.white}
              affix={<Call color={colors.white} size={18} />}
            />
          </RowComponent>
        </RowComponent>
      </SectionComponent>
      <TextComponent
        text="Bộ môn"
        font={fontFamily.semibold}
        size={16}
        styles={styles.title}
      />
      <SectionComponent>
        <RowComponent
          styles={styles.wapperWorkplace}
          direction="column"
          gap={24}>
          <TextComponent text="Email: example@gmail.com" />
          <TextComponent text="Số điện thoại: 0962391233" />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};
const styles = StyleSheet.create({
  wapperInfo: {paddingVertical: 8},
  wapperWorkplace: {paddingTop: 18},
  btnContact: {padding: 6, borderRadius: 8},
  title: {
    backgroundColor: colors.gray6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  wapperAvatar: {
    paddingVertical: 20,
  },
});
export default InfodataScreen;
