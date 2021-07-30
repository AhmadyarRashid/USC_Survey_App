import React, {useState} from "react"
import {Content, Text, CheckBox, ListItem, Body, Button, Spinner} from "native-base";
import {Colors} from "../../utils/colors";
import styles from "../Login/styles";

function SelectionScreen({data, onStartHandler, ...props}) {
  const [productsList, setProductList] = useState([])

  const onCheckboxHandler = id => {
    const isExists = productsList.indexOf(id)
    if (isExists > -1){
      setProductList(productsList.filter(pId => pId !== id))
    }else {
      setProductList(productsList.concat(id))
    }
  }

  return (
    <Content>
      {data.map(product => (
        <ListItem>
          <CheckBox
            color={Colors.primary}
            onPress={() => onCheckboxHandler(product.id)}
            checked={productsList.indexOf(product.id) > -1}
          />
          <Body>
            <Text>{product.name}</Text>
          </Body>
        </ListItem>
      ))}
      <Button
        full
        style={styles.loginBtn}
        onPress={() => onStartHandler(productsList)}
      >
        <Text>Start</Text>
      </Button>
    </Content>
  )
}

export default SelectionScreen;
