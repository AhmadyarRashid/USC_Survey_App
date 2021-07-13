import React, {useState} from "react";
import {Item, View} from "native-base";
import {Text, Picker} from 'react-native'
import {Colors} from "../../utils/colors";

function DropDown({name, list}) {
  const [selectedOption, setSelectedOption] = useState('rn')
  return (
      <View style={{width: '100%', marginTop: 12}}>
        <Text>Select {name}</Text>
        <Item picker style={{backgroundColor: Colors.lightGrey,}}>
          <Picker style={{
            width: "100%",
            color: Colors.black,
            justifyContent: 'center',
          }}
                  selectedValue={selectedOption}
                  onValueChange={(itemValue, itemPosition) => {
                    console.log("selected item:", itemValue, itemPosition)
                    setSelectedOption(itemValue)
                  }}
          >
            <Picker.Item label="Java" value="java"/>
            <Picker.Item label="JavaScript" value="js"/>
            <Picker.Item label="React Native" value="rn"/>
          </Picker>

          {/*<SelectDropdown*/}
          {/*    data={countries}*/}
          {/*    onSelect={(selectedItem, index) => {*/}
          {/*      console.log(selectedItem, index)*/}
          {/*    }}*/}
          {/*    buttonTextAfterSelection={(selectedItem, index) => {*/}
          {/*      // text represented after item is selected*/}
          {/*      // if data array is an array of objects then return selectedItem.property to render after item is selected*/}
          {/*      return selectedItem*/}
          {/*    }}*/}
          {/*    rowTextForSelection={(item, index) => {*/}
          {/*      // text represented for each item in dropdown*/}
          {/*      // if data array is an array of objects then return item.property to represent item in dropdown*/}
          {/*      return item*/}
          {/*    }}*/}
          {/*/>*/}
        </Item>
      </View>
  )
}

export default DropDown;
