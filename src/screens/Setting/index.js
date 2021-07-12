import React, {useState, useEffect} from 'react';
import {Modal} from 'react-native';
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
  Item, Input, Label, View,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../utils/colors';

function DrawerModal({isOpen = true, handlerCloseModal}) {
  const [cashDrawerTitle, setCashDrawerTitle] = useState('');
  useEffect(() => {
    (async function() {
      const drawerTitle = await AsyncStorage.getItem("cashDrawerTitle")
      if (drawerTitle){
        setCashDrawerTitle(drawerTitle)
      }
    })()
  });
  return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onRequestClose={() => {
            alert('Modal has been closed.');
            handlerCloseModal();
          }}
      >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            // shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
            <Item floatingLabel>
              <Label>Cash Drawer Title</Label>
              <Input
                  value={cashDrawerTitle}
                  onChangeText={async text => {
                    await setCashDrawerTitle(text);
                    await AsyncStorage.setItem('cashDrawerTitle', text);
                  }}
              />
            </Item>
            <Item style={{marginTop: 22}}>
              <Button
                  style={{backgroundColor: Colors.primary}}
                  onPress={() => handlerCloseModal()}
              >
                <Text>Save</Text>
              </Button>
            </Item>
          </View>
        </View>
      </Modal>
  );
}

function SettingScreen({navigation, ...props}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handlerCloseModal = () => {
    setModalOpen(false);
  };

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('userInfo');
    AsyncStorage.clear().then(response => {
      navigation.navigate('login');
    });
  };

  return (
      <React.Fragment>
        <Container>
          <DrawerModal
              isOpen={isModalOpen}
              handlerCloseModal={handlerCloseModal}
          />
          <Header>
            <Left>
              <Button onPress={() => navigation.goBack()} transparent>
                <Icon style={{color: Colors.primary}} name='arrow-back'/>
              </Button>
            </Left>
            <Body>
              <Title>Setting</Title>
            </Body>
            <Right/>
          </Header>
          <Content>
            <List>
              <ListItem onPress={() => navigation.navigate('PrinterSetting')}>
                <Left>
                  <Text>Printer</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward"/>
                </Right>
              </ListItem>
              {/*<ListItem>*/}
              {/*  <Left>*/}
              {/*    <Text>Barcode</Text>*/}
              {/*  </Left>*/}
              {/*  <Right>*/}
              {/*    <Icon name="arrow-forward"/>*/}
              {/*  </Right>*/}
              {/*</ListItem>*/}
              <ListItem onPress={() => setModalOpen(true)}>
                <Left>
                  <Text>Cash Drawer</Text>
                </Left>
              </ListItem>
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
