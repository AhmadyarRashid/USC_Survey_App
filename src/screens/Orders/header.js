import React from 'react';
import {Header, Left, Icon, Button, Title, Right, Body} from 'native-base';
import {Colors} from '../../utils/colors';
import {syncOrDownloadShopProducts} from '../../howmuch-pos-core/utils/controller';
import Toast from 'react-native-toast-message';

function OrderHeaderComponent({
                                title = 'Header',
                                newOrderHandler = () => {
                                }, ...props
                              }) {
  return (
      <Header hasTabs>
        <Left>
          <Button
              transparent
              onPress={() => props.navigation.goBack()}
          >
            <Icon style={{color: Colors.primary}} name='arrow-back'/>
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          {title === 'New Order'
          && (<>
            <Button transparent onPress={() => {
              Toast.show({
                type: 'info',
                position: 'top',
                text1: 'Product Sync initiated',
                autoHide: true,
              });
              syncOrDownloadShopProducts()
            }}>
              <Icon style={{color: Colors.primary, fontSize: 22}} name='sync'/>
            </Button>
            <Button transparent onPress={() => newOrderHandler()}>
              <Icon style={{color: Colors.primary}} name='add'/>
            </Button>
          </>)}
        </Right>
      </Header>
  );
}

export default OrderHeaderComponent;
