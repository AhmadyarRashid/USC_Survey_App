import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {Input, Text} from 'native-base';
import {getBDConnection} from '../../howmuch-pos-core/resources/UserAuth.native';
import {updateQtyOfItem} from '../../howmuch-pos-core/utils/controller';

function AutoCompleteComponent({order, addRNLineItems, ...props}) {

  const [query, setQuery] = useState('');
  const [lineItems, setLineItems] = useState([]);

  const filteredData = lineItems.filter(lineItem => !!query && lineItem.name.toLowerCase().indexOf(query.toLowerCase()) > -1);

  const onChangeItemSearch = key => {
    setQuery(key);

    getBDConnection(order.shop.slug, key)
        .then(response => {
          setLineItems(response.length > 5 ? response.slice(0, 4) : response);
        });
  };

  const addLineItemHandler = variant => {
    const isAlreadyAvailable = order.line_items.find(item => item.display_name === variant.name);

    if (isAlreadyAvailable) {    // if line item is already exists
      const lineItemIndex = order.line_items.findIndex(item => item.display_name === variant.name);
      updateQtyOfItem({
        orderId: order.number,
        variantId: variant.id,
        weighted_quantity: Number(isAlreadyAvailable.weighted_quantity) + 1,
      }).then(line_item_response => {
        setQuery('');
        const updated_line_items = [...order.line_items];
        updated_line_items[lineItemIndex] = line_item_response;
        const updatedOrder = {
          ...order,
          ...line_item_response.order,
          line_items: updated_line_items,
        };
        props.updateOrder(updatedOrder);
      }).catch(error => {
        console.log('error update line item qty:', error);
      });
    } else {
      addRNLineItems(variant);
      setQuery('');
    }
  };

  return (
      <Autocomplete
          containerStyle={{marginTop: 8}}
          autoCapitalize="none"
          defaultValue={query}
          placeholder="Search Product"
          data={filteredData}
          onChangeText={val => onChangeItemSearch(val)}
          keyExtractor={({item, i}) => i}
          renderItem={({item, i}) => (
              <TouchableOpacity
                  onPress={() => addLineItemHandler(item)}>
                <Text style={{padding: 6}}>{item.name}</Text>
              </TouchableOpacity>
          )}
      />
  );
}

export default AutoCompleteComponent;
