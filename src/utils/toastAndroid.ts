import {ToastAndroid} from 'react-native';

const ShowToast = (message: string) => {
  return ToastAndroid.show(message, 4);
};

export default ShowToast;
