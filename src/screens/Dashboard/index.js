import React, {Fragment, useState} from 'react';
import {Text, Container, Content, Form, Item, Picker, Icon, View, Button} from 'native-base';
import HeaderComponent from "./header";
import SingleOption from "../../components/SelectOption"
import DropDown from "../../components/DropDown";
import {area} from "../../utils/constant"

import styles from './styles';

function Dashboard(props) {

  const [headOffices, setHeadOffices] = useState([])
  const [zones, setZones] = useState([])
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const [stores, setStores] = useState([])
  const [company, setCompany] = useState("ptcl")


  const {navigation} = props;

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
            />

            <SingleOption
              selectedOption={company}
              setOption={setCompany}
            />

            <View style={{marginTop: 20}}>
              <Button
                onPress={() => navigation.navigate("Review")}
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
