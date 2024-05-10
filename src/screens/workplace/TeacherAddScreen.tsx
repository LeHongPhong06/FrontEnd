import {workplaceApi} from '../../apis';
import {
  ButtonTextComponent,
  CardComponent,
  ContainerComponent,
  InputComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppSelector} from '../../hooks';
import {ShowToast} from '../../utils';
import Clipboard from '@react-native-clipboard/clipboard';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';

const TeacherAddScreen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const {data, isLoading} = useQuery({
    queryKey: ['getInfowWorkplace', dataAuth.workplaceId],
    queryFn: () => {
      if (dataAuth.workplaceId) {
        return workplaceApi.getWorkplaceById(dataAuth.workplaceId);
      }
    },
  });
  const handleSendEmail = useMutation({
    mutationKey: ['addMemberByEmail'],
    mutationFn: async () => {
      if (dataAuth.workplaceId) {
        return await workplaceApi.addMemberByEmail({
          email,
          workplaceId: dataAuth.workplaceId,
        });
      }
    },
  });
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  const handleCopyWorkplaceId = () => {
    Clipboard.setString(data.workplaceId);
    ShowToast('Sao chép mã bộ môn thành công');
  };
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
                onPress={() => handleSendEmail.mutate()}
                textColor={colors.primary}
              />
            </RowComponent>
          </CardComponent>
          <CardComponent title="Chia sẻ mã bộ môn">
            <RowComponent direction="column" align="center" gap={20}>
              <TextComponent text={data.workplaceId} />
              <ButtonTextComponent
                bgColor={colors.white}
                title="Sao chép mã bộ môn"
                onPress={handleCopyWorkplaceId}
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
