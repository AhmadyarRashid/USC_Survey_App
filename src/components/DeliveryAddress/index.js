import React, {useState, useEffect} from 'react';
import {View, Text, Form, Item, Label, Input, Button, Card, CardItem, Picker} from 'native-base';
import {Formik} from 'formik';
import {getCountry, getStates, getCities, updateAddress} from '../../howmuch-pos-core/utils/controller';
import styles from './styles';

function DeliveryAddress({order}) {

  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [selectedCountry, setCountry] = useState('Pakistan');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    getCountry()
        .then(response => {
          setCountries(response.countries);
        })
        .catch(error => {
          console.log('get countries error', error);
        });

    getStates('')
        .then(response => {
          setProvinces(response.states);
        })
        .catch(error => {
          console.log('get states error', error);
        });
  }, []);

  const saveAddressHandler = () => {
    const payload = {
      id: order.number,
      address1,
      address2,
      country_id: countries.find(country => country.name === selectedCountry).id,
      state_id: provinces.find(state => state.name === selectedProvince).id,
      city: selectedCity
    }
    updateAddress(payload)
        .then(response => {
          alert("update address successfully");
          setSelectedCity('')
          setSelectedProvince('')
          setAddress1('')
          setAddress2('')
        })
        .catch(error => {
          console.log("address error", error)
        })
  }

  return (
      <Card style={styles.root}>
        <CardItem>
          <Text style={styles.heading}>This is delivery address form</Text>
        </CardItem>

        <CardItem style={styles.form}>
          <Item floatingLabel style={styles.fullInputItem}>
            <Label>Address 1</Label>
            <Input
                value={address1}
                onChangeText={value => setAddress1(value)}
            />
          </Item>
          <Item floatingLabel style={styles.fullInputItem}>
            <Label>Address 2</Label>
            <Input
                value={address2}
                onChangeText={value => setAddress2(value)}
            />
          </Item>
          <Picker
              note
              mode="dropdown"
              selectedValue={selectedCountry}
              onValueChange={value => setCountry(value)}
          >
            <Picker.Item label="Select Country" value="Select Country"/>
            {countries.map((country, index) =>
                <Picker.Item key={index} label={country.name} value={country.name}/>)}
          </Picker>
          <Picker
              note
              mode="dropdown"
              selectedValue={selectedProvince}
              onValueChange={value => {
                setSelectedProvince(value);
                const selectedProvinceId = provinces.find(item => item.name === value).id
                console.log(value, selectedProvinceId)
                getCities(selectedProvinceId)
                    .then(response => {
                      setCities(response.cities)
                    })
              }}
          >
            <Picker.Item label="Select State" value=""/>
            {provinces.map((province, index) =>
                <Picker.Item key={index} onPress={() => alert('selected state', provinces.name)}
                             label={province.name} value={province.name}/>)}
          </Picker>
          <Picker
              note
              mode="dropdown"
              selectedValue={selectedCity}
              onValueChange={value => setSelectedCity(value)}
          >
            <Picker.Item label="Select City" value=""/>
            {cities.map((city, index) =>
                <Picker.Item key={index}
                             label={city}
                             value={city}/>)}
          </Picker>
        </CardItem>

        <CardItem style={styles.actionButton}>
          <Button
              style={styles.button}
              success
              small
              onPress={() => saveAddressHandler()}
              title="Submit">
            <Text>Submit</Text>
          </Button>
          <Button
              style={styles.button}
              danger
              small
              type='reset'
              onPress={() => {
                setAddress1('')
                setAddress2('')
                setSelectedCity('Pakistan')
                setSelectedProvince('Islamabad')
                setSelectedCity('')
              }}
          >
            <Text>Reset</Text>
          </Button>
        </CardItem>

      </Card>
  );
}

export default DeliveryAddress;
