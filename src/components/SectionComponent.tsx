import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
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
