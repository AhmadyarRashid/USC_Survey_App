import React, {Fragment} from 'react';
import AppRoutes from './src/routes/index';

function App (){
  // enable app requests in chrome debugging
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  return (
    <Fragment>
      <AppRoutes/>
    </Fragment>
  );
};

export default App;
