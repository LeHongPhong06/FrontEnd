import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {RowComponent, TextComponent} from '.';
import {colors} from '../constants';

interface Props {
  children: ReactNode;
  title?: string;
}
const CardComponent = (props: Props) => {
  const {children, title} = props;
  return (
    <View style={styles.container}>
      <RowComponent justify="center" styles={styles.title}>
        <TextComponent
          textAlign="center"
          text={title}
          color={colors.primary}
          size={13}
          uppercase
        />
      </RowComponent>
      <View style={styles.wapper}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.gray3,
  },
  title: {
    backgroundColor: colors.gray6,
    paddingVertical: 6,
  },
  wapper: {
    padding: 16,
  },
});
export default CardComponent;
