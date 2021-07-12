import React, {useState} from "react";
import {Item, Picker, View} from "native-base";
import styles from "../../screens/Dashboard/styles";

function DropDown({name, list}){
  const [selectedHeadOffice, setSelectedHeadOffice] = useState('')
  return(
    <View style={styles.picker}>
      <Item picker>
        <Picker
          mode="dropdown"
          style={{width: "100%"}}
          placeholder={`Select ${name}`}
          placeholderStyle={{color: "#bfc6ea"}}
          placeholderIconColor="#007aff"
          selectedValue={selectedHeadOffice}
          onValueChange={setSelectedHeadOffice}
        >
          <Picker.Item label="Wallet" value="key0"/>
          <Picker.Item label="ATM Card" value="key1"/>
          <Picker.Item label="Debit Card" value="key2"/>
          <Picker.Item label="Credit Card" value="key3"/>
          <Picker.Item label="Net Banking" value="key4"/>
        </Picker>
      </Item>
    </View>
  )
}

export default DropDown;
