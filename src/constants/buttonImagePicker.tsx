import {Camera, Link2, Image} from 'iconsax-react-native';
import {colors} from '.';

export const choisePicker = [
  {
    key: 'camera',
    title: 'Chụp ảnh',
    icon: <Camera color={colors.text} size={22} />,
  },
  {
    key: 'library',
    title: 'Chọn từ bộ sưu tập',
    icon: <Image color={colors.text} size={22} />,
  },
  {
    key: 'url',
    title: 'Đường dẫn ảnh',
    icon: <Link2 color={colors.text} size={22} />,
  },
];
