import React from 'react';
import OrderHeader from '../OrderHeader';
import {Body, Button, Icon, Left, ListItem, Right, Switch, Text, View, Container} from 'native-base';
import styles from './styles';
import OrderActions from '../OrderActions';
import OrderCart from '../OrderCart';
import {Colors} from '../../utils/colors';
import CustomerInfoComponent from '../CustomerInfo';
import DeliveryAddress from '../DeliveryAddress';
import PaymentComponent from '../Payments';
import ParentOrderComponent from '../../howmuch-pos-core/hoc/ParentOrderComponent';
import Timer from '../Timer';
import {NetPrinter} from 'react-native-thermal-receipt-printer';
import {Platform} from 'react-native';
import {fullOrder, changeDeliveryMode, getShopCustomer} from '../../howmuch-pos-core/utils/controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditableModal from '../EditableModal';
import {calculateGST, calculateLineItemGST} from "../../utils/helper"
import OrdersResource from '../../howmuch-pos-core/resources/Orders';
import ShopOrderResource from '../../howmuch-pos-core/resources/ShopOrder';

class OrderComponent extends ParentOrderComponent {
  constructor(props) {
    super(props);
    this.Rails = !!props.Rails ? props.Rails : {host: 'https://www.howmuch.pk'};
    this.ShopOrder = ShopOrderResource.get(this.Rails);
    this.state = {
      ...this.state,
      isDelivery: false,
      currentPrinter: {},
      showModal: false,
      customers: []
    };
  }

  async componentDidMount() {
    super.componentDidMount();
    const {order} = this.props;
    if (order.delivery_mode){
      this.setState({
        isDelivery: true,
      })
    }
    const shopCustomers = await getShopCustomer(order.shop.slug);
    if (shopCustomers){
      this.setState({
        customers: shopCustomers
      })
    }
  }

  onChangeDeliveryHandler = value => {
    this.setState({
      isDelivery: value,
    });
    const {order} = this.props;
    changeDeliveryMode({orderId: order.number, delivery_mode: value ? "delivery": "pickup" })
        .then(updatedOrder => {
          this.props.updateOrder(updatedOrder);
        })
  };

  onPrintHandler = async (orderNumber) => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    let ipAdddress = await AsyncStorage.getItem('ipAddress');
    let port = await AsyncStorage.getItem('portNumber');

    console.log(ipAdddress, ': ', port);


    if (!ipAdddress || !port) {
      alert('please enter wifi setting');
      return;
    }

