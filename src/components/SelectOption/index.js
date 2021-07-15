import React from "react";
import {Button, View, Text} from "native-base";
import styles from "./styles"

function SelectOption({selectedOption, setOption}){
  return(
    <View style={styles.row}>
      <Button
        onPress={() => setOption("ptcl")}
        style={styles.button}
        block={selectedOption === "ptcl"}
        bordered={selectedOption !== "ptcl"}
        success
      >
        <Text>PTCL</Text>
      </Button>
      <Button
        onPress={() => setOption("nrtc")}
        style={styles.button}
        block={selectedOption === "nrtc"}
        bordered={selectedOption !== "nrtc"}
        success
      >
        <Text>NRTC</Text>
      </Button>
      <Button
        onPress={() => setOption("erp")}
        style={styles.button}
        block={selectedOption === "erp"}
        bordered={selectedOption !== "erp"}
        success
      >
        <Text>ERP</Text>
      </Button>
    </View>
  )
}

export default SelectOption;
