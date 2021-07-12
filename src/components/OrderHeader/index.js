import React from 'react';
import {View, Text, Container} from 'native-base';
import styles from './styles';

function OrderHeader({orderNumber, storeName, storeAddress}) {
  return(
      <View style={styles.row}>
        <Text style={styles.orderNumber}>{orderNumber}</Text>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.storeAddress}>{storeAddress}</Text>
      </View>
  )
}

export default OrderHeader;
