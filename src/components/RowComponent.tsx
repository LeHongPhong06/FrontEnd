import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {globalStyles} from '../assets/styles/globalStyle';
interface Props {
  children: ReactNode;
  justify?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  align?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'baseline'
    | 'stretch'
    | undefined;
  gap?: number;
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse' | undefined;
  flex?: number;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
const RowComponent = (props: Props) => {
  const {children, justify, align, styles, gap, direction, flex, onPress} =
    props;
  const styleGroup = [
    globalStyles.row,
    {
      flex: flex ?? 0,
      flexDirection: direction ?? 'row',
      gap: gap,
      justifyContent: justify,
      alignItems: align,
    },
    styles,
  ];
  return onPress ? (
    <TouchableOpacity onPress={onPress} style={styleGroup}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={styleGroup}>{children}</View>
  );
};

export default RowComponent;
