import React from 'react';
import {ScrollView} from 'react-native';
import {Container, Body, View, Text} from 'native-base';
import OrderComponent from '../../../components/Order/order';
import OrderHeaderComponent from '../header';
import ParentDashboardComponent from '../../../howmuch-pos-core/hoc/ParentDashboardComponent';

class PendingOrdersComponent extends ParentDashboardComponent{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    this.setState({
      ...super.state,
      incoming_orders: this.props.pendingOrders,
    })
  }

  render(){
    console.log("pending states:", this.state)
    const {incoming_orders} = this.state;
    return (
        <Container>
          <OrderHeaderComponent
              title="Pending Orders"
              {...this.props}
          />
          <ScrollView>
            {incoming_orders.map(order =>
                <View style={{margin: 12}}>
                  <OrderComponent
                      {...this.props}
                      {...this}
                      isInprogressOrder={false}
                      key={order.number}
                      isOnline={true}
                      order={order}
                  />
                </View>
            )}
          </ScrollView>
        </Container>
    );
  }
}

export default PendingOrdersComponent;
