import AsyncStorage from '@react-native-async-storage/async-storage';
import {isReactNative} from './helper';

export const getStoredDraftOrders = () => {
  return isReactNative() ? JSON.parse(AsyncStorage.getItem('draftOrders')) : JSON.parse(localStorage.getItem('draftOrders'));
};

export const updateStoredDraftOrders = orders => {
  if (isReactNative()) {
    AsyncStorage.setItem('draftOrders', JSON.stringify(orders));
  } else {
    localStorage.setItem('draftOrders', JSON.stringify(orders));
  }
};

export const update_last_date = (shops_status, shop_slug) => {
  const date = new Date();
  const updated_since = Number(date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
  try {
    let new_shops_status = [];
    if (shops_status.filter(shop => shop.slug === shop_slug).length > 0) {
      new_shops_status = shops_status.map(shop => {
        if (shop.slug === shop_slug) {
          return {
            slug: shop.slug,
            updated_since,
          };
        }
        return shop;
      });
    } else {
      new_shops_status = shops_status.concat({
        slug: shop_slug,
        updated_since,
      });
    }
    if (isReactNative()) {
      AsyncStorage.setItem('db_states', JSON.stringify(new_shops_status));
    } else {
      localStorage.setItem('db_states', JSON.stringify(new_shops_status));
    }

  } catch (e) {
    console.log('--- error -----', e);
  }
};

export const calculateTotalOrderPrice = (order, store) => {
  const {tax_rates} = store;
  return Number(order) + Number((!!tax_rates && tax_rates.length > 0) ? Number(order) * Number(tax_rates[0].amount) : 0);
};

export const isOfflineOrder = (order_number) => {
  let result = false;
  let draftOrders = getStoredDraftOrders();
  if (!!draftOrders) {
    !!draftOrders && draftOrders.forEach(order => {
      if (order.number === order_number) {
        result = true;
      }
    });
  }
  return result;
};

export const getCities = stateId => {
  return new Promise((resolve, reject) => {
    if (stateId === '2516') {
      resolve({cities: ['Bhimbar', 'Habib Baihk', 'Mandi', 'Muzaffarabad', 'New Mirpur', 'Pindi', 'Plot', 'Rawlakot']});
    } else if (stateId === '2513') {
      resolve({cities: ['Cantt', 'Goth Abad Magsi', 'Quetta', 'Sarwar', 'Usman', 'Ziauddin']});
    } else if (stateId === '6296') {
      resolve({cities: ['Miran Shah']});
    } else if (stateId === '2514') {
      resolve({cities: ['Gilgit-Baltistan']});
    } else if (stateId === '2515') {
      resolve({cities: ['Islamabad']});
    } else if (stateId === '2517') {
      resolve({
        cities: ['Abbottabad', 'Rawalpindi', 'Abbottabad', 'Adezai', 'Alpuri', 'Akora Khattak',
          'Ayubia', 'Banda Daud Shah', 'Bannu', 'Batkhela', 'Battagram', 'Birote', 'Chakdara', 'Charsadda', 'Cherat', 'Chitral',
          'Daggar', 'Dargai', 'Dera Ismail Khan', 'Doaba', 'Dir', 'Drosh', 'Hangu', 'Haripur', 'Karak', 'Kohat', 'Kulachi', 'Lakki Marwat',
          'Latamber', 'Madyan', 'Mansehra', 'Mardan', 'Mastuj', 'Mingora', 'Naran, Kaghan Valley',
          'Nowshera', 'Paharpur', 'Pabbi', 'Peshawar', 'Risalpur', 'Saidu Sharif', 'Shewa Adda', 'Swabi', 'Swat', 'Tangi', 'Tank', 'Thall',
          'Timergara', 'Tordher'],
      });
    } else if (stateId === '2518') {
      resolve({
        cities: ['Attock', 'Bahāwalpur', 'Burewala', 'Chakwal', 'Daska', 'Daud Khel', 'Dera Ghazi Khan', 'Faisalabad',
          'Gujar Khan', 'Gujranwala', 'Gujrat', 'Jhang City', 'Jhang Sadr', 'Jhelum', 'Jhumra', 'Kabirwala', 'Kasur', 'Khanewal',
          'Lahore', 'Mandi Bahauddin', 'Mian Channu', 'Mianwali', 'Multan', 'Nangar', 'Nankana Sahib', 'Narowal', 'Okara',
          'Rawalpindi', 'Sahiwal', 'Sarai Sidhu', 'Sargodha', 'Sheikhupura', 'Sialkot', 'Toba Tek Singh', 'Wazirabad'],
      });
    } else if (stateId === '6295') {
      resolve({cities: ['Clifton', 'Fazal', 'Gulberg', 'Gulshan-e-Iqbal', 'Hyderabad', 'Karachi', 'Saddar', 'Sukkur']});
    } else {
      resolve({
        cities: [
          'No City found',
        ],
      });
    }
  });
};

export const getCountry = () => {
  return new Promise(((resolve, reject) => {
    const countryList = [{
      id: 178,
      iso_name: 'PAKISTAN',
      iso: 'PK',
      iso3: 'PAK',
      name: 'Pakistan',
      numcode: 586,
    }];
    const countriesResponse = {
      current_page: 1,
      pages: 1,
      countries: countryList,
      count: countryList.length,
    };
    resolve(countriesResponse);
  }));
};

export const getStates = countryId => {
  return new Promise(((resolve, reject) => {
    const stateResponse = {
      states: [
        {
          id: 2516, name: 'Azad Kashmir', abbr: 'JK', country_id: 178,
        }, {
          id: 2513, name: 'Balochistan', abbr: 'BA', country_id: 178,
        }, {
          id: 6296, name: 'Federally Administered Tribal Areas', abbr: 'TA', country_id: 178,
        }, {
          id: 2514, name: 'Gilgit-Baltistan', abbr: 'GB', country_id: 178,
        }, {
          id: 2515, name: 'Islamabad', abbr: 'IS', country_id: 178,
        }, {
          id: 2517, name: 'Khyber Pakhtunkhwa', abbr: 'KP', country_id: 178,
        }, {
          id: 2518, name: 'Punjab', abbr: 'PB', country_id: 178,
        }, {
          id: 6295, name: 'Sindh', abbr: 'SD', country_id: 178,
        }],
      states_required: true,
    };
    resolve(stateResponse);
  }));
};

export const cashDrawerTransactions = data => {
  const {shop_id, order_id, cash_received, cash_drawer_title} = data;
  return new Promise(((resolve, reject) => {
    let draftOrders = getStoredDraftOrders();
    if (!!draftOrders) {
      let payment = {
        amount: cash_received,
        card_type: 'Cash',
        cash_drawer_title: cash_drawer_title,//selectedDraftOrder.customer_name,
        isNew: true,
        notes: '',
        id: 0,
        payment_method_id: 2,
        allow_partial_payment: 0,
        state: 'completed',
        debit: cash_received,
      };

      !!draftOrders && draftOrders.forEach(order => {
        if (order.number === order_id) {
          const totalAmount = calculateTotalOrderPrice(order.final_price, order.shop);

          order.status = 'complete';
          order.payment_state = 'paid';
          order.payment_total = order.final_price;
          order.outstanding_balance = Number(cash_received) > Number(order.final_price) ?
              '0.0' :
              Number(cash_received) - Number(order.final_price);
          // for pick up
          payment = {
            ...payment,
            credit: Number(cash_received) - totalAmount,
            amount: totalAmount,
          };
          order.return = payment.credit;
          order.recieved = Number(cash_received);

          order.payments = !!order.payments ? order.payments.concat(payment) : [payment];
        }
      });

      updateStoredDraftOrders(draftOrders);

      let selectedOrder = draftOrders.filter(order => order.number === order_id);
      if (selectedOrder.length > 0) {
        let paymentResponse = {
          credit: Number(cash_received) - Number(selectedOrder[0].final_price),
          debit: cash_received,
          order: selectedOrder,
        };
        if (selectedOrder[0].delivery_mode === 'delivery') {
          paymentResponse = {
            ...paymentResponse,
            credit: paymentResponse.credit - Number(selectedOrder[0].ship_total),
          };
        }
        resolve(paymentResponse);
      } else {
        resolve({
          errors: [
            'No offline order found',
          ],
        });
      }

    } else {
      resolve({
        errors: [
          'it is not offline order',
        ],
      });
    }
  }));
};

export const updatePriceAndQtyLineItems = data => {
  const {orderId, display_name, price, variant_id, weighted_quantity, _id} = data;
  return new Promise(((resolve, reject) => {
    let draftOrderList = getStoredDraftOrders();
    if (!!draftOrderList && draftOrderList.length > 0) {

      draftOrderList.forEach(order => {
        if (order.number == orderId) {
          let alreadyLineItemExist = order.line_items.filter(line_item => line_item.id === _id);

          if (alreadyLineItemExist.length < 1) {
            let new_line_item = {
              'id': _id,
              'quantity': weighted_quantity,
              'price': price,
              'variant_id': variant_id,
              'weighted_quantity': 1,
              'weighted_price': price,
              'weighted_ratio': 1,
              'is_weighted': false,
              'single_display_amount': 'Rs' + price,
              'display_amount': '₨' + (Number(weighted_quantity) * Number(price)),
              'total': (Number(weighted_quantity) * Number(price)),
              'images': [
                {
                  'id': 1482896,
                  'attachment_file_size': 2265,
                  'position': 1,
                  'attachment_content_type': 'image/jpeg',
                  'attachment_file_name': 'veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg',
                  'alt': null,
                  'attachment_height': 90,
                  'attachment_width': 90,
                  'mini_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/mini/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                  'small_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/small/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                  'product_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/product/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                  'large_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/large/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                  'squared_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/squared/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                  'phone_detail_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/phone_detail/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                  'phone_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/phone/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                  'phone_large_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/phone_large/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                  'product_medium_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/product_medium/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                  'product_small_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/product_small/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
                },
              ],
              'variant': {
                'id': variant_id,
                'sku': '6001106309497',
                'weight': '0.0',
                'height': null,
                'width': null,
                'depth': null,
                'is_master': false,
                'slug': null,
                'description': null,
                'upc': '6001106309497',
                'gtin': null,
                'product_id': 237942,
                'is_google_ad_friendly': false,
                'weighted_ratio': 1,
                'is_weighted': false,
                'name': display_name,
                'display_price': '₨' + (Number(weighted_quantity) * Number(price)),
                'price': Number(weighted_quantity) * Number(price),
                'currency': 'PKR',
                'options_text': 'Weight: 25gm, Weight: 25.0 g',
                'is_destroyed': false,
                'option_values': [
                  {
                    'presentation_with_option_type': 'Weight: 25gm',
                    'id': 544,
                    'name': '25gm',
                    'presentation': '25gm',
                    'option_type_name': null,
                    'option_type_id': 1,
                    'option_type_presentation': 'Weight: 25gm',
                  },
                  {
                    'presentation_with_option_type': 'Weight: 25.0 g',
                    'id': 600,
                    'name': '25.0 g',
                    'presentation': '25.0 g',
                    'option_type_name': null,
                    'option_type_id': 1,
                    'option_type_presentation': 'Weight: 25.0 g',
                  },
                ],
                'images': [],
                'likes_count': 0,
                'likes': 0,
                'track_inventory': true,
                'in_stock': false,
                'is_backorderable': false,
                'total_on_hand': -1,
              },
              'adjustments': [],
              'display_total': '₨' + (Number(weighted_quantity) * Number(price)),
              'display_name': display_name,
              'display_item_total': '₨' + (Number(weighted_quantity) * Number(price)),
            };
            order['line_items'] = [new_line_item, ...order['line_items']];
          }
        }
      });

      let selectedOrder = draftOrderList.filter(order => order.number === orderId)[0];
      // Now calculate total of overall order
      let final_total = 0;
      !!selectedOrder && selectedOrder.line_items.forEach(line_item => {
        final_total += Number(line_item.total);
      });

      // update item_total and total price
      const isDelivery = selectedOrder.delivery_mode == 'delivery';
      draftOrderList.forEach(order => {
        if (order.number == orderId) {
          order.item_total = final_total;
          order.total = final_total;
          order.outstanding_balance = isDelivery ? Number(final_total) + Number(selectedOrder.store.shop.fixed_delivery_charges) : final_total;
          order.fixed_delivery_charges = isDelivery ? (selectedOrder.store.shop.fixed_delivery_charges || '0') : '0';
          order.ship_total = isDelivery ? (selectedOrder.store.shop.fixed_delivery_charges || '0') : '0';
          // order.outstanding_balance = final_total;
          order.display_item_total = '₨' + final_total;
          order.total_quantity = selectedOrder.line_items.length;
          order.display_total = '₨' + final_total;
          order.final_price = final_total;
        }
      });

      updateStoredDraftOrders(draftOrderList);
      // selected order
      // let selectedOrder = draftOrderList.filter(order => order.number === orderId)[0];
      let selected_variant = selectedOrder.line_items.filter(line_item => line_item.variant_id === variant_id);

      let lineItemResponse = {
        'id': _id,
        'quantity': (!!selected_variant && selected_variant.length > 0) ? selected_variant[0].quantity : weighted_quantity,
        'price': price,
        'variant_id': variant_id,
        'weighted_quantity': (!!selected_variant && selected_variant.length > 0) ? selected_variant[0].quantity : weighted_quantity,
        'weighted_price': price,
        'weighted_ratio': 1,
        'is_weighted': false,
        'single_display_amount': '₨' + price,
        'display_amount': '₨' + (Number(weighted_quantity) * Number(price)),
        'total': (((!!selected_variant && selected_variant.length > 0) ? selected_variant[0].quantity : weighted_quantity) * Number(price)),
        'images': [
          {
            'id': 1482896,
            'attachment_file_size': 2265,
            'position': 1,
            'attachment_content_type': 'image/jpeg',
            'attachment_file_name': 'veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg',
            'alt': null,
            'attachment_height': 90,
            'attachment_width': 90,
            'mini_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/mini/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
            'small_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/small/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
            'product_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/product/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
            'large_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/large/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
            'squared_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/squared/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
            'phone_detail_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/phone_detail/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
            'phone_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/phone/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
            'phone_large_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/phone_large/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
            'product_medium_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/product_medium/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
            'product_small_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/product_small/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          },
        ],
        'variant': {
          'id': variant_id,
          'sku': '6001106309497',
          'weight': '0.0',
          'height': null,
          'width': null,
          'depth': null,
          'is_master': false,
          'slug': null,
          'description': null,
          'upc': '6001106309497',
          'gtin': null,
          'product_id': 237942,
          'is_google_ad_friendly': false,
          'weighted_ratio': 1,
          'is_weighted': false,
          'name': display_name,
          'display_price': '₨80.00',
          'price': '80.0',
          'currency': 'PKR',
          'options_text': 'Weight: 25gm, Weight: 25.0 g',
          'is_destroyed': false,
          'option_values': [
            {
              'presentation_with_option_type': 'Weight: 25gm',
              'id': 544,
              'name': '25gm',
              'presentation': '25gm',
              'option_type_name': null,
              'option_type_id': 1,
              'option_type_presentation': 'Weight: 25gm',
            },
            {
              'presentation_with_option_type': 'Weight: 25.0 g',
              'id': 600,
              'name': '25.0 g',
              'presentation': '25.0 g',
              'option_type_name': null,
              'option_type_id': 1,
              'option_type_presentation': 'Weight: 25.0 g',
            },
          ],
          'images': [],
          'likes_count': 0,
          'likes': 0,
          'track_inventory': true,
          'in_stock': false,
          'is_backorderable': false,
          'total_on_hand': -1,
        },
        'adjustments': [],
        'display_total': '₨' + (Number(weighted_quantity) * Number(price)),
        'display_name': display_name,
        'order': {
          ...selectedOrder,
          'number': orderId,
          'item_total': final_total,
          'total': final_total,
          'outstanding_balance': isDelivery ? Number(final_total) + Number(selectedOrder.store.shop.fixed_delivery_charges) : final_total,
          'fixed_delivery_charges': isDelivery ? (selectedOrder.store.shop.fixed_delivery_charges || '0') : '0',
          'ship_total': isDelivery ? (selectedOrder.store.shop.fixed_delivery_charges || '0') : '0',
          'display_item_total': '₨' + final_total,
          'total_quantity': !!selectedOrder ? selectedOrder.line_items.length : '0',
          'display_total': '₨' + final_total,
          'final_price': final_total,
        },
      };

      if (isOfflineOrder(orderId)) {
        resolve(lineItemResponse);
      } else {
        resolve({
          errors: [
            'This is not offline order',
          ],
        });
      }
    } else {
      resolve({
        errors: [
          'it is not offline order',
        ],
      });
    }
  }));
};

// /shop_admin/orders/:order_id/line_items/:id.json
export const updateQtyOfItem = data => {
  const orderId = req.params.order_id;
  const variantId = req.params.id;
  const weighted_quantity = req.body.quantity;
  const price = req.body.price;

  return new Promise(((resolve, reject) => {
    let draftOrderList = getStoredDraftOrders();
    if (!!draftOrderList && draftOrderList.length > 0) {
      draftOrderList.forEach(order => {
        if (order.number == orderId) {
          order.line_items.forEach(line_item => {
            if (line_item.id == variantId) {
              if (!!price) {
                // line_item.quantity = weighted_quantity;
                line_item.display_amount = '₨' + (Number(line_item.weighted_quantity) * Number(price));
                line_item.total = Number(line_item.weighted_quantity) * Number(price);
                line_item.display_total = '₨' + (Number(line_item.weighted_quantity) * Number(price));
                line_item.display_item_total = '₨' + (Number(line_item.weighted_quantity) * Number(price));
                line_item.discount = Number(line_item.price) - Number(price);
                line_item.price = price;
                // line_item.weighted_quantity = weighted_quantity;
              } else {
                line_item.quantity = weighted_quantity;
                line_item.display_amount = '₨' + (Number(weighted_quantity) * Number(line_item.price));
                line_item.total = Number(weighted_quantity) * Number(line_item.price);
                line_item.display_total = '₨' + (Number(weighted_quantity) * Number(line_item.price));
                line_item.display_item_total = '₨' + (Number(weighted_quantity) * Number(line_item.price));
                line_item.weighted_quantity = weighted_quantity;
              }
            }
          });
        }
        let total = 0;
        total += order.line_items.forEach(line_item => Number(line_item.total));

        if (order.delivery_mode === 'delivery') {
          order.fixed_delivery_charges = order.store.shop.fixed_delivery_charges || '0';
          order.ship_total = order.store.shop.fixed_delivery_charges || '0';
          order.outstanding_balance = Number(total) + Number(order.store.shop.fixed_delivery_charges);
        } else {
          order.fixed_delivery_charges = '0';
          order.ship_total = '0';
          order.outstanding_balance = total;
        }
      });

      let selectedOrder = draftOrderList.filter(order => order.number === orderId)[0];
      let selectedLineItem = selectedOrder.line_items.filter(line_item => line_item.id == variantId)[0];
      let final_total = 0;
      selectedOrder.line_items.forEach(line_item => {
        final_total += Number(line_item.total);
      });
      // update item_total and total price
      draftOrderList.forEach(order => {
        if (order.number == orderId) {
          order.item_total = final_total;
          order.total = final_total;
          order.display_item_total = '₨' + final_total;
          order.total_quantity = selectedOrder.line_items.length;
          order.display_total = '₨' + final_total;
          order.final_price = final_total;
        }
      });
      updateStoredDraftOrders(draftOrderList);
    }

    // Now calculate total of overall order
    let selectedOrder = draftOrderList.filter(order => order.number === orderId)[0];
    let selectedLineItem = selectedOrder.line_items.filter(line_item => line_item.id == variantId)[0];
    let final_total = 0;
    selectedOrder.line_items.forEach(line_item => {
      final_total += Number(line_item.total);
    });

    const updateQuantity = !!weighted_quantity ? weighted_quantity : selectedLineItem.weighted_quantity;
    const updatedPrice = !!price ? price : selectedLineItem.price;
    const isDelivery = selectedOrder.delivery_mode == 'delivery';
    console.log('check this', selectedLineItem.price, selectedLineItem.weighted_quantity, selectedLineItem.weighted_price);

    let lineItemResponse = {
      'id': variantId,
      'quantity': updateQuantity,
      'price': updatedPrice,
      'variant_id': variantId,
      'weighted_quantity': Number(updateQuantity),
      'weighted_price': selectedLineItem.weighted_price,
      'weighted_ratio': Number(updateQuantity),
      'is_weighted': false,
      'single_display_amount': '₨' + (Number(updateQuantity) * Number(updatedPrice)),
      'display_amount': '₨' + Number(updateQuantity) * Number(updatedPrice),
      'total': Number(updateQuantity) * Number(updatedPrice),
      'images': [
        {
          'id': 1482896,
          'attachment_file_size': 2265,
          'position': 1,
          'attachment_content_type': 'image/jpeg',
          'attachment_file_name': 'veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg',
          'alt': null,
          'attachment_height': 90,
          'attachment_width': 90,
          'mini_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/mini/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          'small_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/small/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          'product_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/product/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          'large_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/large/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          'squared_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/squared/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          'phone_detail_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/phone_detail/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          'phone_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/phone/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          'phone_large_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/phone_large/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          'product_medium_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/product_medium/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
          'product_small_url': 'https://howmuch-pk.s3.amazonaws.com/spree/products/1482896/product_small/veet_hair_removal_cream_lotus_milk___jasmine-237942.jpg?1552042075',
        },
      ],
      'variant': {
        'id': 474856,
        'sku': '6001106309497',
        'weight': '0.0',
        'height': null,
        'width': null,
        'depth': null,
        'is_master': false,
        'slug': null,
        'description': null,
        'upc': '6001106309497',
        'gtin': null,
        'product_id': 237942,
        'is_google_ad_friendly': false,
        'weighted_ratio': 1,
        'is_weighted': false,
        'name': 'Veet Hair Removal Cream Lotus Milk & Jasmine',
        'display_price': '₨80.00',
        'price': '80.0',
        'currency': 'PKR',
        'options_text': 'Weight: 25gm, Weight: 25.0 g',
        'is_destroyed': false,
        'option_values': [
          {
            'presentation_with_option_type': 'Weight: 25gm',
            'id': 544,
            'name': '25gm',
            'presentation': '25gm',
            'option_type_name': null,
            'option_type_id': 1,
            'option_type_presentation': 'Weight: 25gm',
          },
          {
            'presentation_with_option_type': 'Weight: 25.0 g',
            'id': 600,
            'name': '25.0 g',
            'presentation': '25.0 g',
            'option_type_name': null,
            'option_type_id': 1,
            'option_type_presentation': 'Weight: 25.0 g',
          },
        ],
        'images': [],
        'likes_count': 0,
        'likes': 0,
        'track_inventory': true,
        'in_stock': false,
        'is_backorderable': false,
        'total_on_hand': 100,
      },
      'adjustments': [],
      'display_total': '₨' + (Number(updateQuantity) * Number(updatedPrice)),
      'display_name': selectedLineItem.display_name,
      'order': {
        ...selectedOrder,
        'number': orderId,
        'item_total': final_total,
        'total': final_total,
        'outstanding_balance': isDelivery ? Number(final_total) + Number(selectedOrder.store.shop.fixed_delivery_charges) : final_total,
        'fixed_delivery_charges': isDelivery ? (selectedOrder.store.shop.fixed_delivery_charges || '0') : '0',
        'ship_total': isDelivery ? (selectedOrder.store.shop.fixed_delivery_charges || '0') : '0',
        'display_item_total': '₨' + final_total,
        'total_quantity': selectedOrder.line_items.length,
        'final_price': final_total,
      },
    };
    resolve(lineItemResponse);
  }));
};

// remove line item
// /shop_admin/orders/:order_id/line_items/:id.json
export const removeLineItem = data => {
  return new Promise(((resolve, reject) => {
    const {orderId, variantId} = data;

    let draftOrderList = getStoredDraftOrders();
    let selectedOrder = draftOrderList.filter(order => order.number === orderId)[0];
    let deletedLineItem = selectedOrder.line_items.filter(line_item => line_item.id == variantId)[0];
    if (!!draftOrderList && draftOrderList.length > 0) {
      draftOrderList.forEach(order => {
        if (order.number == orderId) {
          order['line_items'] = order.line_items.filter(line_item => line_item.id != variantId);
        }
      });
      updateStoredDraftOrders(draftOrderList);
    }

    // Now calculate total of overall order
    let final_total = 0;
    selectedOrder.line_items.forEach(line_item => {
      final_total += Number(line_item.total);
    });
    // console.log("check this", deletedLineItem)
    const isDelivery = selectedOrder.delivery_mode == 'delivery';
    let deleteLineItemResponse = {
      ...deletedLineItem,
      'id': variantId,
      'quantity': 1,
      'price': 0,
      'weighted_price': deletedLineItem.weighted_price,
      'single_display_amount': deletedLineItem.single_display_amount,
      'display_amount': deletedLineItem.display_amount,
      'total': deletedLineItem.total,
      'images': [],
      'variant': {
        'id': variantId,
        'sku': 'khawaja-super-store-38900591519',
        'weight': '0.0',
        'height': null,
        'width': null,
        'depth': null,
        'is_master': false,
        'slug': null,
        'description': null,
        'upc': '038900591519',
        'gtin': null,
        'is_google_ad_friendly': false,
        'weighted_ratio': 1,
        'is_weighted': false,
        'name': 'Fruitamins Fruit cocktail',
        'display_price': '₨125.00',
        'price': '125.0',
        'currency': 'PKR',
        'options_text': 'Weight: 234gm, Weight: 234.0 g, and Weight: 234 Gm',
        'is_destroyed': false,
        'option_values': [
          {
            'presentation_with_option_type': 'Weight: 234gm',
            'id': 2645,
            'name': '234gm',
            'presentation': '234gm',
            'option_type_name': null,
            'option_type_id': 1,
            'option_type_presentation': 'Weight: 234gm',
          },
          {
            'presentation_with_option_type': 'Weight: 234.0 g',
            'id': 2750,
            'name': '234.0 g',
            'presentation': '234.0 g',
            'option_type_name': null,
            'option_type_id': 1,
            'option_type_presentation': 'Weight: 234.0 g',
          },
          {
            'presentation_with_option_type': 'Weight: 234 Gm',
            'id': 4630,
            'name': '234 Gm',
            'presentation': '234 Gm',
            'option_type_name': null,
            'option_type_id': 1,
            'option_type_presentation': 'Weight: 234 Gm',
          },
        ],
        'images': [],
        'likes_count': 0,
        'likes': 0,
        'track_inventory': true,
        'in_stock': false,
        'is_backorderable': false,
        'total_on_hand': -1,
      },
      'adjustments': [],
      'order': {
        ...selectedOrder,
        'item_total': final_total,
        'total': final_total,
        'outstanding_balance': isDelivery ? Number(final_total) + Number(selectedOrder.store.shop.fixed_delivery_charges) : final_total,
        'fixed_delivery_charges': isDelivery ? (selectedOrder.store.shop.fixed_delivery_charges || '0') : '0',
        'ship_total': isDelivery ? (selectedOrder.store.shop.fixed_delivery_charges || '0') : '0',
        'display_item_total': '₨' + final_total,
        'total_quantity': selectedOrder.line_items.length,
        'display_total': '₨' + final_total,
        'display_ship_total': '₨' + final_total,
        'display_tax_total': '₨' + final_total,
        'final_price': final_total,
      },
    };

    resolve(deleteLineItemResponse);
  }));
};

// autocomplete search products   TODO LATER
//variants/autocomplete_line_item.json

// shop orders
// /api/v2/shops/shop_orders.json
export const getShopOrders = () => {
  return new Promise(((resolve, reject) => {
    let shopOrder = {
      draft_orders: [],
      in_progress_orders: [],
      incoming_orders: [],
    };
    try {
      let allOrders = getStoredDraftOrders();
      let shopOrders = AsyncStorage.getItem('shopOrders');
      if (!!allOrders || !!shopOrders) {
        shopOrders = !!JSON.parse(shopOrders) ? JSON.parse(shopOrders) : shopOrder;
        let draftOrders = allOrders.filter(order => order.orderStatus === 'draft');
        shopOrder['draft_orders'] = [...draftOrders];
        shopOrder['in_progress_orders'] = [];
        shopOrder['incoming_orders'] = [];
        resolve(shopOrder);
      } else {
        resolve(shopOrder);
      }
    } catch (e) {
      resolve({
        errors: [
          'No Shop Order found',
        ],
      });
    }
  }));
};

// draft orders
// /api/v2/shops/draft_orders.json
export const getDraftOrders = data => {
  const {shopId} = data;
  return new Promise((resolve, reject) => {
    try {
      let allOrders = getStoredDraftOrders();
      allOrders = !!allOrders ? allOrders : [];
      let draftOrders = allOrders.filter(order => order.orderStatus === 'draft');
      draftOrders = draftOrders.filter(shop => shop.store.shop.slug === shopId);

      const response = {
        count: draftOrders.length,
        current_page: 1,
        orders: draftOrders,
        pages: 1,
        per_page: 0,
        total_count: draftOrders.length,
      };
      resolve(response);
    } catch (e) {
      console.log('----- error during fetch order form LS ---', e);
      resolve({
        errors: [
          'No Shop Order found',
        ],
      });
    }
  });
};

// new orders
// /shop_admin/orders/new_order_pos.json
export const newOrder = data => {
  return new Promise(((resolve, reject) => {
    const {shopId} = data;
    try {
      let shopList = isReactNative() ? JSON.parse(AsyncStorage.getItem('shops')): JSON.parse(localStorage.getItem('shops'))
      let selectedShop = shopList.filter(shop => shop.slug === shopId)[0];
      let draftOrders = !!getStoredDraftOrders() ? getStoredDraftOrders() : [];
      let user = isReactNative() ? JSON.parse(AsyncStorage.getItem('user')): JSON.parse(localStorage.getItem('user'));

      let newId = 0;
      if (draftOrders.length > 0) {
        newId = Math.max.apply(Math, draftOrders.map(function (item) {
          return item.id;
        }));
      } else {
        newId = Math.floor(100000 + Math.random() * 900000);
      }

      let newOrderResponse = {
        id: newId + 1,
        number: 'OO' + user.id + '' + Number(newId + 1),
        orderStatus: 'draft',
        item_total: '0.0',
        total: '0.0',
        ship_total: '0.0',
        state: 'cart',
        adjustment_total: '0.0',
        user_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completed_at: null,
        payment_total: '0.0',
        shipment_state: 'pending',
        payment_state: null,
        email: user.email,
        special_instructions: null,
        channel: 'pos',
        included_tax_total: '0.0',
        additional_tax_total: '0.0',
        display_included_tax_total: null,
        display_additional_tax_total: null,
        tax_total: null,
        currency: 'PKR',
        considered_risky: false,
        canceler_id: null,
        delivery_option: false,
        pay_offline: true,
        delivery_mode: 'pickup',
        approved_at: null,
        customer_id: null,
        display_item_total: '₨0.00',
        total_quantity: 0,
        display_total: '₨0.00',
        display_ship_total: '₨0.00',
        display_tax_total: '₨0.00',
        display_adjustment_total: '₨0.00',
        token: user.access_token,
        checkout_steps: ['complete', 'ready'],
        shipment_total: '0.0',
        outstanding_balance: '0.0',
        state_lock_version: 0,
        customer_name: null,
        customer_phone: null,
        customer_email: null,
        customer: null,
        shop: selectedShop,
        store: {
          type: null,
          name: selectedShop.name,
          code: selectedShop.name,
          default_currency: 'PKR',
          shop: selectedShop,
        },
        user: null,
        feedback: false,
        final_price: '0.0',
        bill_address: null,
        ship_address: null,
        is_required_geo_coordinates_invalid_only: null,
        line_items: [],
        payments: [],
        payment_methods: selectedShop.payment_methods,
        shipments: [],
        adjustments: [],
        display_order_total: '₨0.00',
        display_discount: '₨0.00',
        permissions: {'can_update': true},
        credit_cards: [],
        missing_variants: [],
      };

      if (!!getStoredDraftOrders()) {
        let localDraftOrder = getStoredDraftOrders();
        updateStoredDraftOrders([...localDraftOrder, newOrderResponse])
      } else {
        updateStoredDraftOrders([newOrderResponse])
      }
      resolve(newOrderResponse);
    } catch (e) {
      resolve({
        errors: [
          'Please try again later',
        ],
      });
    }
  }));
};

// accept order
// /shop_admin/orders/:id/accept.json
export const acceptOrder = data => {
  return new Promise(((resolve, reject) => {
    const {id} = data;
    let draftOrders = getStoredDraftOrders()
    if (!!draftOrders) {
      draftOrders.forEach(order => {
        if (order.number === id) {
          if (order.line_items.length < 1) {
            resolve({
              errors: [
                'here are no items for this order. Please add an item to the order to continue.',
              ],
              status: false,
            });
            return;
          }
          order.orderStatus = 'inProgress';
        }
      });

      const selectedOrder = draftOrders.filter(order => order.number === id);
      updateStoredDraftOrders(draftOrders)
      if (selectedOrder.length > 0) {
        resolve({});
      } else {
        resolve({
          errors: [
            'it is not offline order',
          ],
        });
      }
    } else {
      resolve({
        errors: [
          'it is not offline order',
        ],
      });
    }
  }));
};

// reject order
// /shop_admin/orders/:id/reject.json
export const rejectOrder = data => {
  const orderId = req.params.id;
  const reason = req.body.reason;
  return new Promise(((resolve, reject) => {
    if (!!getStoredDraftOrders()) {
      let draftOrders = getStoredDraftOrders()
      draftOrders.forEach(order => {
        if (order.number == orderId) {
          order.orderStatus = 'rejected';
          order.reason = !!reason ? reason : '';
        }
      });
      updateStoredDraftOrders(draftOrders)
      resolve({});
    }
  }));
};

// /shop_admin/orders/:id/deliver.json
export const deliverOrder = data => {
  const {id} = data;
  return new Promise(((resolve, reject) => {
    let draftOrders = getStoredDraftOrders()
    if (!!draftOrders) {
      draftOrders.forEach(order => {
        if (order.number === id) {
          if (order.payments.length < 1) {
            resolve({
              errors: [
                `Order ${order.number} is unpaid`,
              ],
            });
          } else {
            order.orderStatus = 'complete';
          }
        }
      });
      updateStoredDraftOrders(draftOrders)
      const selectedOrder = draftOrders.filter(order => order.number === id);
      if (selectedOrder.length > 0) {
        resolve({
          status: true,
          tax_invoice_number: Math.random() * 10000,
        });
      } else {
        resolve({
          errors: [
            'it is not offline order',
          ],
        });
      }
    }
  }));
};

// change delivery mode
// /shop_admin/orders/:id/change_delivery_mode.json
export const changeDeliveryMode = data => {
  const {orderId, delivery_mode} = data;
  return new Promise(((resolve, reject) => {
    if (!!AsyncStorage.getItem('draftOrders')) {
      let draftOrders = getStoredDraftOrders()
      draftOrders.forEach(order => {
        if (order.number == orderId) {
          order.delivery_mode = delivery_mode;
          if (delivery_mode === 'delivery') {
            order.fixed_delivery_charges = order.store.shop.fixed_delivery_charges || '0';
            order.ship_total = order.store.shop.fixed_delivery_charges || '0';
            order.outstanding_balance = Number(order.item_total) + Number(order.store.shop.fixed_delivery_charges);
          } else {
            order.fixed_delivery_charges = '0';
            order.ship_total = '0';
            order.outstanding_balance = order.item_total;
          }
        }
      });
      updateStoredDraftOrders(draftOrders)
      const selectedOrder = draftOrders.filter(order => order.number == orderId)[0];
      resolve(selectedOrder);
    } else {
      resolve({
        errors: [
          'it is not offline order',
        ],
      });
    }
  }));
};

// update customer
// /shop_admin/orders/:id/update_customer.json
export const updateCustomer = data => {
  const {id, customer: {name, email, phone}} = data;
  return new Promise(((resolve, reject) => {
    let draftOrders = getStoredDraftOrders()
    if (!!draftOrders) {

      const customerResponse = {
        'id': 967,
        'phone': phone,
        'email': email,
        'deleted_at': null,
        'store_id': 37,
        'user_id': null,
        'first_name': name.split('')[0],
        'last_name': name.split('')[1],
        'cached_outstanding_balance': '0.0',
        'display_name': name,
      };


      draftOrders && draftOrders.forEach(order => {
        if (order.number === id) {
          order.customer = customerResponse;
          order.customer_email = email;
          order.customer_phone = phone;
          order.customer_name = name;
          // TODO LATER INSERT CUSTOMER IN INDEXED DB
          // insertCustomer(order.shop.store_id, order.shop.slug, req.body.customer).then(response => {
          //   order.customer = customerResponse;
          //   order.customer_email = email;
          //   order.customer_phone = phone;
          //   order.customer_name = name;
          // });
        }
      });
      updateStoredDraftOrders(draftOrders)

      const selectedOrder = draftOrders.filter(order => order.number === id);
      if (selectedOrder.length > 0) {
        resolve(customerResponse);
      } else {
        resolve({
          errors: [
            'it is not offline order',
          ],
        });
      }
    } else {
      resolve({
        errors: [
          'it is not offline order',
        ],
      });
    }
  }));
};

// update address
// /shop_admin/orders/:id/update_address.json
export const updateAddress = data => {
  const {id, address1, address2, country_id, state_id, city} = data;
  return new Promise(((resolve, reject) => {
    const states = [
      {
        id: 2516, name: 'Azad Kashmir', abbr: 'JK', country_id: 178,
      }, {
        id: 2513, name: 'Balochistan', abbr: 'BA', country_id: 178,
      }, {
        id: 6296, name: 'Federally Administered Tribal Areas', abbr: 'TA', country_id: 178,
      }, {
        id: 2514, name: 'Gilgit-Baltistan', abbr: 'GB', country_id: 178,
      }, {
        id: 2515, name: 'Islamabad', abbr: 'IS', country_id: 178,
      }, {
        id: 2517, name: 'Khyber Pakhtunkhwa', abbr: 'KP', country_id: 178,
      }, {
        id: 2518, name: 'Punjab', abbr: 'PB', country_id: 178,
      }, {
        id: 6295, name: 'Sindh', abbr: 'SD', country_id: 178,
      }];
    let draftOrders = getStoredDraftOrders()
    if (!!draftOrders) {
      !!draftOrders && draftOrders.forEach(order => {
        if (order.number === id) {
          let selectedState = states.filter(state => state.id === state_id);
          order.ship_address = {
            'id': Math.random(),
            'firstname': !!order.customer_name ? order.customer_name.split('')[0] : '',
            'lastname': !!order.customer_name ? order.customer_name.split('')[-1] : '',
            'address1': address1,
            'address2': address2,
            'city': city,
            'zipcode': null,
            'phone': order.customer_phone,
            'state_name': null,
            'alternative_phone': null,
            'company': null,
            'state_id': state_id,
            'country_id': country_id,
            'latitude': 24.8269877,
            'longitude': 67.02509599999999,
            'owner_type': null,
            'owner_id': null,
            'deleted_at': null,
            'state': {
              'id': state_id,
              'name': selectedState.length > 0 ? selectedState[0].name : 'state',
            },
            'country': {
              'country_id': country_id,
              'name': 'Pakistan',
            },
            'is_required_geo_coordinates_invalid_only': null,
          };
        }
      });

      updateStoredDraftOrders(draftOrders)
      const selectedOrder = draftOrders.filter(order => order.number === id);
      if (selectedOrder.length > 0) {
        resolve(selectedOrder[0]);
      } else {
        resolve({
          errors: [
            'it is not offline order',
          ],
        });
      }
    } else {
      resolve({
        errors: [
          'it is not offline order',
        ],
      });
    }
  }));
};

// apply adjustment
// /shop_admin/orders/:order_id/apply_adjustment.json
export const applyAdjustment = data => {
  const {orderId, adjustedTotal} = data;
  return new Promise(((resolve, reject) => {
    let draftOrders = getStoredDraftOrders()
    if (!!draftOrders) {
      draftOrders.forEach(order => {
        if (order.number === orderId) {
          order.adjustment_total = String(Number(adjustedTotal) - Number(order.item_total));
          order.final_price = String(adjustedTotal);
          order.display_total = 'Rs' + adjustedTotal;
          order.display_order_total = 'Rs' + adjustedTotal;
          order.display_adjustment_total = '-Rs' + (Number(order.item_total) - Number(adjustedTotal));
          order.outstanding_balance = String(adjustedTotal);
          order.total = String(adjustedTotal);
        }
      });

      updateStoredDraftOrders(draftOrders)
    }

    const selectedOrder = draftOrders.filter(order => order.number === orderId)[0];
    resolve(selectedOrder);
  }));
};

// apply Delivery
///shop_admin/orders/:order_id/apply_delivery.json
export const applyDelivery = data => {
  const {order_id, adjusted_delivery_charges} = data;
  return new Promise(((resolve, reject) => {
    let draftOrders = getStoredDraftOrders()
    draftOrders.length > 0 && draftOrders.forEach(order => {
      if (order.number === order_id) {
        if (order.delivery_mode === 'delivery') {
          order.fixed_delivery_charges = order.store.shop.fixed_delivery_charges || '0';
          order.ship_total = order.store.shop.fixed_delivery_charges || '0';
          order.outstanding_balance = Number(order.item_total) + Number(order.store.shop.fixed_delivery_charges);
        } else {
          order.fixed_delivery_charges = '0';
          order.ship_total = '0';
          order.outstanding_balance = order.item_total;
        }
      }
    });
    updateStoredDraftOrders(draftOrders)
    const selectedOrder = draftOrders.filter(order => order.number === order_id);
    if (selectedOrder.length > 0) {
      resolve(selectedOrder[0]);
    } else {
      resolve({
        error: [
          'No offline order found',
        ],
      });
    }
  }));
};

// paymemt
// /shop_admin/shops/:shop_id/orders/:order_id/payments.json
export const payments = data => {
  return new Promise(((resolve, reject) => {
    const {shop_id, order_id, payment} = data;
    const {
      amount = '',
      payment_method_id = '',
      reference_number = '',
      reference_name = '',
      notes = '',
      payment_date = '',
      card_type = '',
      allow_partial_payment = '',
      cash_drawer_title = '',

      bank_address = '',
      bank_name = '',
    } = payment;

    let draftOrders = getStoredDraftOrders()
    if (draftOrders.length > 0) {
      draftOrders.forEach(order => {
        if (order.number === order_id) {
          order.status = 'complete';
          order.payment_state = 'paid';
          order.payment_total = order.final_price;
          if (allow_partial_payment === 1) {
            order.outstanding_balance = Number(amount) > Number(order.final_price) ?
                '0.0' :
                Number(order.final_price) - Number(amount);
          } else {
            order.outstanding_balance = Number(amount) > Number(order.final_price) ?
                '0.0' :
                Number(amount) - Number(order.final_price);
          }
          order.payments = !!order.payments ? order.payments.concat({
            ...payment,
            amount: Number(amount),
            'payment_state': 0,
            'state': 'completed',
          }) : [{
            ...payment,
            amount: Number(amount),
            'payment_state': 0,
            'state': 'completed',
          }];
        }
      });

      updateStoredDraftOrders(draftOrders)

      let selectedOrder = draftOrders.filter(order => order.number === order_id);
      if (selectedOrder.length > 0) {
        resolve({
          status: true,
          message: 'payment successfully',
        });
      } else {
        resolve({
          errors: [
            'No offline order found',
          ],
        });
      }

    } else {
      resolve({
        errors: [
          'it is not offline order',
        ],
      });
    }
  }));
};

// full.json
export const fullOrder = data => {
  return new Promise(((resolve, reject) => {
    const {orderId} = data;
    let draftOrder = getStoredDraftOrders()
    let inProgressOrders = isReactNative()? AsyncStorage.getItem('inProgressOrders'): localStorage.getItem('inProgressOrders')
    if (!!draftOrder) {
      inProgressOrders = !!JSON.parse(inProgressOrders) ? JSON.parse(inProgressOrders) : [];
      const selectedDraftOrder = draftOrder.filter(order => order.number === orderId);
      const selectedInProgressOrder = inProgressOrders.filter(order => order.number === orderId);
      if (selectedDraftOrder.length > 0) {
        let paid_payment = 0;
        selectedDraftOrder[0].payments.forEach(payment => {
          paid_payment += !!payment.amount ? Number(payment.amount) : 0;
        });
        resolve({
          ...selectedDraftOrder[0],
          payment_total: paid_payment,
        });
      } else if (selectedInProgressOrder.length > 0) {
        resolve(selectedInProgressOrder[0]);
      } else {
        reject({
          errors: [
            'This is not a offline order',
          ],
        });
      }
    }
  }));
};

// shops.json
export const getShops = () => {
  return new Promise(((resolve, reject) => {
    let shopList = [];
    try {
      shopList = isReactNative() ? JSON.parse(AsyncStorage.getItem('shops')): JSON.parse(localStorage.getItem('shops'));
      if (!!shopList) {
        const shopsResponse = {
          count: shopList.length,
          current_page: 1,
          pages: 1,
          shops: shopList,
          per_page: 0,
          total_count: shopList.length,
        };

        resolve(shopsResponse);
      }
    } catch (e) {
      reject({
        errors: [
          'No Shop Found',
        ],
      });
    }
  }));
};

// synced_customer // TODO LATER
// get_shop_customers
// :shop_id/customers.json

