import React from 'react';
import {Image} from 'react-native';
import {Container, View, Text, Content, Item, Input, Button, Spinner} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import HowmuchLogo
//   from '../../howmuch-pos-core/assets/white-logo-d2f8ee8ad6826748f6bbb347288990a00cf0f02bf834698f506ed3ee01f7c581.png';
import styles from './styles';
import LoadingScreen from '../Splash';

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
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

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
      this.props.navigation.navigate('Dashboard');
    }, 2000);
    // userLogin({username, password}).then(async (response) => {
    //   this.setState({
    //     isLoading: false,
    //   });
    //   const userInfo = response.data;
    //   await AsyncStorage.setItem(USER_INFO_LDK, JSON.stringify(response.data));
    //   this.props.navigation.navigate('Dashboard');
    // }).catch(error => {
    //   this.setState({
    //     isLoading: false,
    //   });
    //   console.log('error:', error);
    //   alert(error);
    // });
  };

  render() {
    const {username, password, isLoading, isSplashScreen} = this.state;
    if (isSplashScreen) {
      return <LoadingScreen/>;
    }
    return (
        <Container style={styles.root}>
          <Content style={styles.content}>
            <View style={styles.logoContainer}>
              {/*<Image source={HowmuchLogo} style={styles.logoImage}/>*/}
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
        </Container>
    );
  }
}

export default LoginComponent;
