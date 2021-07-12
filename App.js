import React from 'react';
import AppRoutes from './src/Routes/index';
import FlashMessage from 'react-native-flash-message';
import Toast from 'react-native-toast-message';

const App: () => React$Node = () => {
  // enable app requests in chrome debugging
  return (
      <>
        <AppRoutes/>
        <FlashMessage position="bottom" />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </>
  );
};

export default App;
