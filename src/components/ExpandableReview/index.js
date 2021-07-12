import React from "react"
import {View, Text, Icon, Accordion, CheckBox} from "native-base"
import styles from "./styles";
import {Colors} from "../../utils/colors";

function ExpandableReview({data=[], onCheckBoxHandler}){

  const _renderHeader = (item, expanded) => {
    const {checked = true, id} = item;
    return (
      <View style={styles.header}>
        <CheckBox
          checked={checked}
          color={Colors.primary}
          onPress={() => onCheckBoxHandler(id, !checked)}
        />
        <Text style={styles.headerText}>
          {" "}{item.itemName}
        </Text>
        {expanded
          ? <Icon style={styles.headerIcon} name="arrow-up" />
          : <Icon style={styles.headerIcon} name="arrow-down" />}
      </View>
    );
  }
  const _renderContent = (item) => {
    return (
      <Text
        style={styles.contentMain}
      >
        {item.description}
      </Text>
    );
  }

  return(
    <Accordion
      dataArray={data}
      expanded={[]}
      animation={true}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
    />
  )
}

export default ExpandableReview;
