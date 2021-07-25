import React, {Fragment, useState, useEffect} from 'react';
import {Text, Container, Content, Form, Icon, View, Button} from 'native-base';
import HeaderComponent from "./header";
import SingleOption from "../../components/SelectOption"
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDown from "../../components/DropDown";
import {area} from "../../utils/constant"
import {profileAPI} from "../../API/user"

import styles from './styles';

let allZones = []
let allRegions = []
let allCities = []
let allStores = []

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
  const [isLoading, setLoading] = useState(false)

  // selected area ids
  const [selectedZoneId, setSelectedZoneId] = useState("-1")
  const [selectedRegionId, setSelectedRegionId] = useState("-1")
  const [selectedCityId, setSelectedCityId] = useState("-1")

  useEffect(() => {
    (async function () {
      let userInfo = await AsyncStorage.getItem("userInfo")
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        setUserId(userInfo.userId)
        setLoading(true)
        profileAPI(userInfo.userId)
          .then(response => {
            setLoading(false)
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

              // set all details
              allZones = zonesDetail
              allRegions = regionsDetail
              allCities = citiesDetail
              allStores = storesDetail

              // update states that display in dropdown
              setZones(zonesDetail)   // dont touch it
              setRegions(regionsDetail.filter(region => region.pid == zonesDetail[0].id))
              setCities(citiesDetail.filter(city => city.pid == regionsDetail[0].id))
              setStores(storesDetail.filter(store => store.pid == citiesDetail[0].id))

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

  const onChangeZoneId = async zoneId => {
    await setSelectedZoneId(zoneId)
    await setRegions(allRegions.filter(region => region.pid == zoneId))
    await setCities(allCities.filter(city => city.pid == regions[0].id))
    await setStores(allStores.filter(store => store.pid == cities[0].id))
  }

  const onChangeRegionId = async regionId => {
    await setSelectedRegionId(regionId)
    await setCities(allCities.filter(city => city.pid == regionId))
    await setStores(allStores.filter(store => store.pid == cities[0].id))
  }

  const onChangeCityId = async cityId => {
    await setSelectedCityId(cityId)
    await setStores(allStores.filter(store => store.pid == cityId))
  }

  return (
    <Fragment style={{backgroundColor: 'white'}}>
      <HeaderComponent {...props}/>
      {isLoading
        ? <Text style={{textAlign: 'center'}}>Loading...</Text>
        : <Container style={styles.root}>
          <Content>
            <Form>
              <DropDown
                name={area.headOffice}
                list={headOffices}
              />
              <DropDown
                name={area.zone}
                list={zones}
                onChangeOption={zoneId => onChangeZoneId(zoneId)}
              />
              <DropDown
                name={area.region}
                list={regions}
                onChangeOption={regionId => onChangeRegionId(regionId)}
              />
              <DropDown
                name={area.city}
                list={cities}
                onChangeOption={cityId => onChangeCityId(cityId)}
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
      }
    </Fragment>
  );
}

export default Dashboard;
