import React, {ReactNode} from 'react';
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {TextComponent} from '.';
import {colors} from '../constants';
interface Props {
  title?: string;
  onPress: () => void;
  affix?: ReactNode;
  suffix?: ReactNode;
  bgColor?: string;
  textColor?: string;
  styles?: StyleProp<ViewStyle>;
  borderColor?: string;
  textStyle?: StyleProp<TextStyle>;
  disable?: boolean;
}
const ButtonTextComponent = (props: Props) => {
  const {
    title,
    onPress,
    affix,
    suffix,
    bgColor,
    borderColor,
    textColor,
    styles,
    textStyle,
    disable,
  } = props;
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 12,
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 6,
          padding: 12,
          backgroundColor: disable ? colors.gray3 : bgColor ?? colors.primary,
          borderWidth: 1,
          borderColor: disable ? colors.gray3 : borderColor ?? colors.primary,
        },
        styles,
      ]}>
      {affix && affix}
      {title && (
        <TextComponent
          text={title}
          color={disable ? colors.white : textColor ?? colors.primary}
          styles={[
            {
              marginHorizontal: 10,
            },
            textStyle,
          ]}
        />
      )}
      {suffix && suffix}
    </TouchableOpacity>
  );
};

export default ButtonTextComponent;
