import React from 'react';
import {AsyncStorage} from "react-native";
import {
  Button,
  Text,
  Container,
  Header,
  Content,
  List,
  ListItem,
  Right,
  Left,
  Icon,
  Body,
  Title,
} from 'native-base';
import {Colors} from '../../utils/colors';

function SettingScreen({navigation, ...props}) {

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('userInfo');
    AsyncStorage.clear().then(response => {
      navigation.navigate('login');
    });
  };

  return (
      <React.Fragment>
        <Container>
          <Header>
            <Left>
              <Button onPress={() => navigation.goBack()} transparent>
                <Icon style={{color: Colors.primary}} name='arrow-back'/>
              </Button>
            </Left>
            <Body>
              <Title>Settings</Title>
            </Body>
            <Right/>
          </Header>
          <Content>
            <List>
              <ListItem>
                <Left>
                  <Text>Build Version</Text>
                </Left>
                <Right>
                  <Text>v1.11.2</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Clear Cache</Text>
                </Left>
              </ListItem>
              <ListItem onPress={() => logoutHandler()}>
                <Left>
                  <Text>Logout</Text>
                </Left>
              </ListItem>
            </List>
          </Content>
        </Container>
      </React.Fragment>
  );
}

export default SettingScreen;
