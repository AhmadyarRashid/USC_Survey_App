import React, {useState} from "react";
import {Item, View} from "native-base";
import {Text, Picker} from 'react-native'
import {Colors} from "../../utils/colors";

function DropDown({name, list, onChangeOption = () => {}}) {
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
                    onChangeOption(itemValue)
                  }}
          >
            {list.map((item) => <Picker.Item label={item.name} value={item.id}/>)}
          </Picker>
        </Item>
      </View>
  )
}

export default DropDown;
