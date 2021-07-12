import React, {useState} from 'react';
import {View, Text, Item, Label, Input, Button, Icon, Card, CardItem} from 'native-base';
import {payments} from "../../howmuch-pos-core/utils/controller"
import styles from './styles';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CreditCardPayment({order, ...props}) {
  const [cashReturn, setCashReturn] = useState("0")
  return (
      <Card>
        <Formik
            initialValues={{
              outstanding: order.outstanding_balance.toString(),
              cashReceived: '',
              cashReturn: '',
            }}
            onSubmit={values => {
              (async function () {
                const cashDrawerTitle = await AsyncStorage.getItem("cashDrawerTitle");
                if (!cashDrawerTitle){
                  alert("Please enter drawer title in settings");
                  return;
                }
              })()
              const payload = {
                order_id: order.number,
                shop_id: order.shop.id,
                payment: {
                  allow_partial_payment: 0,
                  amount: values.cashReceived,
                  cash_drawer_title: "",
                  order_id: order.number,
                  payment_method_id: 8,
                  shop_id: order.shop.id
                }
              }
              if (!order.customer){
                alert("Please enter Customer info first")
                return
              }
              payments(payload)
                  .then(response => {
                    alert("Payment has been successfully processed")
                  })
                  .catch(error => {
                    console.log("credit card payment error:", error)
                    alert("Please try later")
                  })
            }}
        >
          {({handleChange, handleBlur, handleSubmit, values}) => (
              <>
                <CardItem style={styles.formContainer}>
                  <View style={{width: '100%', paddingBottom: 18}}>
                    <Text style={styles.inputItem}>Total Outstanding: {order.outstanding_balance}</Text>
                  </View>
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Cash Received</Label>
                    <Input
                        keyboardType="numeric"
                        value={values.cashReceived}
                        onBlur={handleBlur('cashReceived')}
                        onChangeText={handleChange('cashReceived')}
                    />
                  </Item>
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Cash Return</Label>
                    <Input
                        keyboardType="numeric"
                        value={values.cashReturn}
                        onBlur={handleBlur('cashReturn')}
                        onChangeText={handleChange('cashReturn')}
                    />
                  </Item>
                </CardItem>

                <CardItem>
                  <Button
                      success
                      small
                      type="submit"
                      onPress={handleSubmit}
                      style={styles.payBtn}>
                    <Text>Pay</Text>
                  </Button>
                </CardItem>
              </>
          )}
        </Formik>
      </Card>
  );
}

export default CreditCardPayment;
