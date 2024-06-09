import React, {ReactNode} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {RowComponent} from '.';
import {colors} from '../constants';

interface Props {
  isVisable: boolean;
  text?: string;
  contentLoad?: ReactNode;
}
const ModalLoading = (props: Props) => {
  const {isVisable} = props;
  return (
    <Modal
      visible={isVisable}
      animationType="slide"
      transparent
      statusBarTranslucent
      style={styles.modal}>
      <View style={styles.wapper}>
        <RowComponent direction="column" gap={10} align="center">
          <ActivityIndicator color={colors.white} size={35} />
        </RowComponent>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  wapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ModalLoading;
