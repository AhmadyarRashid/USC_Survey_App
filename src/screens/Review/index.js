import React, {Fragment, useState} from "react";
import {Container, Content, View, Text} from "native-base";
import ReviewHeader from "./header";
import styles from "./styles";
import ExpandableReview from "../../components/ExpandableReview";

function ReviewScreen(props) {
  const [data, setData] = useState([
    {id: 1, title: "First Element", content: "Lorem ipsum dolor sit amet", checked: true},
    {id: 2, title: "Second Element", content: "Lorem ipsum dolor sit amet", checked: true},
    {id: 3, title: "Third Element", content: "Lorem ipsum dolor sit amet", checked: true}
  ])

  const onCheckBoxHandler = (id, status) => {
    setData(data.map(item => item.id === id ? {...item, checked: status}: item))
  }

  return (
    <Fragment>
      <ReviewHeader {...props} />
      <Container style={styles.root}>
        <Content>
          <ExpandableReview
            data={data}
            onCheckBoxHandler={onCheckBoxHandler}
          />
        </Content>
      </Container>
    </Fragment>
  )
}

export default ReviewScreen;
