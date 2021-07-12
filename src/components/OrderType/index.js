import React, {useState} from 'react';
import {Container, Body, View, Text, Button, Left, Right} from 'native-base';
import styles from './styles';

function OrderType(props) {
  const [type, setType] = useState('delivery');
  return (
      <View style={styles.root}>
        <Left>
          <Text>Order Type:</Text>
        </Left>
        <Right>
          <View style={styles.optionView}>
            <Button
                style={styles.btn}
                onPress={() => setType('delivery')}
                bordered={!(type === 'delivery')}
                small
                success
            >
              <Text style={{padding: 0}}>Delivery</Text>
            </Button>
            <Button
                style={styles.btn}
                onPress={() => setType('pickup')}
                bordered={!(type === 'pickup')}
                small
                success
            >
              <Text>Pick up</Text>
            </Button>
          </View>
        </Right>
      </View>
  );
}

export default OrderType;
