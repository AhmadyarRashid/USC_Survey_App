import React, {Fragment, useState} from 'react';
import AppRoutes from './src/routes/index';
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App (){
  // enable app requests in chrome debugging

  return (
    <Fragment>
      <AppRoutes/>
      <FlashMessage position="top"/>
    </Fragment>
  );
};

export default App;
