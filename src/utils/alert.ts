import {Alert} from 'react-native';
interface Props {
  textConfirm: string;
  onConfirm: () => void;
}

export const AlertError = (message: string) => {
  return Alert.alert('Lỗi', message, [{text: 'Đóng', style: 'cancel'}]);
};

export const AlertConfirm = (props: Props) => {
  const {textConfirm, onConfirm} = props;
  return Alert.alert('Xác nhận', textConfirm, [
    {
      text: 'Từ chối',
      style: 'cancel',
    },
    {
      text: 'Đồng ý',
      style: 'destructive',
      onPress: onConfirm,
    },
  ]);
};
