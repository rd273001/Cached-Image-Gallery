import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import OtherScreen from '../screens/OtherScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator backBehavior='order' screenOptions={ ( { drawerType: 'slide', overlayColor: '#00000099' } ) } initialRouteName='Home'>
        <Drawer.Screen name='Home' options={ ( { headerTitle: 'Gallery' } ) } component={ HomeScreen } />
        {/* created just for display for option....  should be another screen */ }
        <Drawer.Screen name='Other' component={ OtherScreen } />
        {/* add screens as required */ }
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;