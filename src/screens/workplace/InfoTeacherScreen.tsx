import {Image, Linking, StyleSheet} from 'react-native';
import React from 'react';
import {
  ButtonTextComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily} from '../../constants';
import {Call, Sms} from 'iconsax-react-native';

const InfoTeacherScreen = () => {
  const handleContact = (type: 'email' | 'phoneNumber', value: string) => {
    if (type === 'email') {
      Linking.openURL(`mailto:${value}`);
    }
    if (type === 'phoneNumber') {
      Linking.openURL(`tel:${value}`);
    }
  };
  return (
    <ContainerComponent back title="Thông tin giảng viên">
      <RowComponent
        styles={styles.wapperAvatar}
        direction="column"
        align="center"
        gap={20}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://images.unsplash.com/photo-1710322144652-bcea73280334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDh8fHxlbnwwfHx8fHw%3D',
          }}
        />
        <TextComponent text="Nguyễn Văn A" size={18} />
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
            <TextComponent text="Email: example@gmail.com" />
            <ButtonTextComponent
              bgColor={colors.white}
              onPress={() => handleContact('email', 'example@gmail.com')}
              styles={styles.btnContact}
              title="Gửi"
              textColor={colors.primary}
              affix={<Sms color={colors.primary} size={18} />}
            />
          </RowComponent>
          <RowComponent align="center" justify="space-between">
            <TextComponent text="Số điện thoại: 0962391233" />
            <ButtonTextComponent
              bgColor={colors.danger}
              borderColor={colors.danger}
              onPress={() => handleContact('phoneNumber', '0962391233')}
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
  btnContact: {padding: 8},
  title: {
    backgroundColor: colors.gray6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  wapperAvatar: {
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
    resizeMode: 'cover',
  },
});
export default InfoTeacherScreen;
