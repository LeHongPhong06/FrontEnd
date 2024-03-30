/* eslint-disable react-native/no-inline-styles */
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {ArrowRight2} from 'iconsax-react-native';
import React, {useRef, useState} from 'react';
import {
  Modal,
  SectionList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {choisePicker, screens} from '../../constants';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {sectionListProfile} from '../../constants/secionList';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {removeAuth} from '../../redux/silces/authSlice';
import {ProgressFileType} from '../../types';

const ProfileScreen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {removeItem} = useAsyncStorage('auth');
  const modalizeRef = useRef<Modalize>();
  const navigation: any = useNavigation();
  const [imageUrl, setImageUrl] = useState('');
  const [progressUploadFile, setProgressUploadFile] =
    useState<ProgressFileType>();
  const [visableModalUrl, setVisiableModalUrl] = useState(false);
  const [themeDark, setThemeDark] = useState(false);
  const handleOnPress = (key: string) => {
    switch (key) {
      case 'changePassword':
        navigation.navigate(screens.PASSWORD_SCREEN);
        break;
      case 'changeProfile':
        navigation.navigate(screens.ACCOUNT_SCREEN);
        break;
      case 'changeAvatar':
        modalizeRef.current?.open();
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };
  const handleOnPicker = (key: string) => {
    switch (key) {
      case 'camera':
        ImageCropPicker.openCamera({mediaType: 'photo', cropping: true}).then(
          res => console.log('res >> ', res),
        );
        break;
      case 'library':
        ImageCropPicker.openPicker({
          mediaType: 'photo',
          cropping: true,
          width: 180,
          height: 180,
        }).then(file => handleUploadStogare(file));
        break;
      case 'url':
        setVisiableModalUrl(true);
        break;
    }
    modalizeRef.current?.close();
  };
  const handleUploadStogare = async (file: ImageOrVideo) => {
    const path = `/avatars/${file.filename}`;
    const res = storage().ref(path).putFile(file.path);
    res.on('state_changed', task => {
      setProgressUploadFile({
        name: file.filename ?? 'Avatar',
        transfer: task.bytesTransferred,
        total: task.totalBytes,
      });
    });
    res.then(() => {
      storage()
        .ref(path)
        .getDownloadURL()
        .then(url => {
          console.log('object :>> ', url);
        });
    });
    res.catch(() => {
      console.log('Lỗi khi tải lên storage');
    });
  };
  const handleLogout = async () => {
    await removeItem();
    dispatch(removeAuth());
  };
  return (
    <>
      <ContainerComponent back title="Tài khoản">
        <RowComponent
          align="center"
          justify="center"
          direction="column"
          gap={20}
          styles={styles.wapperAvatar}>
          <AvatarComponent size={100} url={dataAuth.avatar} />
          <TextComponent
            text={dataAuth.fullName}
            size={24}
            font={fontFamily.semibold}
          />
        </RowComponent>
        <SectionList
          sections={sectionListProfile}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          renderSectionHeader={({section: {title}}) => (
            <TextComponent
              text={title}
              size={18}
              font={fontFamily.semibold}
              styles={styles.titleSection}
            />
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.itemSection,
                {
                  borderBottomWidth:
                    item.lable !== 'Đăng xuất' &&
                    item.lable !== 'Cài đặt ứng dụng' &&
                    item.lable !== 'Thay đổi mật khẩu'
                      ? 1
                      : 0,
                },
              ]}
              onPress={() => handleOnPress(item.key)}>
              <RowComponent align="center" gap={10}>
                {item.icon}
                <TextComponent
                  text={item.lable}
                  flex={1}
                  color={
                    item.lable === 'Đăng xuất' ? colors.danger : colors.text
                  }
                />
                {item.lable !== 'Giao diện tối' ? (
                  <ArrowRight2 size={12} color={colors.text} />
                ) : (
                  <Switch
                    value={themeDark}
                    trackColor={{false: colors.gray2, true: colors.primary}}
                    thumbColor={themeDark ? colors.white : colors.primary}
                    onValueChange={() => setThemeDark(!themeDark)}
                  />
                )}
              </RowComponent>
            </TouchableOpacity>
          )}
        />
      </ContainerComponent>
      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          handlePosition="inside">
          <SectionComponent styles={styles.container}>
            <RowComponent direction="column">
              {choisePicker.map(item => (
                <RowComponent
                  styles={styles.itemPicker}
                  key={item.key}
                  align="center"
                  gap={12}
                  onPress={() => handleOnPicker(item.key)}>
                  {item.icon}
                  <TextComponent text={item.title} font={fontFamily.semibold} />
                </RowComponent>
              ))}
            </RowComponent>
          </SectionComponent>
        </Modalize>
      </Portal>
      <Modal visible={visableModalUrl} animationType="slide">
        <View style={styles.wapperModalUrl}>
          <RowComponent
            styles={styles.urlContainer}
            gap={10}
            direction="column">
            <TextComponent
              text="Thêm đường dẫn ảnh"
              size={16}
              font={fontFamily.semibold}
            />
            <InputComponent
              value={imageUrl}
              allowClear
              onChange={val => setImageUrl(val)}
              placeholder="https://picture.com"
            />
            <RowComponent align="center" justify="flex-end" gap={20}>
              <TextComponent
                text="Hủy"
                onPress={() => setVisiableModalUrl(false)}
                color={colors.primary}
              />
              <ButtonTextComponent
                title="Thêm"
                onPress={() => {}}
                textColor={colors.white}
              />
            </RowComponent>
          </RowComponent>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wapperAvatar: {
    paddingVertical: 25,
  },
  itemPicker: {
    paddingVertical: 8,
  },
  titleSection: {
    paddingHorizontal: 18,
    marginTop: 12,
    borderBottomColor: colors.gray5,
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  itemSection: {
    paddingHorizontal: 18,
    borderBottomColor: colors.gray5,
    paddingVertical: 12,
  },
  container: {
    paddingTop: 30,
    paddingBottom: 10,
    marginBottom: 0,
  },
  text: {
    padding: 8,
  },
  wapperModalUrl: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urlContainer: {
    minWidth: 340,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
});
export default ProfileScreen;
