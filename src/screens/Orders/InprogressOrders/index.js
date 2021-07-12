import React from 'react';
import {ScrollView} from 'react-native';
import {Container, Body, View, Text} from 'native-base';
import OrderComponent from '../../../components/Order/order';
import OrderHeaderComponent from '../header';
import ParentDashboardComponent from '../../../howmuch-pos-core/hoc/ParentDashboardComponent';

class InProgressOrdersComponent extends ParentDashboardComponent{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    this.setState({
      ...super.state,
      in_progress_orders: this.props.workingOrders,
    })
  }

  render(){
    console.log("inprogress states:", this.state)
    const {in_progress_orders} = this.state;
    return (
        <Container>
          <OrderHeaderComponent
              title="Working Orders"
              {...this.props}
          />
          <ScrollView>
            {in_progress_orders.map(order =>
                <View style={{margin: 12}}>
                  <OrderComponent
                      isInprogressOrder={true}
                      {...this.props}
                      {...this}
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

export default InProgressOrdersComponent;
