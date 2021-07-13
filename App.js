import React from 'react';
import AppRoutes from './src/Routes/index';

const App: () => React$Node = () => {
  // enable app requests in chrome debugging
  return (<AppRoutes/>);
};

export default App;
