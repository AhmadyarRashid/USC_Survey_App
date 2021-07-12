import React, {useState, useEffect} from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import {TouchableOpacity} from 'react-native';
import {Item, Text} from 'native-base';

function CustomerAutocomplete({
                                filteredBy,
                                customers = [{email: 'create new customer'}],
                                defaultValue = "",
                                onSelectCustomer = () => {},
                                openNewCustomerHandler = () => {}
                              }) {

  const [query, setQuery] = useState("")
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData([])
  }, [customers])

  useEffect(() => {
    setQuery(defaultValue)
    setFilteredData([])
  }, [defaultValue])

  const onChangeHandler = (value) => {
    setQuery(value)
    if (value && filteredData.length > 0) {
      let filterCustomer = []
      if (filteredBy === "email"){
        filterCustomer = customers.filter(
            customer => !!value && String(customer.email).toLowerCase().indexOf(String(value).toLowerCase()) > -1);
      }else if (filteredBy === "name"){
        filterCustomer = customers.filter(
            customer => !!value && String(customer.first_name).toLowerCase().indexOf(String(value).toLowerCase()) > -1);
      }else if (filteredBy === "phoneNo"){
        filterCustomer = customers.filter(
            customer => !!value && String(customer.phone).toLowerCase().indexOf(String(value).toLowerCase()) > -1);
      }
      if (filterCustomer.length === 0){
        filterCustomer.push({
          first_name: 'Create New',
          email: 'Create New',
          phone: 'Create New'
        })
      }
      setFilteredData(filterCustomer);
    } else { // if we clear input
      setFilteredData(customers);
    }
  };

  return (
      <Autocomplete
          containerStyle={{marginTop: 8, marginLeft: 8, width: '45%'}}
          autoCapitalize="none"
          defaultValue={defaultValue}
          placeholder={filteredBy}
          value={query}
          data={query ? filteredData.slice(0,3) : []}
          onChangeText={val => onChangeHandler(val)}
          keyExtractor={({item, i}) => i}
          renderItem={({item, i}) => {
            let displayText = ""
            if (filteredBy === "email"){
              displayText = item.email
            }else if (filteredBy === "phoneNo"){
              displayText = item.phone
            }else if (filteredBy === "name"){
              displayText = item.first_name
            }
            return(
                <TouchableOpacity
                    onPress={() => {
                      setQuery(displayText)
                      setFilteredData([])
                      if (item.email === "Create New"){
                        openNewCustomerHandler()
                      }else {
                        onSelectCustomer({
                          name: item.first_name + " " + item.last_name,
                          email: item.email,
                          phoneNo: item.phone,
                        })
                      }
                    }}>
                  <Text style={{padding: 6, zIndex: 999}}>{displayText}</Text>
                </TouchableOpacity>
            )
          }}
      />
  );
}

export default CustomerAutocomplete;
