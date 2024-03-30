import storage from '@react-native-firebase/storage';
import {CloseCircle} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {
  ButtonImagePickerComponent,
  ButtonTextComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';
import {ProgressFileType} from '../../types';
import {calcFileSize} from '../../utils/calcFileSize';

const UpdateWorkplaceScreen = () => {
  const initialState = {
    logo: '',
    name: '',
  };
  const [workplace, setWorkplace] = useState(initialState);
  const [filePicker, setFilePicker] = useState<ImageOrVideo>();
  const [progressUploadFile, setProgressUploadFile] =
    useState<ProgressFileType>();
  const handleChangeWorkplace = (id: string, value: string) => {
    const data: any = {...workplace};
    data[`${id}`] = value;
    setWorkplace(data);
  };
  const handleUploadFileToStorage = () => {
    if (filePicker) {
      const path = `/documents/${
        filePicker.filename ?? filePicker.modificationDate
      }`;
      const res = storage().ref(path).putFile(filePicker.path);
      res.on('state_changed', task => {
        setProgressUploadFile({
          transfer: task.bytesTransferred,
          total: task.totalBytes,
        });
      });
      res.then(() => {
        storage()
          .ref(path)
          .getDownloadURL()
          .then(url => handleChangeWorkplace('logo', url));
      });
      res.catch(() => {
        console.log('Lỗi khi tải lên storage');
      });
    }
  };
  const handleCloseFilePicker = () => {
    setFilePicker(undefined);
  };
  const handleUpdateWorkplace = () => {
    handleUploadFileToStorage();
  };
  return (
    <ContainerComponent back title="Cập nhật bộ môn">
      <SectionComponent>
        <RowComponent
          direction="column"
          align="center"
          gap={10}
          styles={styles.wapperLogo}>
          <Image
            style={styles.imageLogo}
            source={{
              uri: 'https://images.unsplash.com/photo-1682685795557-976f03aca7b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8',
            }}
          />
          <ButtonImagePickerComponent
            onSelect={file => setFilePicker(file)}
            title="Thay đổi hình ảnh"
            textColor={colors.primary}
          />
          {filePicker && (
            <RowComponent styles={styles.filePicker} gap={8} align="center">
              <RowComponent direction="column">
                <TextComponent
                  text={
                    filePicker.filename ??
                    `${filePicker.modificationDate}.${filePicker.mime}`
                  }
                />
                <TextComponent text={calcFileSize(filePicker.size)} size={15} />
              </RowComponent>
              <CloseCircle
                color={colors.gray5}
                size={18}
                onPress={handleCloseFilePicker}
              />
            </RowComponent>
          )}
        </RowComponent>
        <SpaceComponent height={50} />
        <InputComponent
          lable="Tên bộ môn"
          placeholder="Nhập tên bộ môn"
          value={workplace.name}
          onChange={val => handleChangeWorkplace('name', val)}
        />
        <RowComponent justify="center">
          <ButtonTextComponent
            title="Cập nhật"
            onPress={handleUpdateWorkplace}
            textColor={colors.white}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};
const styles = StyleSheet.create({
  filePicker: {
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray5,
  },
  wapperLogo: {
    paddingVertical: 20,
  },
  imageLogo: {
    width: 200,
    height: 100,
    borderRadius: 4,
    resizeMode: 'cover',
  },
});
export default UpdateWorkplaceScreen;
