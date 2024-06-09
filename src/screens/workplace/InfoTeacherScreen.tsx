import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Call, Sms} from 'iconsax-react-native';
import React from 'react';
import {Alert, Linking, StyleSheet} from 'react-native';
import {userApi, workplaceApi} from '../../apis';
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addAuth} from '../../redux/silces/authSlice';
import {AlertError, ShowToast, getColor} from '../../utils';

const InfodataScreen = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();
  const {userId} = route.params;
  const queryClient = useQueryClient();
  const {dataAuth} = useAppSelector(state => state.auth);
  const isLeader = dataAuth.roleId === 'Leader';
  const {data, isLoading} = useQuery({
    queryKey: ['getDatadataDetial', userId],
    queryFn: () => {
      if (userId) {
        return userApi.getById(userId);
      }
    },
  });
  const deleteUserFromWorkplace = useMutation({
    mutationKey: ['deletedUserFromWorkplace'],
    mutationFn: () => workplaceApi.deletedUserFromWorkplace(userId),
    onSuccess: res => {
      if (res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['getTeacherListByWorkplaceId', dataAuth.workplaceId],
        });
        ShowToast('Xóa giảng viên khỏi bộ môn thành công');
        navigation.goBack();
      } else {
        AlertError(res.message);
      }
    },
  });
  const franchiseLeader = useMutation({
    mutationKey: ['deletedUserFromWorkplace'],
    mutationFn: () =>
      workplaceApi.franchiseLeader({
        userIdFranchised: userId,
        leaderId: dataAuth.userId,
      }),
    onSuccess: async res => {
      console.log('res.data :>> ', res.data);
      if (res.success === true) {
        const authData = await AsyncStorage.getItem('auth');
        if (authData) {
          const auth = JSON.parse(authData);
          const {access_token} = auth;
          const dataSet = {...res.data, access_token};
          await AsyncStorage.setItem('auth', JSON.stringify(dataSet));
          dispatch(addAuth(dataSet));
          ShowToast('Bạn đã nhượng quyền thành công');
        }
      } else {
        AlertError(res.message);
      }
    },
  });
  if (!userId) {
    return <ModalLoading isVisable />;
  }
  if (!data) {
    return <ModalLoading isVisable={isLoading} />;
  }
  const handleContact = (type: 'email' | 'phoneNumber', value: string) => {
    if (type === 'email') {
      Linking.openURL(`mailto:${value}`);
    }
    if (type === 'phoneNumber') {
      Linking.openURL(`tel:${value}`);
    }
  };
  const handleDeleteUserWorkplace = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa thành viên khỏi bộ môn', [
      {
        text: 'Đóng',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        style: 'destructive',
        onPress: () => deleteUserFromWorkplace.mutate(),
      },
    ]);
  };
  const handleFranchise = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn nhượng quyền trưởng bộ môn', [
      {
        text: 'Đóng',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        style: 'destructive',
        onPress: () => franchiseLeader.mutate(),
      },
    ]);
  };
  return (
    <>
      <ContainerComponent back title="Thông tin giảng viên" isScroll>
        <RowComponent
          styles={styles.wapperAvatar}
          direction="column"
          align="center"
          gap={16}>
          <AvatarComponent size={100} url={data.avatar} />
          <TextComponent
            text={data.user?.fullName}
            size={22}
            font={fontFamily.semibold}
          />
          <RowComponent
            styles={styles.wapperStatistic}
            gap={8}
            justify="center">
            {data.dataTaskStatistic.map((item: any) => {
              const completeLate = item.statusId === 'completedlate';
              return (
                <RowComponent
                  gap={6}
                  key={item.statusId}
                  styles={[
                    styles.itemStatistic,
                    {backgroundColor: getColor(item.statusId)},
                  ]}
                  direction="column"
                  align="center">
                  <TextComponent
                    text={item.total}
                    size={18}
                    font={fontFamily.semibold}
                    color={completeLate ? colors.text : colors.white}
                  />
                  <TextComponent
                    text={item.name}
                    color={completeLate ? colors.text : colors.white}
                  />
                </RowComponent>
              );
            })}
          </RowComponent>
        </RowComponent>
        <TextComponent
          styles={styles.title}
          text="Thông tin cá nhân"
          font={fontFamily.semibold}
          size={16}
        />
        <SectionComponent>
          <RowComponent styles={styles.wapperInfo} direction="column" gap={16}>
            <RowComponent align="center" justify="space-between">
              <TextComponent text={data.user?.email} />
              <ButtonTextComponent
                bgColor={colors.white}
                onPress={() => handleContact('email', data.user?.email)}
                styles={styles.btnContact}
                title="Gửi"
                textColor={colors.primary}
                affix={<Sms color={colors.primary} size={18} />}
              />
            </RowComponent>
            <RowComponent align="center" justify="space-between">
              <TextComponent
                text={`Số điện thoại: ${data.user?.phoneNumber}`}
              />
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
      </ContainerComponent>
      {isLeader && data.user.userId !== dataAuth.userId && (
        <RowComponent
          styles={styles.wapperBtnBottom}
          justify="space-between"
          gap={4}>
          <ButtonTextComponent
            title="Xóa khỏi bộ môn"
            textColor={colors.danger}
            onPress={handleDeleteUserWorkplace}
            bgColor={colors.white}
            borderColor={colors.danger}
            styles={styles.btnDelete}
          />
          <ButtonTextComponent
            title="Nhượng quyền"
            onPress={handleFranchise}
            bgColor={colors.white}
            styles={styles.btnFranchise}
          />
        </RowComponent>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wapperInfo: {
    paddingVertical: 8,
  },
  wapperStatistic: {
    flexWrap: 'wrap-reverse',
  },
  wapperWorkplace: {
    paddingTop: 18,
  },
  wapperBtnBottom: {
    position: 'absolute',
    bottom: 16,
    left: 8,
    right: 8,
  },
  btnContact: {
    padding: 6,
    borderRadius: 8,
  },
  title: {
    backgroundColor: colors.gray6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  wapperAvatar: {
    paddingVertical: 20,
  },
  btnDelete: {
    justifyContent: 'center',
    borderRadius: 8,
  },
  btnFranchise: {
    justifyContent: 'center',
    borderRadius: 8,
    flex: 1,
  },
  itemStatistic: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
});
export default InfodataScreen;
