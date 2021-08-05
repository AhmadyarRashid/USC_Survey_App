import React, {Fragment, useState, useEffect} from "react";
import {Container, Content, View, Text} from "native-base";
import ReviewHeader from "./header";
import styles from "./styles";
import ExpandableReview from "../../components/ExpandableReview";
import {getNRTCItems, getPTCLItems, submitReportAPI} from "../../API/user"
import FeedbackModal from "./Modal";
import SelectionScreen from "./SelectionScreen";

function ReviewScreen(props) {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUnCheckedItem, setSelectedUnCheckedItem] = useState({})
  const [isSelectionScreen, setSelectionScreen] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState([])

  const {route: {params: {company = "ptcl", userId, storeId}}} = props;

  useEffect(() => {
    setLoading(true)
    if (company === "nrtc") {
      getNRTCItems(userId, storeId)
        .then(response => {
          setLoading(false)
          console.log("response", response)
          const {isSuccess = false, payload = [], message = ''} = response
          if (isSuccess) {
            setData(payload)
          }
        })
    }
    if (company === "ptcl") {
      getPTCLItems(userId, storeId)
        .then(response => {
          setLoading(false)
          console.log("response", response)
          const {isSuccess = false, payload = [], message = ''} = response
          if (isSuccess) {
            setData(payload)
          }
        })
    }
    if (company === "erp") {
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

  const addRemarksHandler = (remarks) => {
    const {productId, itemId} = selectedUnCheckedItem;
    const updatedData = data.map(product => product.id === productId
      ? {
        ...product,
        data: product.data.map(item => item.id === itemId
          ? {...item, remarks}
          : item)
      }
      : product)
    setData(updatedData)
  }

  const onSubmitReport = () => {
    let filteredData = data.filter(product => selectedProducts.indexOf(product.id) > -1)
    console.log("updated data", filteredData)
    const {route: {params: {company = "ptcl", userId, storeId}}, navigation} = props;
    submitReportAPI(userId, storeId, company, filteredData)
      .then(response => {
        const {isSuccess, payload, message} = response;
        if (isSuccess) {
          alert("Report Submitted Successfully")
          navigation.navigate("Dashboard")
        }
      })
  }

  let bodyContent;

  if (isSelectionScreen) {
    bodyContent = <SelectionScreen
      data={data}
      onStartHandler={list => {
        setSelectionScreen(false)
        setSelectedProducts(list)
      }}
    />
  } else {
    let filteredData = data.filter(product => selectedProducts.indexOf(product.id) > -1)
    bodyContent =
      <Content>
        {filteredData.map(product => (
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>{product.name}</Text>
            <ExpandableReview
              data={product.data}
              onCheckBoxHandler={(id, checked) => onCheckBoxHandler(product.id, id, checked)}
            />
          </View>
        ))}
      </Content>
  }

  return (
    <Fragment>
      <ReviewHeader
        {...props}
        storeId={storeId}
        isSelectionScreen={isSelectionScreen}
        onSubmitReport={() => onSubmitReport()}
      />
      <Container style={styles.root}>
        {isLoading && <Text style={{textAlign: 'center'}}>Loading...</Text>}
        {bodyContent}
      </Container>
      <FeedbackModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addRemarksHandler={addRemarksHandler}
      />
    </Fragment>
  )
}

export default ReviewScreen;
