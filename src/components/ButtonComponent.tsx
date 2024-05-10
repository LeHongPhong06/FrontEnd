import React, {ReactNode} from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {TextComponent} from '.';
import {globalStyles} from '../assets';
import {colors} from '../constants';
interface Props {
  title: string;
  bgColor?: string;
  onPress?: () => void;
  textColor?: string;
  styles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  affix?: ReactNode;
  suffix?: ReactNode;
  disable?: boolean;
}
const ButtonComponent = (props: Props) => {
  const {
    disable,
    title,
    onPress,
    textStyles,
    bgColor,
    styles,
    textColor,
    affix,
    suffix,
  } = props;
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        globalStyles.button,
        {
          backgroundColor: disable ? colors.gray5 : bgColor ?? colors.primary,
        },
        styles,
      ]}>
      {affix && affix}
      <TextComponent
        text={title}
        styles={textStyles}
        color={textColor}
        flex={1}
      />
      {suffix && suffix}
    </TouchableOpacity>
  );
};
export default ButtonComponent;
