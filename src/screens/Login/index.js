import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import {Container, View, Text, Content, Item, Input, Button, Spinner} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogin} from '../../howmuch-pos-core/resources/UserAuth.native.js';
import HowmuchLogo
  from '../../howmuch-pos-core/assets/white-logo-d2f8ee8ad6826748f6bbb347288990a00cf0f02bf834698f506ed3ee01f7c581.png';
import styles from './styles';
import {getAllShopLinks} from '../../howmuch-pos-core/resources/UserAuth.native';
import LoadingScreen from '../Splash';
import UserAuth from '../../howmuch-pos-core/resources/UserAuth.js';
import {loadTaxons, getAllShopCustomers} from '../../howmuch-pos-core/utils/controller';
import {USER_INFO_LDK, SHOPS_LDK} from '../../howmuch-pos-core/utils/constant';

// import {shops} from '../Dashboard/data';

class LoginComponent extends React.Component {

  constructor(props) {
    // noinspection JSAnnotator
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isSplashScreen: true,
    };
  }

  async componentDidMount() {
    const userAuth = new UserAuth({remotehost: 'https://www.howmuch.pk'});
    userAuth.syncData();
    let data = await AsyncStorage.getItem('userInfo');
    setTimeout(() => {
      if (data) {
        this.props.navigation.navigate('Dashboard');
      }
    }, 3000);
    setTimeout(() => {
      this.setState({
        isSplashScreen: false,
      });
    }, 3500);
  }

  handlerChangeUsername = username => {
    this.setState({
      username,
    });
  };

  handlerChangePassword = password => {
    this.setState({
      password,
    });
  };

  handlerLogin = () => {
    const {username, password} = this.state;
    this.setState({
      isLoading: true,
    });
    userLogin({username, password}).then(async (response) => {
      this.setState({
        isLoading: false,
      });
      const userInfo = response.data;
      await AsyncStorage.setItem(USER_INFO_LDK, JSON.stringify(response.data));
      await AsyncStorage.setItem(SHOPS_LDK, JSON.stringify(userInfo.shops));
      await getAllShopLinks(userInfo.shops, userInfo.access_token);
      this.props.navigation.navigate('Dashboard');
      await getAllShopCustomers(userInfo.shops);
    }).catch(error => {
      this.setState({
        isLoading: false,
      });
      console.log('error:', error);
      alert(error);
    });
  };

  render() {
    const {username, password, isLoading, isSplashScreen} = this.state;
    if (isSplashScreen) {
      return <LoadingScreen/>;
    }
    return (
        <Container style={styles.root}>
          {/*<ImageBackground source={{uri: LoginImage}} style={styles.image}>*/}
          <Content style={styles.content}>
            <View style={styles.logoContainer}>
              <Image source={HowmuchLogo} style={styles.logoImage}/>
            </View>
            <Item regular style={styles.inputContainer}>
              <Input
                  autoCapitalize="none"
                  placeholder='Username'
                  style={styles.input}
                  value={username}
                  onChangeText={text => this.handlerChangeUsername(text)}
              />
            </Item>
            <Item regular style={styles.inputContainer}>
              <Input
                  autoCapitalize="none"
                  placeholder='Password'
                  style={styles.input}
                  value={password}
                  onChangeText={text => this.handlerChangePassword(text)}
              />
            </Item>
            <Button
                full
                onPress={() => this.handlerLogin()}
                style={styles.loginBtn}>
              {isLoading ? <Spinner color='green'/> : <Text style={styles.loginBtnText}>Login</Text>}
            </Button>
          </Content>
          {/*</ImageBackground>*/}
        </Container>
    );
  }
}

export default LoginComponent;
