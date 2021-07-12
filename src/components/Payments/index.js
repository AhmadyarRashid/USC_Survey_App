import React from 'react';
import {Container, Tab, TabHeading, Tabs, Text, View, ScrollableTab} from 'native-base';
import {ScrollView} from 'react-native';
import CashPayment from './CashPayment';
import CreditCardPayment from './CreditCardPayment';
import CreditPayment from './CreditPayment';
import ChequePayment from './ChequePayment';

import styles from '../Order/styles';
import {Colors} from '../../utils/colors';

function Payments(props) {
  return(
      <Tabs
          tabBarUnderlineStyle={{ backgroundColor: Colors.primary}}
          renderTabBar={()=> <ScrollableTab />} >
        <Tab heading={ <TabHeading><Text style={{color: Colors.primary}}>Cash</Text></TabHeading>}>
          <CashPayment {...props} />
        </Tab>
        <Tab heading={ <TabHeading><Text style={{color: Colors.primary}}>CC</Text></TabHeading>}>
          <CreditPayment {...props}/>
        </Tab>
        <Tab
            heading={ <TabHeading><Text style={{color: Colors.primary}}>CP</Text></TabHeading>}>
          <CreditCardPayment {...props}/>
        </Tab>
        <Tab heading={ <TabHeading><Text style={{color: Colors.primary}}>Cheque</Text></TabHeading>}>
          <ChequePayment {...props}/>
        </Tab>
      </Tabs>
  )
}

export default Payments;
