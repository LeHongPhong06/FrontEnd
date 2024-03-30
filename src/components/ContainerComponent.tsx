/* eslint-disable react/no-unstable-nested-components */
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft2, Calendar} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  AvatarComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import {globalStyles} from '../assets/styles/globalStyle';
import {colors, fontFamily, screens} from '../constants';
import {useAppSelector} from '../hooks/useRedux';

interface Props {
  back?: boolean;
  title?: string;
  children: ReactNode;
  isScroll?: boolean;
  styles?: StyleProp<ViewStyle>;
}
const ContainerComponent = (props: Props) => {
  const {children, styles, isScroll, title, back} = props;
  const {dataAuth} = useAppSelector(state => state.auth);
  const navigation: any = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressSchedule = () => {
    navigation.navigate(screens.SCHEDULE_SCREEN);
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
                <TextComponent text={'Xin chào!'} color={colors.white} />
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
              text={title}
              size={17}
              font={fontFamily.semibold}
              color={colors.white}
            />
          )}
        </RowComponent>
        <TouchableOpacity onPress={onPressSchedule}>
          <Calendar size={24} color={colors.white} />
        </TouchableOpacity>
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
          {Header()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[globalStyles.container]}>
            {Container()}
          </ScrollView>
        </>
      )}
      {!isScroll && (
        <View style={[globalStyles.container]}>
          {Header()}
          {Container()}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ContainerComponent;
const style = StyleSheet.create({
  header: {
    marginBottom: 0,
    paddingBottom: 12,
    paddingTop: 40,
    backgroundColor: colors.primary,
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
