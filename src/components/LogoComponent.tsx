import React from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';

interface Props {
  url?: string;
  style?: StyleProp<ImageStyle>;
  size: number;
}
const LogoComponent = (props: Props) => {
  const {url, size, style} = props;
  return url ? (
    <Image
      resizeMode="cover"
      style={[
        {
          width: size,
          height: size / 2,
        },
        style,
      ]}
      source={{
        uri: url,
      }}
    />
  ) : (
    <Image
      style={{
        width: size,
        height: size / 2,
      }}
      source={require('../assets/images/imgae-notfound.jpg')}
      resizeMode="contain"
    />
  );
};

export default LogoComponent;
