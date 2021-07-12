import React from "react"
import {View, Text, Icon, Accordion, CheckBox} from "native-base"
import styles from "./styles";

function ExpandableReview({data=[], onCheckBoxHandler}){

  const _renderHeader = (item, expanded) => {
    return (
      <View style={styles.header}>
        <CheckBox
          checked={item.checked}
          onPress={() => onCheckBoxHandler(item.id, !item.checked)}
        />
        <Text style={styles.headerText}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={styles.headerIcon} name="remove-circle" />
          : <Icon style={styles.headerIcon} name="add-circle" />}
      </View>
    );
  }
  const _renderContent = (item) => {
    return (
      <Text
        style={styles.contentMain}
      >
        {item.content}
      </Text>
    );
  }

  return(
    <Accordion
      dataArray={data}
      expanded={[0]}
      animation={true}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
    />
  )
}

export default ExpandableReview;
