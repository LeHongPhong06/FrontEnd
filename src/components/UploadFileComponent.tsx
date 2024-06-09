import {CloseCircle, DocumentUpload} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {RowComponent, TextComponent} from '.';
import {globalStyles} from '../assets';
import {colors} from '../constants';
import {calcFileSize} from '../utils';
interface Props {
  onUpload: (file: DocumentPickerResponse[]) => void;
  label?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}
const UploadFileComponent = (props: Props) => {
  const {onUpload, label, style, placeholder} = props;
  const [filePicker, setFilePicker] = useState<DocumentPickerResponse[]>([]);
  const handleUploadPicker = () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [
        DocumentPicker.types.pdf,
        DocumentPicker.types.doc,
        DocumentPicker.types.xls,
        DocumentPicker.types.xlsx,
        DocumentPicker.types.images,
      ],
    })
      .then(file => {
        const files = [...filePicker];
        files.push(file[0]);
        setFilePicker(files);
        onUpload(files);
      })
      .catch(() => {});
  };
  const handleRemoveFileSelected = (uri: string) => {
    const files = [...filePicker];
    const index = files.findIndex(file => file.uri === uri);
    if (index !== -1) {
      files.splice(index, 1);
    }
    setFilePicker(files);
    onUpload(files);
  };
  return (
    <View>
      {label && <TextComponent text={label} styles={styles.label} />}
      <RowComponent
        onPress={handleUploadPicker}
        styles={[globalStyles.inputContainer, style]}
        direction="column"
        justify="flex-start">
        <RowComponent gap={6} styles={styles.wapperFileSeleted}>
          {filePicker.length > 0 ? (
            filePicker.map(file => (
              <RowComponent
                align="center"
                styles={styles.fileSecleted}
                gap={8}
                key={`file${(file.name, Date.now().toLocaleString())}`}>
                <RowComponent direction="column">
                  <TextComponent text={file.name ?? ''} size={12} />
                  <TextComponent
                    text={calcFileSize(file.size ?? 0)}
                    size={12}
                  />
                </RowComponent>
                <CloseCircle
                  size={16}
                  color={colors.gray5}
                  onPress={() => handleRemoveFileSelected(file.uri)}
                />
              </RowComponent>
            ))
          ) : (
            <RowComponent>
              <TextComponent
                text={placeholder ?? 'Chọn file tài liệu'}
                color={colors.gray5}
                flex={1}
              />
              <DocumentUpload size={24} color={colors.gray5} />
            </RowComponent>
          )}
        </RowComponent>
      </RowComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  wapperFileSeleted: {
    flexWrap: 'wrap',
  },
  label: {
    marginBottom: 10,
  },
  fileSecleted: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 8,
  },
});
export default UploadFileComponent;
