import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Category, Profile2User, Setting2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {TextComponent} from '../components';
import {colors, navigator} from '../constants';
import ManagerUserNavigator from './ManagerUserNavigator';
import ManagerWorkplaceNavigator from './ManagerWorkplaceNavigator';
import OrtherNavigator from './OrtherNavigator';

const TabAdminNavigator = () => {
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
            case navigator.MANAGERUSER_NAVIGATOR:
              icon = (
                <Profile2User size={size} color={color} variant={variant} />
              );
              break;
            case navigator.MANAGERWORKPLACE_NAVIGATOR:
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
            case navigator.MANAGERUSER_NAVIGATOR:
              text = (
                <TextComponent
                  text="Người dùng"
                  color={color}
                  size={size}
                  styles={styles.lableTabsBar}
                />
              );
              break;
            case navigator.MANAGERWORKPLACE_NAVIGATOR:
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
          }
          return text;
        },
      })}>
      <Tabs.Screen
        name={navigator.MANAGERUSER_NAVIGATOR}
        component={ManagerUserNavigator}
      />
      <Tabs.Screen
        name={navigator.MANAGERWORKPLACE_NAVIGATOR}
        component={ManagerWorkplaceNavigator}
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
export default TabAdminNavigator;
