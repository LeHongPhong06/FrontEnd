/* eslint-disable react/no-unstable-nested-components */
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {globalStyles} from '../assets';
import {colors, fontFamily} from '../constants';
import {useAppSelector} from '../hooks';
import AvatarComponent from './AvatarComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
interface Props {
  back?: boolean;
  title?: string;
  children: ReactNode;
  isScroll?: boolean;
  header?: ReactNode;
  styles?: StyleProp<ViewStyle>;
}
const ContainerAdminComponent = (props: Props) => {
  const {children, styles, isScroll, title, back, header} = props;
  const {dataAuth} = useAppSelector(state => state.auth);
  const navigation: any = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };

  const Header = (): ReactNode => (
    <SectionComponent styles={[style.header]}>
      <RowComponent align="center" justify="space-between">
        <RowComponent align="center">
          {back ? (
            <TouchableOpacity onPress={onPressBack} style={style.btnBack}>
              <ArrowLeft2 size={20} color={colors.white} />
            </TouchableOpacity>
          ) : (
            <RowComponent gap={18} align="center">
              <AvatarComponent size={46} url={dataAuth.avatar} />
              <RowComponent direction="column">
                <TextComponent text={'Xin chào admin!'} color={colors.white} />
                <TextComponent
                  text={dataAuth.fullName}
                  font={fontFamily.semibold}
                  size={17}
                  color={colors.white}
                />
              </RowComponent>
            </RowComponent>
          )}
          {title && <SpaceComponent width={20} />}
          {title && (
            <TextComponent
              numberOfLines={1}
              text={title}
              styles={style.title}
              size={17}
              font={fontFamily.semibold}
              color={colors.white}
            />
          )}
        </RowComponent>
      </RowComponent>
    </SectionComponent>
  );
  const Container = (): ReactNode => {
    return <View style={[style.containerChildren, styles]}>{children}</View>;
  };
  return (
    <SafeAreaView style={[globalStyles.container]}>
      {isScroll && (
        <>
          {header ?? Header()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[globalStyles.container]}>
            {Container()}
          </ScrollView>
        </>
      )}
      {!isScroll && (
        <View style={[globalStyles.container]}>
          {header ?? Header()}
          {Container()}
        </View>
      )}
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    marginBottom: 0,
    paddingBottom: 12,
    paddingTop: 40,
    backgroundColor: colors.primary,
  },
  title: {
    maxWidth: Dimensions.get('window').width * 0.7,
  },
  btnBack: {
    padding: 2,
  },
  containerChildren: {paddingTop: 20, flex: 1},
  imageLogo: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
});
export default ContainerAdminComponent;
