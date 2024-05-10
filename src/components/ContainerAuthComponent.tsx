import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SectionComponent, SpaceComponent, TextComponent} from '.';
import {colors, fontFamily} from '../constants';

interface Props {
  children: ReactNode;
  isBack?: boolean;
  title?: string;
}
const ContainerAuthComponent = (props: Props) => {
  const navigation = useNavigation();
  const {children, isBack, title} = props;
  const handlePressBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <ImageBackground
        source={require('../assets/images/bgSplash.png')}
        imageStyle={styles.imageBg}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SectionComponent styles={styles.section}>
            <SpaceComponent height={StatusBar.currentHeight} />
            {isBack && (
              <>
                <SpaceComponent height={18} />
                <TouchableOpacity onPress={handlePressBack}>
                  <ArrowLeft size={26} color={colors.text} />
                </TouchableOpacity>
                <SpaceComponent height={20} />
              </>
            )}
            {title && (
              <>
                <TextComponent
                  text={title}
                  font={fontFamily.semibold}
                  size={24}
                />
                <SpaceComponent height={20} />
              </>
            )}
            {children}
          </SectionComponent>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  section: {backgroundColor: 'transparent'},
  imageBg: {
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    flex: 1,
  },
});
export default ContainerAuthComponent;
