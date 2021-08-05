import React, {useState, useEffect} from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Item,
  Input,
  Textarea, View
} from "native-base"
import {getStoreDetail, updateStoreDetail} from "../../API/area"
import {Colors} from "../../utils/colors"
import styles from "./styles"
import Toast from "react-native-simple-toast";

function EditStoreInfo({navigation, ...props}) {

  const [isLoading, setLoading] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [inChargeName, setInChargeName] = useState('');
  const [inChargePhone, setInChargePhone] = useState('');
  const [category, setCategory] = useState('');

  const {route: {params: {storeId}}} = props;

  useEffect(() => {
    setLoading(true);
    getStoreDetail(storeId)
        .then(response => {
          const {isSuccess, payload} = response;
          if (isSuccess) {
            const {address, category, inchargeName, inchargePhone, name} = payload;
            setAddress(address);
            setInChargeName(inchargeName);
            setInChargePhone(inchargePhone);
            setStoreName(name);
            setCategory(category)
          }
        })
        .catch(error => {
          console.log("error:", error)
        })
  }, []);

  const updateStoreHandler = () => {
    console.log("updatedStore handler:", address, category, inChargePhone, inChargeName, storeName)
    updateStoreDetail(storeId, {
      category,
      internet: false,
      inchargeName: inChargeName,
      inchargePhone: inChargePhone,
      address,
    }).then(response => {
      const {isSuccess} = response
      if (isSuccess) {
        Toast.showWithGravity("Store Information updated", Toast.SHORT, Toast.TOP);
        navigation.goBack();
      }else {
        Toast.showWithGravity("Something went wrong. Please try again later.", Toast.SHORT, Toast.TOP);
      }
    })
  };

  return (
      <Container>
        <Header style={{backgroundColor: Colors.lightGrey}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon style={{color: Colors.primary}} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: Colors.black}}>Edit Store</Title>
          </Body>
          <Right>
            <Text
                style={{color: Colors.primary}}
                onPress={() => updateStoreHandler()}
            >Save</Text>
          </Right>
        </Header>
        <Content style={styles.root}>

          <View style={styles.item}>
            <Text style={styles.inputTitle}>Store Name</Text>
            <Item regular style={[styles.item, {backgroundColor: Colors.lightGrey}]}>
              <Input disabled value={storeName} onChangeText={value => setStoreName(value)} placeholder='Store Name'/>
            </Item>
          </View>

          <View style={styles.item}>
            <Text style={styles.inputTitle}>InCharge Name</Text>
            <Item regular style={styles.item}>
              <Input value={inChargeName} onChangeText={value => setInChargeName(value)} placeholder='InCharge Name'/>
            </Item>
          </View>

          <View style={styles.item}>
            <Text style={styles.inputTitle}>InCharge phone</Text>
            <Item regular style={styles.item}>
              <Input value={inChargePhone} onChangeText={value => setInChargePhone(value)}
                     placeholder='InCharge phoneNo'/>
            </Item>
          </View>

          <View style={styles.item}>
            <Text style={styles.inputTitle}>Category</Text>
            <Item regular style={styles.item}>
              <Input value={category} onChangeText={value => setCategory(value)} placeholder='Category'/>
            </Item>
          </View>

          <View style={styles.item}>
            <Text style={styles.inputTitle}>Address</Text>
            <Textarea
                style={styles.item}
                value={address}
                rowSpan={5}
                bordered
                onChangeText={value => setAddress(value)}
                placeholder="Address"
            />
          </View>
        </Content>
      </Container>
  )
}

export default EditStoreInfo;
