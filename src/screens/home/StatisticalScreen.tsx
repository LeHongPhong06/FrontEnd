import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ButtonTextComponent,
  ContainerComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';

const StatisticalScreen = () => {
  return (
    <>
      <ContainerComponent back title="Thống kê" isScroll>
        <TextComponent />
      </ContainerComponent>
      <ButtonTextComponent
        title="Lọc"
        textColor={colors.white}
        onPress={() => {}}
        styles={styles.btnFilter}
      />
    </>
  );
};

const styles = StyleSheet.create({
  btnFilter: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
  },
  wapperSelect: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.gray6,
  },
  itemSelect: {
    borderRadius: 6,
    paddingVertical: 8,
  },
});
export default StatisticalScreen;
