import React, {useState} from 'react';
import {View, Text, Item, Label, Input, Button, Icon, Textarea, Picker, Card, CardItem} from 'native-base';
import styles from './styles';
import DatePicker from 'react-native-datepicker';
import {Formik} from 'formik';
import {payments} from '../../howmuch-pos-core/utils/controller';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ChequePayment({order, ...props}) {
  return (
      <Card>
        <Formik
            initialValues={{
              type: 'full',
              chequeNo: '123',
              date: '',
              beneficiaryName: '',
              bankName: '',
              amount: '',
              bankAddress: '',
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
                  allow_partial_payment: 0,
                  amount: values.amount,
                  bank_address: values.bankAddress,
                  bank_name: values.bankName,
                  cash_drawer_title: "",
                  notes: values.notes,
                  order_id: order.number,
                  payment_date: values.date,
                  payment_method_id: 9,
                  reference_name: values.name,
                  reference_number: values.chequeNo
                }
              }
              payments(payload)
                  .then(response => {
                    alert("Payment has been successfully processed")
                  })
                  .catch(error => {
                    console.log("credit payment error:", error)
                    alert("Please try later")
                  })
            }}
        >
          {({handleChange, handleBlur, handleSubmit, values, resetForm}) => (
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
                    <Label>Cheque No</Label>
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
                      minDate="2016-05-01"
                      maxDate="2016-06-01"
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
                      onDateChange={handleChange("date")}
                  />
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Beneficiary Name</Label>
                    <Input
                        value={values.transactionNo}
                        onBlur={handleBlur('transactionNo')}
                        onChangeText={handleChange('transactionNo')}
                    />
                  </Item>
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Bank Name</Label>
                    <Input
                        value={values.transactionNo}
                        onBlur={handleBlur('transactionNo')}
                        onChangeText={handleChange('transactionNo')}
                    />
                  </Item>
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Amount</Label>
                    <Input
                        keyboardType="numeric"
                        value={values.transactionNo}
                        onBlur={handleBlur('transactionNo')}
                        onChangeText={handleChange('transactionNo')}
                    />
                  </Item>
                  <Item floatingLabel style={styles.inputItem}>
                    <Label>Bank Address</Label>
                    <Input
                        value={values.transactionNo}
                        onBlur={handleBlur('transactionNo')}
                        onChangeText={handleChange('transactionNo')}
                    />
                  </Item>
                  <Textarea
                      rowSpan={5}
                      style={{width: '100%'}}
                      bordered
                      placeholder="Notes"
                      value={values.transactionNo}
                      onBlur={handleBlur('transactionNo')}
                      onChangeText={handleChange('transactionNo')}
                  />
                </CardItem>

                <CardItem>
                  <Button
                      success
                      small
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

export default ChequePayment;
