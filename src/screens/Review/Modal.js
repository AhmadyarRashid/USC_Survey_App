import React from 'react';
import {Alert, Modal, Pressable} from "react-native";
import {Text, View, Textarea, Button} from "native-base";
import styles from "./styles";
import {Colors} from "../../utils/colors";

function FeedbackModal({modalVisible, setModalVisible}){
  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={{width: "100%"}}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Feedback</Text>
          <Textarea style={{width: '100%'}} rowSpan={5} bordered placeholder="Something write..." />

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 12}}>
            <Button
              small
              style={{marginRight: 8, backgroundColor: Colors.danger}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Cancel</Text>
            </Button>
            <Button
              small
              style={{backgroundColor: Colors.primary}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Save</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default FeedbackModal