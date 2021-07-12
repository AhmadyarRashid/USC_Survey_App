import React from 'react';
import {View, Text} from 'native-base';
import styles from './styles';
import AutoCompleteComponent from '../Autocomplete';
import LineItemsList from '../LineItemsList';

function OrderCart(props) {
  return (
      <View style={styles.root}>
        <Text>Order Information</Text>
        <AutoCompleteComponent {...props}/>
        <LineItemsList {...props}/>
      </View>
  );
}

export default OrderCart;
