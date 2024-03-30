import React, {useRef, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {
  ButtonTextComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '.';
import {choisePicker, colors, fontFamily} from '../constants';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';

interface Props {
  onSelect: (val: ImageOrVideo) => void;
  title: string;
  textColor?: string;
}
const ButtonImagePickerComponent = (props: Props) => {
  const {title, textColor, onSelect} = props;
  const modalizeRef = useRef<Modalize>();
  const [imageUrl, setImageUrl] = useState('');
  const [visableModalUrl, setVisiableModalUrl] = useState(false);
  const handleOnVisiable = () => {
    modalizeRef.current?.open();
  };
  const handleOnPicker = (key: string) => {
    switch (key) {
      case 'camera':
        ImageCropPicker.openCamera({mediaType: 'photo', cropping: true}).then(
          res => onSelect(res),
        );
        break;
      case 'library':
        ImageCropPicker.openPicker({
          mediaType: 'photo',
          cropping: true,
          width: 200,
          height: 100,
        }).then(res => onSelect(res));
        break;
      case 'url':
        setVisiableModalUrl(true);
        break;
    }
    modalizeRef.current?.close();
  };
  const handleAddImageUrl = () => {
    modalizeRef.current?.close();
  };
  const handleCloseModalImageUrl = () => {
    setVisiableModalUrl(false);
  };
  return (
    <>
      <TextComponent
        text={title}
        styles={styles.text}
        onPress={handleOnVisiable}
        color={textColor ?? colors.text}
      />
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
                onPress={handleCloseModalImageUrl}
                color={colors.primary}
              />
              <ButtonTextComponent
                title="Thêm"
                onPress={handleAddImageUrl}
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
  container: {
    paddingTop: 30,
    paddingBottom: 10,
    marginBottom: 0,
  },
  text: {
    padding: 8,
  },
  itemPicker: {
    paddingVertical: 8,
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
export default ButtonImagePickerComponent;
