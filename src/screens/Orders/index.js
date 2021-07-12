import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PendingOrdersComponent from './PendingOrders';
import InProgressOrdersComponent from './InprogressOrders';
import {getAccessToken} from '../../howmuch-pos-core/utils/controller';
import axios from 'axios';

import {Colors} from '../../utils/colors';
import {url} from '../../utils/constant';
import DashboardWrapper from './DashboardWrapper';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Dashboard(props) {
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [inComingOrders, setInComingOrders] = useState([]);

  useEffect(() => {
    (async function () {
      axios.get(`${url}/api/v2/shops/shop_orders.json?shop_id=${props.route.params.slug}`, {
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      }).then(response => {
        console.log('response of shops orders:', data);
        const {data} = response;
        setInProgressOrders([...data.in_progress_orders, ...data.draft_orders]);
        setInComingOrders(data.incoming_orders);
      }).catch(error => {
        console.log('error of shops orders:', error);
      });
    })();
  }, []);

  return (
      <Tab.Navigator
          tabBarOptions={{
            activeTintColor: Colors.primary,
            inactiveTintColor: Colors.grey,
          }}
      >
        <Tab.Screen
            name="Pending"
            component={tabProps => <DashboardWrapper shopId={props.route.params.slug}>
              <PendingOrdersComponent
                  {...tabProps}
                  {...props}
                  pendingOrders={inProgressOrders}/>
            </DashboardWrapper>
            }
            options={{
              tabBarLabel: 'Incoming Orders',
              tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons name="animation-outline" color={color} size={size}/>
              ),
            }}
        />
        <Tab.Screen
            name="InProgress"
            component={tabProps => <DashboardWrapper shopId={props.route.params.slug}>
              <InProgressOrdersComponent
                  {...tabProps}
                  {...props}
                  workingOrders={inComingOrders}
              />
            </DashboardWrapper>}
            options={{
              tabBarLabel: 'Working Orders',
              tabBarIcon: ({color, size}) => (
                  <AntDesign name="arrowup" color={color} size={size}/>
              ),
            }}
        />
      </Tab.Navigator>
  );
}

export default Dashboard;
