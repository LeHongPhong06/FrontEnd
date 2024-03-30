import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {Setting2} from 'iconsax-react-native';
import React from 'react';
import {Image, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import {
  ButtonTextComponent,
  CircleComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';

const InfoWorkplace = () => {
  const navigation: any = useNavigation();
  const handleCopyWorkplaceId = (workplaceId: string) => {
    Clipboard.setString(workplaceId);
    ToastAndroid.show('Đã copy mã bộ môn', 2);
  };
  const handleOnPressUpdateWorkPlace = () => {
    navigation.navigate(screens.UPDATEWORKPLACE_SCREEN);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <RowComponent
        styles={styles.wapperLogo}
        direction="column"
        align="center"
        gap={20}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://images.pexels.com/photos/19245513/pexels-photo-19245513/free-photo-of-dan-ong-di-d-o-may-nh-nhi-p-nh-gia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
          }}
        />
        <RowComponent direction="column" gap={8} align="center">
          <TextComponent
            text="Khoa học máy tính"
            uppercase
            font={fontFamily.semibold}
          />
          <RowComponent align="center" gap={6}>
            <TextComponent
              text="Nguyễn Văn A"
              size={14}
              font={fontFamily.semibold}
            />
            <CircleComponent width={28} height={14} bgColor={colors.danger}>
              <TextComponent color={colors.white} size={8} text="TBM" />
            </CircleComponent>
          </RowComponent>
        </RowComponent>
      </RowComponent>
      <SpaceComponent height={20} />
      <RowComponent styles={styles.wapperTextInvited} justify="center">
        <TextComponent
          text="Tham gia bộ môn"
          uppercase
          color={colors.primary}
          size={12}
        />
      </RowComponent>
      <RowComponent
        styles={styles.wapperShare}
        direction="column"
        align="center"
        gap={10}>
        <TextComponent
          text="Quét mã QR Code hoặc chia sẻ mã bộ môn để các giảng viên khác tham gia"
          textAlign="center"
          color={colors.gray4}
          size={11}
        />
        <Image
          style={styles.qrCode}
          source={require('../../assets/images/QRcode.png')}
        />
        <TextComponent text="Quét mã QR code" size={10} color={colors.gray4} />
        <TextComponent text="13888C58-28FD-4222-B442-E7AF9691FA58" />
        <ButtonTextComponent
          bgColor={colors.white}
          title="Copy mã bộ môn"
          onPress={() =>
            handleCopyWorkplaceId('13888C58-28FD-4222-B442-E7AF9691FA58')
          }
          textColor={colors.primary}
        />
      </RowComponent>
      <ButtonTextComponent
        textColor={colors.white}
        onPress={handleOnPressUpdateWorkPlace}
        styles={styles.btnUpdateWorkplace}
        affix={<Setting2 size={20} color={colors.white} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingBottom: 58,
  },
  wapperLogo: {
    paddingVertical: 24,
    backgroundColor: colors.gray6,
    borderRadius: 4,
  },
  logo: {
    borderRadius: 4,
    width: 200,
    height: 100,
    resizeMode: 'cover',
  },
  wapperShare: {
    paddingVertical: 8,
  },
  wapperTextInvited: {
    paddingVertical: 8,
    backgroundColor: colors.gray6,
    borderRadius: 4,
  },
  qrCode: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  btnUpdateWorkplace: {
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
});
export default InfoWorkplace;
