import React from 'react';
import {View, Text, Item, Label, Input, Button, Icon, Textarea, Picker, Card, CardItem} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {Formik} from 'formik';
import {payments} from "../../howmuch-pos-core/utils/controller"
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CreditPayment({order, ...props}) {
  return (
      <Card>
        <Formik
            initialValues={{
              type: 'full',
              transactionNo: '',
              date: '',
              name: '',
              cardType: '',
              outstanding: '',
              paid: '',
              notes: '',
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
                payment: {
                  allow_partial_payment: 1,
                  amount: values.paid,
                  card_type: values.cardType,
                  cash_drawer_title: "",
                  notes: values.notes,
                  order_id: order.number,
                  payment_date: values.date,
                  payment_method_id: 7,
                  reference_name: values.name,
                  reference_number: values.transaction
                }
              }
              if (!order.customer){
                alert("Please enter Customer info first")
                return
              }
              payments(payload)
                  .then(response => {
                    console.log("credit payment:", response)
                    alert("Payment has been successfully processed")
                  })
                  .catch(error => {
                    console.log("credit payment error:", error)
                    alert("Please try later")
                  })
              console.log(values)
            }}
        >
          {({handleChange, handleBlur, handleSubmit, values}) => (
              <>
                <CardItem style={styles.formContainer}>
                  <Picker
                      note
                      mode="dropdown"
                      style={styles.dropdown}
                      selectedValue={values.type || "full"}
                      onValueChange={handleChange('type')}
                  >
                    <Picker.Item label="Full Payment" value="full"/>
                    <Picker.Item label="Partial Payment" value="partial"/>
                  </Picker>
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Transaction No</Label>
                    <Input
                        value={values.transactionNo}
                        onBlur={handleBlur('transactionNo')}
                        onChangeText={handleChange('transactionNo')}
                    />
                  </Item>
                  <DatePicker
                      style={{width: 180, marginTop: 12}}
                      date={values.date}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                        },
                      }}
                      onDateChange={handleChange('date')}
                  />
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Name</Label>
                    <Input
                        value={values.name}
                        onBlur={handleBlur('name')}
                        onChangeText={handleChange('name')}
                    />
                  </Item>
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Card Type</Label>
                    <Input
                        value={values.cardType}
                        onBlur={handleBlur('cardType')}
                        onChangeText={handleChange('cardType')}
                    />
                  </Item>
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Total Outstanding</Label>
                    <Input
                        keyboardType="numeric"
                        value={values.outstanding}
                        onBlur={handleBlur('outstanding')}
                        onChangeText={handleChange('outstanding')}
                    />
                  </Item>
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Amount Paid</Label>
                    <Input
                        keyboardType="numeric"
                        value={values.paid}
                        onBlur={handleBlur('paid')}
                        onChangeText={handleChange('paid')}
                    />
                  </Item>
                  <Textarea
                      rowSpan={5}
                      style={{width: '100%'}}
                      bordered
                      placeholder="Notes"
                      value={values.notes}
                      onBlur={handleBlur('notes')}
                      onChangeText={handleChange('notes')}
                  />
                </CardItem>

                <CardItem>
                  <Button
                      success
                      small
                      style={styles.payBtn}
                      type="submit"
                      onPress={handleSubmit}
                  >
                    <Text>Pay</Text>
                  </Button>
                </CardItem>
              </>
          )}
        </Formik>
      </Card>
  );
}

export default CreditPayment;
