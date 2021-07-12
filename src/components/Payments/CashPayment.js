import React, {useEffect, useState} from 'react';
import {TextInput} from "react-native"
import {View, Text, Item, Input, Label, Button, Icon, Card, CardItem} from 'native-base';
import {Formik} from 'formik';
import {cashDrawerTransactions} from '../../howmuch-pos-core/utils/controller';
import Toast from 'react-native-toast-message';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CashPayment({order, ...props}) {
  const [cashReceived, setCashReceived] = useState("0");
  const [cashReturn, setCashReturn] = useState("0");

  useEffect(() => {
    setCashReceived("0")
    setCashReturn("0")
  }, [order.number, order.outstanding_balance])

  const cashPaymentHandler = async () => {

    const cashDrawerTitle = await AsyncStorage.getItem("cashDrawerTitle");
    if (!cashDrawerTitle){
      alert("Please enter drawer title in settings");
      return;
    }

    if (cashReceived && Number(cashReceived) < 1){
      setCashReceived(String(order.outstanding_balance))
    }else if (Number(cashReceived) < Number(order.outstanding_balance)) {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Payment',
        text2: 'Cash Received must be greater than Outstanding balance',
        autoHide: true,
      });
      return;
    }
    const payload = {
      shop_id: order.shop.id,
      order_id: order.number,
      cash_received: Number(cashReceived) < 1 ? String(order.outstanding_balance) : cashReceived,
      cash_drawer_title: '',
    };
    cashDrawerTransactions(payload)
        .then(response => {

          if (cashReceived === order.outstanding_balance){
            setCashReturn("0")
          }else {
            setCashReturn(response.credit);
          }
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Payment',
            text2: 'Payment has been successfully processed',
            autoHide: true,
          });
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Payment',
            text2: 'Payment has been Failed. Try later.',
            autoHide: true,
          });
          console.log('cash payment error:', error);
          // alert('Payment failed');
        });
  };
  return (
      <Card>
        <CardItem style={styles.formContainer}>
          <View style={{width: '100%', paddingBottom: 18}}>
            <Text style={styles.inputItem}>Total Outstanding: {order.outstanding_balance}</Text>
          </View>
          <Item floatingLabel style={styles.inputItem}>
            <Label>Cash Received</Label>
            <Input
                keyboardType="numeric"
                value={cashReceived}
                onChangeText={value => setCashReceived(value)}
            />
          </Item>
          <Item floatingLabel style={styles.inputItem}>
            <Label>Cash Return</Label>
            <Input
                value={cashReturn.toString()}
                onChangeText={value => setCashReceived(value)}
            />
          </Item>
        </CardItem>
        <CardItem>
          <Button
              success
              small
              onPress={() => cashPaymentHandler()}
              style={styles.payBtn}>
            <Text>Pay</Text>
          </Button>
        </CardItem>
      </Card>
  );
}

export default CashPayment;
