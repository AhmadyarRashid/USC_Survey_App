import React, {useEffect, useState} from 'react';
import {Button, Input, Item, Label, Left, ListItem, Radio, Right, Text, View} from 'native-base';
import {updateQtyOfItem} from '../../howmuch-pos-core/utils/controller';
import isNaN from 'lodash/isNaN';
import {Modal} from 'react-native';
import {Colors} from '../../utils/colors';
import Toast from 'react-native-toast-message';

const tableHead = [
  'Name', 'Price', 'Qty', 'Total', 'Action',
];

// isFullOrderDiscount is used for add discount for all total
// updateGrandTotal is used for add order adjustments
function EditableModal(
    {
      isOpen, handlerCloseModal, selectedLineItem,
      selectedColIndex = 1, selectedRowIndex, order, isFullOrderDiscount = false,
      updateGrandTotal, ...props
    }) {
  const [value, setValue] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState('percentage');

  useEffect(() => {
    if (selectedColIndex === 1) {
      setValue(String(0));
    } else if (selectedColIndex === 2) {
      setValue(String(selectedLineItem.quantity));
    } else if (selectedColIndex === 3) {
      setValue(String(selectedLineItem.total));
    }
  }, [isOpen]);

  const updateQuantity = (qty) => {
    updateQtyOfItem({
      orderId: order.number,
      variantId: selectedLineItem.id,
      weighted_quantity: qty,
    }).then(line_item_response => {
      console.log('update line item qty:', line_item_response);
      const updated_line_items = [...order.line_items];
      updated_line_items[selectedRowIndex] = line_item_response;
      const updatedOrder = {
        ...order,
        ...line_item_response.order,
        line_items: updated_line_items,
      };
      props.updateOrder(updatedOrder);
    }).catch(error => {
      console.log('error update line item qty:', error);
    });
  };

  const updatePrice = (price) => {
    updateQtyOfItem({
      orderId: order.number,
      variantId: selectedLineItem.id,
      price,
    }).then(line_item_response => {
      console.log('update line item qty:', line_item_response);
      const updated_line_items = [...order.line_items];
      updated_line_items[selectedRowIndex] = line_item_response;
      const updatedOrder = {
        ...order,
        ...line_item_response.order,
        line_items: updated_line_items,
      };
      props.updateOrder(updatedOrder);
    }).catch(error => {
      console.log('error update line item qty:', error);
    });
  };

  const updateLineItemHandler = () => {
    if (Number(value) < 0) {
      alert('Please enter positive number only.');
      return;
    }

    if (selectedColIndex === 2) { // when we change line item quantity
      updateQuantity(value);
    } else {      // when we change line item total amount
      let updated_price = Number(value);
      let update_quantity_price = Number(value);
      if (order.item_total) {
        if (updated_price <= 0) {
          alert('Item total must be greater than 0');
          return;
        }
        let quantity = Number(selectedLineItem.weighted_quantity);
        updated_price = updated_price / quantity;
      }

      if (selectedLineItem.weighted_ratio >= 1) {
        let quantity1 = update_quantity_price / Number(selectedLineItem.weighted_price);
        updateQuantity(quantity1);
        console.log('updated quantity', quantity1, updated_price);
      } else {
        updatePrice(updated_price);
      }
    }
    handlerCloseModal();
  };

  const applyDiscount = () => {
    debugger;
    let disc_field = value;
    const {adjustment_total = 0} = order; // 0 is default value

    if (isFullOrderDiscount && Number(adjustment_total) > 0) {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Adjustment/Discount',
        text2: 'Reset the discount before adding more discount',
        autoHide: true,
      });
      return;
    }

    if (!isNaN(disc_field)) {
      disc_field = parseFloat(disc_field);
      let price = isFullOrderDiscount ? parseFloat(order.total) : parseFloat(selectedLineItem.weighted_price);
      if (selectedDiscount === 'value') {
        if (disc_field > -1 && disc_field <= price) {
          // if (isFullOrderDiscount) {
          price = price - disc_field;
          // } else {
          //   price = disc_field;
          // }
          setValue('');
          setSelectedDiscount('percentage');
          if (isFullOrderDiscount) {
            updateGrandTotal(price); // apply whole order adjustment
            handlerCloseModal();
          } else {
            updateQtyOfItem({
              orderId: order.number,
              variantId: selectedLineItem.id,
              _id: selectedLineItem.id,
              price,
              display_name: selectedLineItem.display_name,
              weighted_quantity: selectedLineItem.weighted_quantity,
            }).then(line_item_response => {
              console.log('line_item_response:', line_item_response);
              const updated_line_items = [...order.line_items];
              updated_line_items[selectedRowIndex] = line_item_response;

              const updatedOrder = {
                ...order,
                ...line_item_response.order,
                line_items: updated_line_items,
              };
              props.updateOrder(updatedOrder);
              handlerCloseModal();
            });
          }
        } else {
          alert('Invalid range');
        }
      } else {
        if (disc_field >= 0 && disc_field <= 100) {
          // if (isFullOrderDiscount) {
            price = price - (disc_field * price) / 100;
          // } else {
          //   price = (disc_field * price) / 100;
          // }
          setValue('');
          setSelectedDiscount('percentage');

          if (isFullOrderDiscount) {
            updateGrandTotal(price);
            handlerCloseModal();
          } else {
            updateQtyOfItem({
              orderId: order.number,
              variantId: selectedLineItem.id,
              _id: selectedLineItem.id,
              price,
              display_name: selectedLineItem.display_name,
              weighted_quantity: selectedLineItem.weighted_quantity,
            }).then(line_item_response => {
              console.log('line_item_response:', line_item_response);
              const updated_line_items = [...order.line_items];
              updated_line_items[selectedRowIndex] = line_item_response;

              const updatedOrder = {
                ...order,
                ...line_item_response.order,
                line_items: updated_line_items,
              };
              props.updateOrder(updatedOrder);
              handlerCloseModal();
            });
          }
        } else {
          alert('Invalid range');
        }
      }
    } else {
      alert('invalid range');
    }
  };

  if (selectedColIndex === 1) {
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
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
              <Text style={{fontSize: 22}}>Add Discount</Text>
              <ListItem
                  onPress={() => setSelectedDiscount('percentage')}
                  selected={selectedDiscount === 'percentage'}
                  style={{width: '100%', marginTop: 12}}
              >
                <Left>
                  <Text style={{color: 'black'}}>Percentage</Text>
                </Left>
                <Right>
                  <Radio
                      color={Colors.black}
                      selectedColor={Colors.primary}
                      selected={selectedDiscount === 'percentage'}
                  />
                </Right>
              </ListItem>
              <ListItem
                  onPress={() => setSelectedDiscount('value')}
                  style={{width: '100%'}}
                  selected={selectedDiscount === 'value'}
              >
                <Left>
                  <Text style={{color: 'black'}}>Value</Text>
                </Left>
                <Right>
                  <Radio
                      color={Colors.black}
                      selectedColor={Colors.primary}
                      selected={selectedDiscount === 'value'}
                  />
                </Right>
              </ListItem>
              <Item floatingLabel style={{marginTop: 22}}>
                <Label>Add Discount</Label>
                <Input
                    keyboardType="numeric"
                    value={value}
                    onChangeText={text => setValue(text)}
                />
              </Item>
              <View style={{marginTop: 22, display: 'flex', flexDirection: 'row'}}>
                <Item>
                  <Button
                      small
                      style={{backgroundColor: Colors.danger}}
                      onPress={() => {
                        setValue('0');
                        setSelectedDiscount('percentage');
                        if (isFullOrderDiscount) {
                          updateGrandTotal(Number(order.total) + Number(order.adjustment_total));  // reset whole order discount using adjustment method
                        } else {
                          updateQtyOfItem({
                            orderId: order.number,
                            variantId: selectedLineItem.id,
                            _id: selectedLineItem.id,
                            price: selectedLineItem.weighted_price,
                            display_name: selectedLineItem.display_name,
                            weighted_quantity: selectedLineItem.weighted_quantity,
                          }).then(line_item_response => {
                            console.log('line_item_response:', line_item_response);
                            const updated_line_items = [...order.line_items];
                            updated_line_items[selectedRowIndex] = line_item_response;

                            const updatedOrder = {
                              ...order,
                              ...line_item_response.order,
                              line_items: updated_line_items,
                            };
                            props.updateOrder(updatedOrder);
                            handlerCloseModal();
                          });
                        }
                      }}
                  >
                    <Text>Reset</Text>
                  </Button>
                </Item>
                <Item>
                  <Button
                      small
                      style={{backgroundColor: Colors.primary}}
                      onPress={() => applyDiscount()}
                  >
                    <Text>Apply</Text>
                  </Button>
                </Item>
                <Item>
                  <Button
                      small
                      danger
                      onPress={() => handlerCloseModal()}
                  >
                    <Text>Cancel</Text>
                  </Button>
                </Item>
              </View>
            </View>
          </View>
        </Modal>
    );
  }

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
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
            <Item floatingLabel>
              <Label>{tableHead[selectedColIndex]}</Label>
              <Input
                  keyboardType="numeric"
                  value={value}
                  onChangeText={text => setValue(text)}
              />
            </Item>
            <View style={{marginTop: 22, display: 'flex', flexDirection: 'row'}}>
              <Item>
                <Button
                    small
                    style={{backgroundColor: Colors.primary}}
                    onPress={() => updateLineItemHandler()}
                >
                  <Text>Save</Text>
                </Button>
              </Item>
              <Item>
                <Button
                    small
                    danger
                    onPress={() => handlerCloseModal()}
                >
                  <Text>Cancel</Text>
                </Button>
              </Item>
            </View>
          </View>
        </View>
      </Modal>
  );
}

export default EditableModal;
