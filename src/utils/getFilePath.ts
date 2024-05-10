import {Platform} from 'react-native';
import {DocumentPickerResponse} from 'react-native-document-picker';
import RNFetchBold from 'rn-fetch-blob';
export const getFilePath = async (file: DocumentPickerResponse) => {
  if (Platform.OS === 'ios') {
    return file.uri;
  } else {
    return (await RNFetchBold.fs.stat(file.uri)).path;
  }
};
