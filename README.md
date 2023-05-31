![Alt Text](blackpsbottomtabbar.gif) ![Alt Text](redpsbottomtabbar.gif)

# react-native-ps-bottom-tabbar

React-native bottom tabbar inspired by PS App.


## Installation

```sh
npm install react-native-ps-bottom-tabbar
```

## Usage

```js
import { PSBottomTabBar } from 'react-native-ps-bottom-tabbar';

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

// ...

```

## Contributing

All contributes are welcome! 🙏

## License

MIT

---

Made with Skia and ❤️
