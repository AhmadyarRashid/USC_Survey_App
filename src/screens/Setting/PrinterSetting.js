import React, {useState, useEffect} from 'react';
import {
  Container,
  Header,
  Button,
  Content,
  Icon,
  Title,
  Accordion,
  Text,
  Right,
  View,
  Left,
  Body,
  Switch,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../utils/colors';

const dataArray = [
  // {title: 'Choose Printer Type', index: 0},
  {title: 'Thermal Printer', index: 1},
  {title: 'Choose Paper Roll Type', index: 2},
];

function PrinterSetting({navigation, ...props}) {

  const [isUSB, setIsUSB] = useState(false);
  const [is80mm, setIs80mm] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [portNumber, setPortNumber] = useState("");

  useEffect(() => {
    (async function() {
      const paperRollF = await AsyncStorage.getItem('paperRoll');
      const typeF = await AsyncStorage.getItem('type');
      const ipAddressF = await AsyncStorage.getItem('ipAddress');
      const portNumberF = await AsyncStorage.getItem('portNumber');
      setPortNumber(portNumberF);
      setIpAddress(ipAddressF);
      setIs80mm(paperRollF == "80mm")
      setIsUSB(typeF == "usb")
    })()
  }, [])

  const _renderHeader = (item, expanded) => {
    return (
        <View style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(210,210,210,0.36)',
        }}>
          <Text style={{fontWeight: '600'}}>
            {' '}{item.title}
          </Text>
          {expanded
              ? <Icon style={{fontSize: 18}} name="arrow-down"/>
              : <Icon style={{fontSize: 18}} name="arrow-forward"/>}
        </View>
    );
  };

  const _renderContent = ({index}) => {
    if (index === 0) {
      return (
          <View style={{padding: 12, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 8}}>Wifi</Text>
            <Switch value={isUSB} onChange={async() => {
              await setIsUSB(!isUSB)
              await AsyncStorage.setItem("type", !isUSB ? "usb" : "wifi");
            }} style={{marginRight: 8}}/>
            <Text>USB</Text>
          </View>
      );
    } else if (index === 1) {
      return (
          <View style={{padding: 8, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {
              isUSB
                  ? <Button small style={{backgroundColor: Colors.primary}}><Text>GET USB PRINTER</Text></Button>
                  : <Form style={{width: '100%', marginBottom: 22}}>
                    <Item floatingLabel>
                      <Label>Ip Address</Label>
                      <Input value={ipAddress} onChangeText={text => {
                        setIpAddress(text)
                        AsyncStorage.setItem("ipAddress", text);
                      }}/>
                    </Item>
                    <Item floatingLabel>
                      <Label>Port Number</Label>
                      <Input value={portNumber} onChangeText={text => {
                        setPortNumber(text)
                        AsyncStorage.setItem('portNumber', text);
                      }}/>
                    </Item>
                  </Form>
            }
          </View>
      );
    } else {
      return (
          <View style={{padding: 12, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 8}}>58mm</Text>
            <Switch value={is80mm} onChange={async() => {
              await setIs80mm(!is80mm)
              await AsyncStorage.setItem('paperRoll', !is80mm ? "80mm" : "58mm");
            }} style={{marginRight: 8}}/>
            <Text>80mm</Text>
          </View>
      );
    }
  };

  return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => navigation.goBack()} transparent>
              <Icon style={{color: Colors.primary}} name="arrow-back"/>
            </Button>
          </Left>
          <Body>
            <Title>
              Printer Setting
            </Title>
          </Body>
          <Right/>
        </Header>
        <Content padder style={{backgroundColor: 'white'}}>
          <Accordion
              dataArray={dataArray}
              animation={true}
              expanded={[0]}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
          />
        </Content>
      </Container>
  );
}

export default PrinterSetting;
