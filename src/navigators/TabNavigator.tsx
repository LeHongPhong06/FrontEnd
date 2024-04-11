import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AddSquare,
  Category,
  Home2,
  Setting2,
  TaskSquare,
} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  AddWorkNavigator,
  HomeNavigator,
  OrtherNavigator,
  WorkNavigator,
  WorkplaceNavigator,
} from '.';
import {CircleComponent, TextComponent} from '../components';
import {colors, navigator} from '../constants';

const TabNavigator = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.tabsBarStyles,
        tabBarIconStyle: styles.tabsBarIcon,
        tabBarIcon: ({color, size, focused}) => {
          let icon: ReactNode;
          size = 22;
          const variant = focused ? 'Bold' : 'Linear';
          color = focused ? colors.primary : colors.gray5;
          switch (route.name) {
            case navigator.HOME_NAVIGATOR:
              icon = <Home2 size={size} color={color} variant={variant} />;
              break;
            case navigator.WORK_NAVIGATOR:
              icon = <TaskSquare size={size} color={color} variant={variant} />;
              break;
            case navigator.ADDWORK_NAVIGATOR:
              icon = (
                <CircleComponent
                  styles={styles.addIcon}
                  bgColor={colors.primary}
                  width={50}
                  height={50}>
                  <AddSquare size={size} color={colors.white} variant="Bold" />
                </CircleComponent>
              );
              break;
            case navigator.WORKPLACE_NAVIGATOR:
              icon = <Category size={size} color={color} variant={variant} />;
              break;
            case navigator.ORTHER_NAVIGATOR:
              icon = <Setting2 size={size} color={color} variant={variant} />;
              break;
          }
          return icon;
        },
        tabBarLabel: ({color, focused}) => {
          let text: ReactNode;
          const size = 12;
          color = focused ? colors.primary : colors.gray5;
          switch (route.name) {
            case navigator.HOME_NAVIGATOR:
              text = (
                <TextComponent
                  text="Trang chủ"
                  color={color}
                  size={size}
                  styles={styles.lableTabsBar}
                />
              );
              break;
            case navigator.WORK_NAVIGATOR:
              text = (
                <TextComponent
                  text="Công việc"
                  color={color}
                  size={size}
                  styles={styles.lableTabsBar}
                />
              );
              break;
            case navigator.WORKPLACE_NAVIGATOR:
              text = (
                <TextComponent
                  text="Bộ môn"
                  color={color}
                  size={size}
                  styles={styles.lableTabsBar}
                />
              );
              break;
            case navigator.ORTHER_NAVIGATOR:
              text = (
                <TextComponent
                  text="Thêm"
                  color={color}
                  size={size}
                  styles={styles.lableTabsBar}
                />
              );
              break;
            case navigator.ADDWORK_NAVIGATOR:
              text = null;
              break;
          }
          return text;
        },
      })}>
      <Tabs.Screen name={navigator.HOME_NAVIGATOR} component={HomeNavigator} />
      <Tabs.Screen name={navigator.WORK_NAVIGATOR} component={WorkNavigator} />
      <Tabs.Screen
        name={navigator.ADDWORK_NAVIGATOR}
        component={AddWorkNavigator}
      />
      <Tabs.Screen
        name={navigator.WORKPLACE_NAVIGATOR}
        component={WorkplaceNavigator}
      />
      <Tabs.Screen
        name={navigator.ORTHER_NAVIGATOR}
        component={OrtherNavigator}
      />
    </Tabs.Navigator>
  );
};
const styles = StyleSheet.create({
  lableTabsBar: {
    marginBottom: 8,
  },
  addIcon: {
    marginTop: -35,
  },
  tabsBarIcon: {marginTop: 8},
  tabsBarStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    height: Platform.OS === 'ios' ? 84 : 62,
  },
});
export default TabNavigator;
