import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {Provider} from 'react-redux';
// import RouteContainer from './src/utils/navigation';
import { NavigationContainer } from "@react-navigation/native";

// import BottomTabNavigator from "./src/utils/navigation/tabNavigator";

// import DrawerNavigator from "./src/utils/navigation/drawerNavigator";

import { MainStackNavigator } from './src/utils/navigation/stackNavigation';
import store from './store/store';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
      <Provider store={store}>
      {/* <RouteContainer /> */}
      <NavigationContainer>
        {/* <BottomTabNavigator /> */}
        {/* <DrawerNavigator /> */}
        <MainStackNavigator />
      </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}
