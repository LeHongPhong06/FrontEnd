/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AvatarComponent, CircleComponent, RowComponent, TextComponent} from '.';
import {colors} from '../constants';
interface Props {
  size?: number;
  urls: string[];
}
const AvatarGroupComponent = (props: Props) => {
  const {urls, size} = props;
  return (
    <RowComponent align="center">
      {urls.map((item, index) => (
        <AvatarComponent
          size={size}
          url={item}
          key={`avt ${index}`}
          style={{
            marginRight: index > 0 ? -10 : 0,
          }}
        />
      ))}
      {urls.length > 5 && (
        <CircleComponent
          width={size}
          height={size}
          bgColor={colors.primary}
          styles={{
            marginRight: -10,
          }}>
          <TextComponent
            text={`+${urls.length - 5}`}
            color={colors.white}
            size={8}
          />
        </CircleComponent>
      )}
    </RowComponent>
  );
};

export default AvatarGroupComponent;
