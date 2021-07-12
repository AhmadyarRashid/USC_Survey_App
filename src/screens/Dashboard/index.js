import React, {useState, useEffect} from 'react';
import {View, Text, Container, Body, Button, Content, Item, Input} from 'native-base';
import StoreCard from '../../components/StoreCard';
import HeaderComponent from "./header";
import {shops} from './data';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllShops, getAllShopLinks, downloadShopDB} from "../../howmuch-pos-core/resources/UserAuth.native"
import ReactResource from 'react-resource';
import jstz from 'jstz'
import axios from "axios"
import {isReactNative} from '../../utils/helper';
import {loadTaxons} from '../../howmuch-pos-core/utils/controller';

function Dashboard(props) {
  const [shopList, setShopList] = useState([]);
  const [term, setTerms] = useState('');
  const [userInfo, setUserInfo] = useState({});

  useEffect( () => {
    getUserInfo()
    loadTaxons();
  }, []);

  const getUserInfo = async () => {
    let data = await AsyncStorage.getItem('userInfo');
    if (data){
      const userInfo = !!JSON.parse(data) ? JSON.parse(data) : {shops: []}
      axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.access_token}`
      axios.defaults.headers.common['Time-Zone'] = jstz.determine().name();
      ReactResource.interceptors.push({
        request: function (config) {
          if (!config.options.headers) {
            config.options.headers = {}
          }
          if (!!userInfo.access_token) {
            config.options.headers['Authorization'] = `Bearer ${userInfo.access_token}`
          }
          config.options.headers['Time-Zone'] = jstz.determine().name();
          return config;
        }
      });
      // setShopList(userInfo.shops)
      await setUserInfo(JSON.parse(data));
      try{
        const shopsList = userInfo.shops;
        if (isReactNative && shopsList){
          await AsyncStorage.setItem("shops", JSON.stringify(shopsList))
        }
        setShopList(shopsList)
      }catch (e) {
        console.log("error:", e);
      }
    }else{
      props.navigation.navigate("login")
    }
  };

  let filteredShopList = shopList.filter(shop => shop.name.toLowerCase().indexOf(term.toLowerCase()) > -1);

  return (
      <Container style={styles.root}>
        <HeaderComponent {...props}/>
        <Content>
          <Item regular>
            <Input
                placeholder='Search Here'
                value={term}
                onChangeText={text => setTerms(text)}
            />
          </Item>
          {filteredShopList.map(shop => <StoreCard key={shop.slug} shop={shop} {...props}/>)}
        </Content>
      </Container>
  );
}

export default Dashboard;
