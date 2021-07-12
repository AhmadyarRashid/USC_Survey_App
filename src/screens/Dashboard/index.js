import React from 'react';
import {Text, Container, Content} from 'native-base';
import HeaderComponent from "./header";
import styles from './styles';

function Dashboard(props) {
  return (
      <>
        <HeaderComponent {...props}/>
        <Content>
          <Text>This is dashboard</Text>
        </Content>
      </>
  );
}

export default Dashboard;
