import React, {Fragment, useState, useEffect} from 'react';
import {Text, Container, Content, Form, Icon, View, Button} from 'native-base';
import HeaderComponent from "./header";
import SingleOption from "../../components/SelectOption"
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDown from "../../components/DropDown";
import {area} from "../../utils/constant"
import {profileAPI} from "../../API/user"

import styles from './styles';

function Dashboard(props) {

  const [headOffices, setHeadOffices] = useState([{
    id: 1,
    name: "Islamabad"
  }])
  const [zones, setZones] = useState([])
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const [stores, setStores] = useState([])
  const [company, setCompany] = useState("ptcl")
  const [userId, setUserId] = useState("-1")
  const [selectedStoreId, setStoreId] = useState("-1")

  useEffect(() => {
    (async function () {
      let userInfo = await AsyncStorage.getItem("userInfo")
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        setUserId(userInfo.userId)
        profileAPI(userInfo.userId)
          .then(response => {
            const {isSuccess = false, payload = {}, message = ''} = response
            if (isSuccess) {
              const {
                currentUser: {
                  zonesDetail = [],
                  regionsDetail = [],
                  citiesDetail = [],
                  storesDetail = []
                }
              } = payload;

              setZones(zonesDetail)
              setRegions(regionsDetail)
              setCities(citiesDetail)
              setStores(storesDetail)
              if (storesDetail.length > 0){
                setStoreId(storesDetail[0].id)
              }

              console.log("userDetail", payload)
            } else {
              console.log("userDetail error", message)
            }
          })
      }
    })()
  }, [])

  return (
    <Fragment style={{backgroundColor: 'white'}}>
      <HeaderComponent {...props}/>
      <Container style={styles.root}>
        <Content>
          <Form>
            <DropDown
              name={area.headOffice}
              list={headOffices}
            />
            <DropDown
              name={area.zone}
              list={zones}
            />
            <DropDown
              name={area.region}
              list={regions}
            />
            <DropDown
              name={area.city}
              list={cities}
            />
            <DropDown
              name={area.store}
              list={stores}
              onChangeOption={storeId => setStoreId(storeId)}
            />

            <SingleOption
              selectedOption={company}
              setOption={setCompany}
            />

            <View style={{marginTop: 20}}>
              <Button
                onPress={() => props.navigation.navigate("Review", {
                  company,
                  userId,
                  storeId: selectedStoreId
                })}
                block
                success
              >
                <Text>Start</Text>
                <Icon name='arrow-forward'/>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    </Fragment>
  );
}

export default Dashboard;
