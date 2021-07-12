// In App.js in a new project
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/Login';
import OrdersScreen from '../screens/Orders';
import DashboardScreen from '../screens/Dashboard';
import NewOrderScreen from '../screens/NewOrder';
import {Colors} from "../utils/colors"
import SettingScreen from '../screens/Setting';
import PrinterSetting from '../screens/Setting/PrinterSetting';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerScreensRoutes(props) {
  return(
      <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: Colors.primary,
          }}
          initialRouteName="Home">
        <Drawer.Screen name="Home" component={newProps => <DashboardScreen {...props} {...newProps} />} />
        <Drawer.Screen name="Setting" component={newProps => <SettingScreen {...props} {...newProps} />} />
      </Drawer.Navigator>
  )
}

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName="login"
        >
          <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                title: '',
                headerStyle: {
                  backgroundColor: Colors.primary,
                  borderBottomColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
          />
          <Stack.Screen
              name="Dashboard"
              component={DrawerScreensRoutes}
              options={{
                title: 'Dashboard',
                headerStyle: {
                  backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
          />
          <Stack.Screen
              name="Orders"
              component={OrdersScreen}
              options={{
                title: 'Dashboard',
                headerStyle: {
                  backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
          />
          <Stack.Screen
              name="NewOrder"
              component={NewOrderScreen}
              options={{
                title: 'New Order',
                headerStyle: {
                  backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
          />
          <Stack.Screen
              name="PrinterSetting"
              component={PrinterSetting}
              options={{
                title: 'Printer Setting',
                headerStyle: {
                  backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
