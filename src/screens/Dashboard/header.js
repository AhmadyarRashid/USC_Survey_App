import React from 'react';
import {Header, Left, Icon, Button, Text, Title, Right, Body} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking';
import {Colors} from '../../utils/colors';
import styles from './styles';

function DashboardHeaderComponent({navigation, ...props}) {

  const logoutHandler = async () => {
    RCTNetworking.clearCookies(() => {
      console.log('cookie cleared');
    });
    await AsyncStorage.removeItem('userInfo');
    AsyncStorage.clear().then(response => {
      navigation.navigate('login');
    });
  };

  return (
      <Header style={{backgroundColor: 'white'}}>
        <Left>
          <Button onPress={() => navigation.toggleDrawer()} transparent>
            <Icon style={{color: Colors.primary}} name='menu'/>
          </Button>
        </Left>
        <Body>
          <Title style={{color: 'black'}}>Dashboard</Title>
        </Body>
        <Right>
          {/*<Icon*/}
          {/*    onPress={() => syncHandler()}*/}
          {/*    name="sync"*/}
          {/*    type="MaterialCommunityIcons"*/}
          {/*    style={styles.icon}*/}
          {/*/>*/}
          <Icon
              onPress={() => logoutHandler()}
              name="logout"
              type="MaterialCommunityIcons"
              style={styles.icon}
          />
        </Right>
      </Header>
  );
}

export default DashboardHeaderComponent;
