import React, {useState, useEffect} from 'react';
import {Alert, Pressable, Modal} from 'react-native';
import {View, Button, Text, Textarea, Icon} from 'native-base';
import {deliverOrder as deliverOrderAPI, rejectOrder as rejectOrderAPI} from '../../howmuch-pos-core/utils/controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {Colors} from '../../utils/colors';

function OrderActions({
                        order, deliverOrder, rejectOrder, isOnline = false,
                        onlineRejectOrder, onlineDeliverOrder, isInprogressOrder = false,
                        onlineAcceptOrder, printOrderHandler
                      }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState('');

  useEffect(() => {
    setReason('');
  }, [order.number]);

  const onRejectOrderHandler = () => {
    if (!reason) {
      alert('Reason field are empty');
      return null;
    }

    if (isOnline) {
      onlineRejectOrder(reason);
      alert('online reject order successfully');
    } else {
      rejectOrderAPI({id: order.number, reason})
          .then(response => {
            rejectOrder(order);
            setModalVisible(false);
            alert('Order Rejected');
          })
          .catch(error => {
            setModalVisible(false);
            console.log('reject api error:', error);
          });
    }
  };

  const acceptOrderHandler = async () => {
    const cashDrawerTitle = await AsyncStorage.getItem("cashDrawerTitle");
    if (!cashDrawerTitle){
      alert("Please enter drawer title in settings");
      return;
    }
    if (isOnline && !isInprogressOrder) {
      onlineAcceptOrder();
    } else if (isOnline && isInprogressOrder) {
      onlineDeliverOrder();
    } else {
      // const cashDrawer =
      deliverOrderAPI({id: order.number})
          .then(response => {
            if (response.errors) {
              alert(response.errors.join('\n'));
            } else {
              console.log('delivered order api response:', response);
              deliverOrder(order);
              alert('Order Delivered');
            }
          })
          .catch(error => {
            console.log('deliver api error:', error);
          });
    }
  };

  const openRejectModalHandler = async () => {
    const cashDrawerTitle = await AsyncStorage.getItem("cashDrawerTitle");
    if (!cashDrawerTitle){
      alert("Please enter drawer title in settings");
      return;
    }
    setModalVisible(true)
  };

  return (
      <React.Fragment>
        <View style={styles.root}>
          <Button
              onPress={() => openRejectModalHandler()}
              style={styles.btn}
              danger
              small
          >
            <Text>Reject</Text>
          </Button>
          <Button
              onPress={() => acceptOrderHandler()}
              style={styles.btn}
              success
              small
          >
            <Text>{isInprogressOrder ? 'Accept' : 'Delivery'}</Text>
          </Button>
          <Button
              onPress={() => printOrderHandler()}
              style={styles.btn}
              success
              small
          >
            <Text>Print</Text>
          </Button>
        </View>

        {/*Modal*/}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Button onPress={() => {
                  setModalVisible(false)
                  setReason("")
                }} transparent>
                  <Icon style={{color: Colors.black}} name='close'/>
                </Button>
              </View>
              <Text style={styles.modalText}>Please provide reason for rejecting this order {order.number} to
                customer</Text>
              <Textarea
                  style={styles.textArea}
                  value={reason}
                  onChangeText={text => setReason(text)}
                  rowSpan={5}
                  bordered
                  placeholder="Reason"
              />
              <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => onRejectOrderHandler()}
              >
                <Text style={styles.textStyle}>Reject</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </React.Fragment>
  );
}

export default OrderActions;
