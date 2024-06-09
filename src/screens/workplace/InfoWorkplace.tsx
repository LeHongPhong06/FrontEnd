import {workplaceApi} from '../../apis';
import {
  ButtonTextComponent,
  CircleComponent,
  ModalLoading,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily, screens} from '../../constants';
import {useAppSelector} from '../../hooks';
import {ShowToast} from '../../utils';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Setting2} from 'iconsax-react-native';
import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';

const InfoWorkplace = () => {
  const navigation: any = useNavigation();
  const {dataAuth} = useAppSelector(state => state.auth);
  const isLeader = dataAuth.roleId === 'Leader';
  const {data, isLoading} = useQuery({
    queryKey: ['getInfowWorkplace', dataAuth.workplaceId],
    queryFn: () => {
      if (dataAuth.workplaceId) {
        return workplaceApi.getWorkplaceById(dataAuth.workplaceId);
      }
    },
  });
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  const handleOnPressUpdateWorkPlace = () => {
    navigation.navigate(screens.UPDATEWORKPLACE_SCREEN, {workplaceInfo: data});
  };
  const handleCopyWorkplaceId = () => {
    Clipboard.setString(data.workplaceId);
    ShowToast('Đã copy mã bộ môn');
  };
  const handlePressJoinList = () => {
    navigation.navigate(screens.REQUESTJOINLIST_SCREEN, {
      workplaceInfo: data,
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <RowComponent
        styles={styles.wapperLogo}
        direction="column"
        align="center"
        gap={20}>
        <Image
          style={styles.logo}
          source={{
            uri:
              data.logo ??
              'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
          }}
        />
        <RowComponent direction="column" gap={8} align="center">
          <TextComponent
            text={data.name}
            uppercase
            font={fontFamily.semibold}
          />
          <RowComponent align="center" gap={6}>
            <TextComponent
              text={data.leader?.fullName ?? 'Chưa bổ nhiệm'}
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
      {isLeader && (
        <>
          <ButtonTextComponent
            bgColor={colors.white}
            title="Danh sách lời mời tham gia"
            onPress={handlePressJoinList}
            styles={styles.btn}
            textColor={colors.primary}
          />
          <SpaceComponent height={20} />
        </>
      )}
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
        <TextComponent text={data.workplaceId} />
        <ButtonTextComponent
          bgColor={colors.white}
          title="Copy mã bộ môn"
          onPress={handleCopyWorkplaceId}
          textColor={colors.primary}
        />
      </RowComponent>
      {isLeader && (
        <ButtonTextComponent
          textColor={colors.white}
          onPress={handleOnPressUpdateWorkPlace}
          styles={styles.btnUpdateWorkplace}
          affix={<Setting2 size={20} color={colors.white} />}
        />
      )}
      <SpaceComponent height={80} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    bottom: 80,
    right: 10,
  },
  btn: {
    borderRadius: 4,
    justifyContent: 'center',
  },
});
export default InfoWorkplace;
