import React from 'react';
import {Image} from 'react-native';
import {Container, View, Text, Content, Item, Input, Button, Spinner} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../Splash';
import {loginAPI} from "../../API/user"
import Logo from "../../assets/usc.jpg"
import styles from './styles';
import Toast from 'react-native-simple-toast';

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isSplashScreen: true,
    };
  }

  async componentDidMount() {
    let data = await AsyncStorage.getItem('userInfo');
    setTimeout(() => {
      if (data) {
        data = JSON.parse(data)
        this.props.navigation.navigate('Dashboard', {
          userId: data.userId
        });
      }
    }, 3000);
    setTimeout(() => {
      this.setState({
        isSplashScreen: false,
      });
    }, 3500);
  }

  handlerChangeEmail = email => {
    this.setState({
      email,
    });
  };

  handlerChangePassword = password => {
    this.setState({
      password,
    });
  };

  handlerLogin = () => {
    const {email, password} = this.state;

    if (email.length < 4 || email.indexOf("@") === -1) {
      Toast.showWithGravity("Please enter correct email", Toast.SHORT, Toast.TOP);
      return;
    }

    if (password.length === 0) {
      Toast.showWithGravity("Please enter password", Toast.SHORT, Toast.TOP);
      return;
    }

    this.setState({
      isLoading: true,
    });

    // now hit api
    loginAPI(email, password)
      .then(response => {
        console.log("login response", response)
        const {
          isSuccess = false,
          payload = {},
          message = ""
        } = response
        if (isSuccess) {
          AsyncStorage.setItem("userInfo", JSON.stringify(payload));
          this.setState({
            isLoading: false,
          });
          this.props.navigation.navigate('Dashboard',{
            userId: payload.userId
          });
        } else {
          //  message
          this.setState({
            isLoading: false,
          });
          Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
        }
      })
      .catch(error => {
        console.log("login error response", error)
      })
  }

  render() {
    const {email, password, isLoading, isSplashScreen} = this.state;
    if (isSplashScreen) {
      return <LoadingScreen/>;
    }
    return (
      <Container style={styles.root}>
        <Content style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={Logo}/>
          </View>
          <Item regular style={styles.inputContainer}>
            <Input
              autoCapitalize="none"
              placeholder='Email'
              style={styles.input}
              value={email}
              onChangeText={text => this.handlerChangeEmail(text)}
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
            disabled={isLoading}
            onPress={() => this.handlerLogin()}
            style={styles.loginBtn}>
            {isLoading ? <Spinner color="white" size={20}/> : <Text style={styles.loginBtnText}>Login</Text>}
          </Button>
        </Content>
      </Container>
    );
  }
}

export default LoginComponent;
