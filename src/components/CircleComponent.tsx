import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
interface Props {
  width?: number;
  height?: number;
  children?: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}
const CircleComponent = (props: Props) => {
  const {children, width, height, bgColor, styles} = props;
  return (
    <View
      style={[
        {
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 999,
          backgroundColor: bgColor,
        },
        styles,
      ]}>
      {children}
    </View>
  );
};

export default CircleComponent;
