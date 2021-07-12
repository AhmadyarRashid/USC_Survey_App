import React from 'react';
import ParentDashboardComponent from '../../howmuch-pos-core/hoc/ParentDashboardComponent';



class DashboardWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
    );
  }
}

export default DashboardWrapper;
