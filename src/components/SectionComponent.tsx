import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {colors} from '../constants';
interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}
const SectionComponent = (props: Props) => {
  const {children, styles} = props;
  return (
    <View
      style={[
        {
          backgroundColor: colors.white,
          paddingHorizontal: 16,
          marginBottom: 16,
        },
        styles,
      ]}>
      {children}
    </View>
  );
};

export default SectionComponent;
