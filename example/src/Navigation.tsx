import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PSBottomTabBar } from 'react-native-ps-bottom-tabbar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons';
import { DiscoverScreen, HomeScreen, LibraryScreen, PSScreen, SearchScreen } from './Screens';

const Tab = createBottomTabNavigator();
export enum Routes {
  Play = 'Play',
  Discover = 'Discover',
  Playstation = 'Playstation',
  Library = 'Library',
  Search = 'Search'
}

const TABS = {
  [Routes.Play]: { icon: <FontAwesome5 name='gamepad' size={24} color='white' />, label: Routes.Play },
  [Routes.Discover]: { icon: <Ionicons name='rocket' size={24} color='white' />, label: Routes.Discover },
  [Routes.Playstation]: { icon: <Fontisto name='playstation' size={24} color='white' />, label: Routes.Playstation },
  [Routes.Library]: { icon: <Ionicons name='menu' size={24} color='white' />, label: Routes.Library },
  [Routes.Search]: { icon: <FontAwesome name='search' size={24} color='white' />, label: Routes.Search },
};
export const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style='auto' />
        <Tab.Navigator
          tabBar={props =>
            <PSBottomTabBar{...props} />
          }
          screenOptions={({ route: { name } }) => ({
            headerShown: false,
            // @ts-ignore
            tabBarIcon: TABS[name].icon,
          })}
        >
          <Tab.Screen name={Routes.Play} component={HomeScreen} />
          <Tab.Screen name={Routes.Discover} component={DiscoverScreen} />
          <Tab.Screen name={Routes.Playstation} component={PSScreen} />
          <Tab.Screen name={Routes.Library} component={LibraryScreen} />
          <Tab.Screen name={Routes.Search} component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
