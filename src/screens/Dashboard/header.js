import React from 'react';
import {Header, Left, Icon, Button, Text, Title, Right, Body} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking';
import {getAllShopLinks} from '../../howmuch-pos-core/resources/UserAuth.native';
import {syncOrDownloadShopProducts} from '../../howmuch-pos-core/utils/controller';
import {Colors} from '../../utils/colors';
import styles from './styles';
import Toast from 'react-native-toast-message';

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

  const syncHandler = async () => {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: 'Product sync initiated',
      autoHide: true,
    });
    syncOrDownloadShopProducts();
  };

  return (
      <Header>
        <Left>
          <Button onPress={() => navigation.toggleDrawer()} transparent>
            <Icon style={{color: Colors.primary}} name='menu'/>
          </Button>
        </Left>
        <Body>
          <Title>Dashboard</Title>
        </Body>
        <Right>
          <Icon
              onPress={() => syncHandler()}
              name="sync"
              type="MaterialCommunityIcons"
              style={styles.icon}
          />
          {/*<Icon*/}
          {/*    onPress={() => logoutHandler()}*/}
          {/*    name="sync"*/}
          {/*    type="MaterialCommunityIcons"*/}
          {/*    style={styles.icon}*/}
          {/*/>*/}
        </Right>
      </Header>
  );
}

export default DashboardHeaderComponent;
