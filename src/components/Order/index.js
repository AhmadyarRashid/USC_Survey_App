import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {
  Container,
  Body,
  Tab,
  Tabs,
  ScrollableTab,
  Spinner,
  Content,
} from 'native-base';
import styles from './styles';
import Order from './order';
import ParentNewOrderComponent from '../../howmuch-pos-core/hoc/ParentNewOrderComponent';
import OrderHeaderComponent from '../../screens/Orders/header';
import NoDataFound from '../NoDataFound';
import {Colors} from '../../utils/colors';

class NewOrderComponent extends ParentNewOrderComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }

  componentDidMount() {
    super.componentDidMount();
  }

  render() {
    const {combined_orders, selectedOrder, loadingOrders} = this.state;
    const renderOrderTabs = (
        <Content>
          <Tabs
              tabBarUnderlineStyle={{ backgroundColor: Colors.primary}}
              onChangeTab={({i}) => this.displayOrder(combined_orders[i], i)}
              renderTabBar={() => <ScrollableTab/>}
          >
            {combined_orders.map((order, index) =>
                <Tab
                    activeTextStyle={{color: Colors.primary}}
                    key={order.id}
                    heading={order.number}
                />,
            )}
          </Tabs>
        </Content>
    );

    let newProps = {
      ...this.props,
      ...this,
    };
    return (
        <Container style={styles.root}>
          <OrderHeaderComponent title="New Order" newOrderHandler={this.handleSingleShop} {...this.props}/>
          {loadingOrders && <Body><Spinner color='green'/></Body>}
          {(!loadingOrders && combined_orders.length < 1) && <NoDataFound/>}
          <ScrollView>
            {combined_orders.length > 0 && renderOrderTabs}
            {!!selectedOrder && !!selectedOrder.number &&
            <Order
                updateOrder={this.updateOrder}
                deliverOrder={this.deliverOrder}
                rejectOrder={this.rejectOrder}
                order={selectedOrder}

            />}
          </ScrollView>
        </Container>
    );
  }

}

export default NewOrderComponent;