    fullOrder({orderId: orderNumber})
        .then(order => {
          if (Platform.OS !== 'android') {
            NetPrinter.init().then(() => {
              console.log('printer init successfully');
            });
            NetPrinter.connectPrinter(ipAdddress, Number(port)).then(
                (printer) => {
                  try {
                    if (printer) {
                      // store name
                      let printReceipt = '<C>' + order.shop.name + '\n';
                      // address
                      if (order.new_address) {
                        printReceipt += order.new_address.address1 + ' ' + order.new_address.address2 + '\n';
                      }
                      printReceipt += 'Transaction No:' + order.number + '\n';
                      // print date
                      printReceipt += 'Date: ' + new Date().toISOString() + '\n';
                      if (userInfo) {
                        userInfo = JSON.parse(userInfo);
                        // staff name
                        printReceipt += 'Staff Name: ' + userInfo.first_name + ' ' + userInfo.last_name + '\n\n';
                      }

                      if (order.customer) {
                        printReceipt += '-----------------------------------------------\n';
                        printReceipt += 'Customer Name: ' + order.customer.display_name + '\n';
                        printReceipt += 'Phone No: ' + order.customer.phone + '\n';
                        printReceipt += 'Customer email : ' + order.customer.email + '\n\n';
                      }

                      // line item header
                      printReceipt += '-----------------------------------------------\n';
                      printReceipt += 'S#  Description      Qty  Price Sav  Amount\n';
                      printReceipt += '-----------------------------------------------\n';

                      // serial no string space must be 3
                      // description string space must be 16
                      // quantity string must be 4
                      // price string must be 5
                      // Sav amount string must be 4
                      // Amount string must be 6

                      const serialNoSpace = 4;
                      const descriptionSpace = 17;
                      const qtySpace = 5;
                      const priceSpace = 6;
                      const savAmtSpace = 5;
                      const amountSpace = 7;
                      if (order.line_items.length > 0) {
                        order.line_items.forEach((lineItem, index) => {
                          const line_item_index = String(index + 1).length < serialNoSpace
                              ? String(index + 1) + Array(Number(serialNoSpace - String(index + 1).length)).fill(' ').join('')
                              : String(index + 1).substring(0, serialNoSpace - 1);

                          const line_item_name = String(lineItem.display_name).length < descriptionSpace
                              ? String(lineItem.display_name) + Array(Number(descriptionSpace - String(lineItem.display_name).length)).fill(' ').join('')
                              : String(lineItem.display_name).substring(0, descriptionSpace - 1) + ' ';

                          const line_item_qty = String(lineItem.weighted_quantity).length < qtySpace
                              ? String(lineItem.weighted_quantity) + Array(Number(qtySpace - String(lineItem.weighted_quantity).length)).fill(' ').join('')
                              : String(lineItem.weighted_quantity).substring(0, qtySpace - 1);

                          const line_item_price = String(lineItem.price).length < priceSpace
                              ? String(lineItem.price) + Array(Number(priceSpace - String(lineItem.price).length)).fill(' ').join('')
                              : String(lineItem.price).substring(0, priceSpace - 1);

                          const line_item_save = '0' + Array(Number(savAmtSpace - 1)).fill(' ').join('');

                          const line_item_total = String(lineItem.total).length < amountSpace
                              ? String(lineItem.total) + Array(Number(amountSpace - String(lineItem.total).length)).fill(' ').join('')
                              : String(lineItem.total).substring(0, amountSpace - 1);

                          printReceipt += line_item_index + line_item_name + line_item_qty + line_item_price + line_item_save + line_item_total + '\n';
                        });
                        printReceipt += '-----------------------------------------------\n';
                      }

                      const orderCartTotalSpace = 6;
                      const rowSpace = 30;
                      // item total
                      const totalItems = String(order.line_items.length).length < 10
                          ? Array(orderCartTotalSpace - String(0).length).fill(' ').join('') + String(order.line_items.length)
                          : String(order.line_items.length).substring(0, orderCartTotalSpace - 1);
                      const totalItemRow = 'Total Items: ' + totalItems;
                      printReceipt += Array(rowSpace + 14 - totalItemRow.length).fill(' ').join('') + totalItemRow + '\n';

                      //You Saved
                      const youSaved = String(0).length < 10
                          ? Array(orderCartTotalSpace - String(0).length).fill(' ').join('') + '0'
                          : String(order.line_items.length).substring(0, orderCartTotalSpace - 1);
                      const youSavedRow = 'You Saved: ' + youSaved;
                      printReceipt += Array(rowSpace + 14 - youSavedRow.length).fill(' ').join('') + youSavedRow + '\n';

                      //Discount and Adjustment
                      const discount = String(order.adjustment_total).length < 10
                          ? Array(orderCartTotalSpace - String(order.adjustment_total).length).fill(' ').join('') + order.adjustment_total
                          : String(order.adjustment_total).substring(0, orderCartTotalSpace - 1);
                      const discountRow = 'Discount/Adjustment: ' + discount;
                      printReceipt += Array(rowSpace + 14 - discountRow.length).fill(' ').join('') + discountRow + '\n';

                      // sub total
                      const subTotal = String(order.item_total).length < 10
                          ? Array(orderCartTotalSpace - String(order.item_total).length).fill(' ').join('') + order.item_total
                          : String(order.item_total).substring(0, orderCartTotalSpace - 1);
                      const subTotalRow = 'Sub Total: ' + subTotal;
                      printReceipt += Array(rowSpace + 14 - subTotalRow.length).fill(' ').join('') + subTotalRow + '\n';

                      // Total
                      const total = String(order.final_price).length < 10
                          ? Array(orderCartTotalSpace - String(order.final_price).length).fill(' ').join('') + order.final_price
                          : String(order.final_price).substring(0, orderCartTotalSpace - 1);
                      const totalRow = '    Total: ' + total;
                      printReceipt += Array(rowSpace + 14 - subTotalRow.length).fill(' ').join('') + totalRow + '\n';

                      let cashReceivedValue = '0';
                      let cashReturnValue = '0';
                      if (order.recieved) {
                        cashReceivedValue = String(order.recieved);
                      }
                      if (order.return) {
                        cashReturnValue = String(order.return);
                      }

                      // cash Received
                      const cashReceived = cashReceivedValue.length < 10
                          ? Array(orderCartTotalSpace - cashReceivedValue.length).fill(' ').join('') + cashReceivedValue
                          : cashReceivedValue.substring(0, orderCartTotalSpace - 1);
                      const cashReceivedRow = 'Cash Received: ' + cashReceived;
                      printReceipt += Array(rowSpace + 14 - cashReceivedRow.length).fill(' ').join('') + cashReceivedRow + '\n';

                      // cash Return
                      const cashReturn = cashReturnValue.length < 10
                          ? Array(orderCartTotalSpace - cashReturnValue.length).fill(' ').join('') + cashReturnValue
                          : cashReturnValue.substring(0, orderCartTotalSpace - 1);
                      const cashReturnRow = 'Cash Return: ' + cashReturn;
                      printReceipt += Array(rowSpace + 14 - cashReturnRow.length).fill(' ').join('') + cashReturnRow + '\n';

                      printReceipt += '-----------------------------------------------\n';

                      // footer
                      printReceipt += '\n\nAll prices are inclusive of taxes \n\n';
                      if (order.shop) {
                        printReceipt += 'Feedback: ' + order.shop.email + '\n';
                        printReceipt += order.shop.facebook_url && order.shop.facebook_url + '\n';
                        printReceipt += 'For POS Installation, Please contact \n' + order.shop.phone_number + '\n';
                      }
                      printReceipt += '</C>';
                      NetPrinter.printBill(printReceipt);
                    }
                  } catch (e) {
                    console.log('error:', e);
                  }
                },
                error => {
                  console.log(error);
                });
          }
        });

  };

  onOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  calculateOrderGrandTotal = order => {
    const grandTotal = calculateLineItemGST(order.itemTotal(), order.store.shop) + Number(order.fixed_delivery_charges) -parseFloat(order.adjustment_total)+(calculateGST(order.itemTotal(), order.store.shop));
    return grandTotal;
  };

  addNewCustomer = (customer) => {
    this.setState(preState => ({
      customers: preState.customers.concat(customer)
    }))
  };

  render() {
    const {isInprogressOrder = false} = this.props;
    const {isDelivery, showModal} = this.state;

    const order = new this.ShopOrder(this.props.order);

    const present_time = new Date();
    const created_time = new Date(order.created_at);
    const value = (present_time - created_time) / 1000;
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - hours * 3600) / 60);

    return (
        <>
          <OrderHeader
              orderNumber={order.number}
              storeName={order.store.name}
              storeAddress={order.shop.address}
          />
          <View style={styles.timer}>
            <Icon name="calendar" type="MaterialCommunityIcons" style={styles.icon}/>
            <Text style={styles.textColor}>{order.created_at}</Text>
          </View>

          <View style={styles.row}>
            <Left style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="clock-outline" type="MaterialCommunityIcons" style={styles.timerIcon}/>
              <Timer value={value}/>
            </Left>
            <Right>
              <OrderActions
                  {...this.props}
                  isInprogressOrder={isInprogressOrder}
                  onlineAcceptOrder={this.acceptOrder}
                  onlineRejectOrder={this.rejectOrder}
                  onlineDeliverOrder={this.deliverOrder}
                  printOrderHandler={() => this.onPrintHandler(order.number)}
              />
            </Right>
          </View>

          <OrderCart
              {...this.props}
              addRNLineItems={this.addRNLineItems}
          />
          <View style={styles.orderCalculation}>
            <View style={styles.row}>
              <Left>
                <Text style={styles.textColor}>Item Total:</Text>
              </Left>
              <Right>
                <Text style={styles.textColor}>{order.item_total}</Text>
              </Right>
            </View>

            <View style={styles.row}>
              <Left>
                <Text style={styles.textColor}>Adjustment/Discount:</Text>
              </Left>
              <Right>
                <Button onPress={() => this.onOpenModal()} transparent>
                  <Text style={styles.textColor}>{order.adjustment_total}</Text>
                </Button>
              </Right>
            </View>

            <View style={styles.row}>
              <Left>
                <Text style={styles.textColor}>Item Discount:</Text>
              </Left>
              <Right>
                <Text style={styles.textColor}>0</Text>
              </Right>
            </View>

            <View style={styles.row}>
              <Left>
                <Text style={styles.textColor}>Delivery Charges:</Text>
              </Left>
              <Right>
                <Text style={styles.textColor}>{order.fixed_delivery_charges}</Text>
              </Right>
            </View>

            <View style={styles.row}>
              <Left>
                <Text style={styles.textColor}>Grand Total:</Text>
              </Left>
              <Right>
                <Text style={styles.textColor}>{this.calculateOrderGrandTotal(order)}</Text>
              </Right>
            </View>
          </View>
          <ListItem icon style={styles.deliveryListItem}>
            <Left>
              <Button style={{backgroundColor: Colors.primary}}>
                <Icon active name="delivery-dining" type="MaterialIcons"/>
              </Button>
            </Left>
            <Body style={{borderBottomColor: Colors.white}}>
              <Text>Delivery</Text>
            </Body>
            <Right style={{borderBottomColor: Colors.white}}>
              <Switch value={isDelivery} onChange={e => this.onChangeDeliveryHandler(!isDelivery)}/>
            </Right>
          </ListItem>
          {isDelivery &&
          <>
            <CustomerInfoComponent
                {...this.props}
                customers={this.state.customers}
                updateCustomerList={this.addNewCustomer}
            />
            <DeliveryAddress {...this.props}/>
          </>
          }
          <PaymentComponent {...this.props}/>

          <EditableModal
              isOpen={showModal}
              order={order}
              handlerCloseModal={() => this.onCloseModal()}
              isFullOrderDiscount={true}
              updateGrandTotal={this.updateGrandTotal}
          />
        </>
    );
  }
}

export default OrderComponent;
