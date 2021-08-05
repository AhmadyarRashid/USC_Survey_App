import React, {useState} from 'react';
import {Alert, Modal} from "react-native";
import {Text, View, Textarea, Button} from "native-base";
import {Colors} from "../../utils/colors";
import styles from "./styles";

function FeedbackModal({modalVisible, setModalVisible, addRemarksHandler = () => {}}) {

  const [remarks, setRemarks] = useState("");

  return (
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
          <Textarea
            style={{width: '100%'}}
            onChangeText={value => {
              setRemarks(value)
            }}
            rowSpan={5} bordered
            placeholder="Something write..."/>

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
              onPress={() => {
                addRemarksHandler(remarks);
                setModalVisible(!modalVisible)
              }}
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
