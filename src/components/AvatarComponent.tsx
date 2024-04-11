/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Image, StyleProp, ImageStyle} from 'react-native';
import React from 'react';
import {colors} from '../constants';
import {User} from 'iconsax-react-native';
import {RowComponent} from '.';

interface Props {
  url?: string;
  style?: StyleProp<ImageStyle>;
  size: number;
}
const AvatarComponent = (props: Props) => {
  const {url, size, style} = props;
  return url ? (
    <Image
      style={[
        {
          resizeMode: 'cover',
          width: size ?? 24,
          height: size ?? 24,
          borderRadius: 999,
        },
        style,
      ]}
      source={{
        uri: url,
      }}
    />
  ) : (
    <RowComponent
      align="center"
      justify="center"
      styles={[
        styles.wapperIcon,
        {
          borderWidth: size > 90 ? 3 : 1.5,
          width: size ?? 24,
          height: size ?? 24,
        },
      ]}>
      <User color={colors.gray5} size={size ? size / 2 + 8 : 12} />
    </RowComponent>
  );
};

const styles = StyleSheet.create({
  wapperIcon: {
    borderColor: colors.gray5,
    backgroundColor: colors.white,
    borderRadius: 999,
  },
});
export default AvatarComponent;
