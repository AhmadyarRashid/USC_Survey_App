import React from 'react';
import {Image} from 'react-native';
import {Container, View, Text, Content, Item, Input, Button, Spinner, Toast, NativeBase} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../Splash';
import {loginAPI} from "../../API/user"
import Logo from "../../assets/usc.jpg"
import styles from './styles';
import { showMessage } from "react-native-flash-message";

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
        this.props.navigation.navigate('Dashboard');
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
      showMessage({
        message: "Please enter correct email",
        type: "danger",
        duration: 3000,
      });
      return;
    }

    if (password.length === 0){
      showMessage({
        message: "Please enter password",
        type: "danger",
        duration: 3000,
      });
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
          this.props.navigation.navigate('Dashboard');
        } else {
          //  message
          this.setState({
            isLoading: false,
          });
          showMessage({
            message,
            type: "danger",
            duration: 3000,
          });
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
