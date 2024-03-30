import React, {useState} from 'react';
import {Image, StyleSheet, ToastAndroid} from 'react-native';
import {
  ButtonTextComponent,
  CardComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';
import Clipboard from '@react-native-clipboard/clipboard';
import {Sms} from 'iconsax-react-native';

const TeacherAddScreen = () => {
  const [email, setEmail] = useState('');
  const handleCopyWorkplaceId = (workplaceId: string) => {
    Clipboard.setString(workplaceId);
    ToastAndroid.show('Sao chép mã bộ môn thành công', ToastAndroid.TOP);
  };
  const handleSendEmail = () => {};
  return (
    <ContainerComponent back title="Mời giảng viên" isScroll>
      <SectionComponent>
        <RowComponent direction="column" gap={16}>
          <CardComponent title="Mời qua mã QRCode">
            <RowComponent direction="column" align="center" gap={20}>
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
            </RowComponent>
          </CardComponent>
          <CardComponent title="Gửi qua địa chỉ Email">
            <RowComponent direction="column" align="center" gap={10}>
              <InputComponent
                value={email}
                allowClear
                style={styles.inputEmail}
                affix={<Sms size={20} color={colors.gray5} />}
                onChange={val => setEmail(val)}
                placeholder="example@gmail.com"
              />
              <ButtonTextComponent
                bgColor={colors.white}
                title="Gửi"
                disable={email ? false : true}
                onPress={handleSendEmail}
                textColor={colors.primary}
              />
            </RowComponent>
          </CardComponent>
          <CardComponent title="Chia sẻ mã bộ môn">
            <RowComponent direction="column" align="center" gap={20}>
              <TextComponent text="13888C58-28FD-4222-B442-E7AF9691FA58" />
              <ButtonTextComponent
                bgColor={colors.white}
                title="Sao chép mã bộ môn"
                onPress={() =>
                  handleCopyWorkplaceId('13888C58-28FD-4222-B442-E7AF9691FA58')
                }
                textColor={colors.primary}
              />
            </RowComponent>
          </CardComponent>
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  qrCode: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  inputEmail: {
    marginBottom: 0,
  },
});
export default TeacherAddScreen;
