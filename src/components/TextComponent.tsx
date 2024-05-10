import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {colors, fontFamily} from '../constants';

interface Props {
  italic?: boolean;
  text?: string | number;
  size?: number;
  color?: string;
  font?: string;
  styles?: StyleProp<TextStyle>;
  onPress?: () => void;
  flex?: number;
  textAlign?: 'center' | 'justify' | 'auto' | 'right' | 'left' | undefined;
  uppercase?: boolean;
  numberOfLines?: number;
}
const TextComponent = (props: Props) => {
  const {
    italic,
    text,
    styles,
    font,
    color,
    size,
    onPress,
    flex,
    textAlign,
    uppercase,
    numberOfLines,
  } = props;
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[
        {
          flex: flex,
          textAlign: textAlign,
          textTransform: uppercase ? 'uppercase' : 'none',
          color: color ?? colors.text,
          fontSize: size ?? 14,
          fontFamily: font ?? fontFamily.medium,
          fontStyle: italic ? 'italic' : 'normal',
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
