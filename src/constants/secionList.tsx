/* eslint-disable react/react-in-jsx-scope */
import {
  Camera,
  Element,
  InfoCircle,
  Lock,
  Logout,
  Moon,
  PathTool,
  Profile2User,
  User,
} from 'iconsax-react-native';
import {colors} from './colors';

export const sectionListProfile = [
  {
    title: 'Cá nhân',
    data: [
      {
        icon: <Camera size={18} color={colors.text} />,
        lable: 'Đổi ảnh đại diện',
        key: 'changeAvatar',
      },
      {
        icon: <User size={18} color={colors.text} />,
        lable: 'Thay đổi thông tin cá nhân',
        key: 'changeProfile',
      },
      {
        icon: <Lock size={18} color={colors.text} />,
        lable: 'Thay đổi mật khẩu',
        key: 'changePassword',
      },
    ],
  },
  {
    title: 'Cài đặt',
    data: [
      {
        icon: <Moon size={18} color={colors.text} />,
        lable: 'Giao diện tối',
        key: 'appTheme',
      },
      {
        icon: <Element size={18} color={colors.text} />,
        lable: 'Cài đặt ứng dụng',
        key: 'appSetting',
      },
    ],
  },
  {
    title: 'Khác',
    data: [
      {
        icon: <Profile2User size={18} color={colors.text} />,
        lable: 'Về chúng tôi',
        key: 'aboutUs',
      },
      {
        icon: <PathTool size={18} color={colors.text} />,
        lable: 'Đặt câu hỏi',
        key: 'faq',
      },
      {
        icon: <InfoCircle size={18} color={colors.text} />,
        lable: 'Hỗ trợ và phản hồi',
        key: 'help',
      },
      {
        icon: <Logout size={18} color={colors.danger} />,
        lable: 'Đăng xuất',
        key: 'logout',
      },
    ],
  },
];
