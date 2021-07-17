import React, {Fragment, useState, useEffect} from "react";
import {Container, Content, View, Text} from "native-base";
import ReviewHeader from "./header";
import styles from "./styles";
import ExpandableReview from "../../components/ExpandableReview";
import {getNRTCItems, getPTCLItems} from "../../API/user"
import FeedbackModal from "./Modal";

function ReviewScreen(props) {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUnCheckedItem, setSelectedUnCheckedItem] = useState({})

  useEffect(() => {
    const {route: {params: {checklist = "ptcl"}}} = props;
    setLoading(true)
    if (checklist === "nrtc") {
      getNRTCItems()
        .then(response => {
          setLoading(false)
          console.log("response", response)
          const {isSuccess = false, payload = [], message = ''} = response
          if (isSuccess) {
            setData(payload)
          }
        })
    }
    if (checklist === "ptcl") {
      getPTCLItems()
        .then(response => {
          setLoading(false)
          console.log("response", response)
          const {isSuccess = false, payload = [], message = ''} = response
          if (isSuccess) {
            setData(payload)
          }
        })
    }
    if (checklist === "erp") {
      setLoading(false)
    }
  }, [])

  const onCheckBoxHandler = (productId, itemId, status) => {
    setSelectedUnCheckedItem({
      productId,
      itemId,
      status
    })
    const updatedData = data.map(product => product.id === productId
      ? {
        ...product,
        data: product.data.map(item => item.id === itemId
          ? {...item, checked: status}
          : item)
      }
      : product)
    if (!status) {
      setModalVisible(true)
    }
    setData(updatedData)
  }

  return (
    <Fragment>
      <ReviewHeader {...props} />
      <Container style={styles.root}>
        <Content>
          {isLoading && <Text style={{textAlign: 'center'}}>Loading...</Text>}
          {data.map(product => (
            <View style={styles.category}>
              <Text style={styles.categoryTitle}>{product.name}</Text>
              <ExpandableReview
                data={product.data}
                onCheckBoxHandler={(id, checked) => onCheckBoxHandler(product.id, id, checked)}
              />
            </View>
          ))}

        </Content>
      </Container>
      <FeedbackModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Fragment>
  )
}

export default ReviewScreen;
