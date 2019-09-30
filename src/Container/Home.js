import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//////////
import { Actions } from '../Redux/Actions/RootAction';
import TableUser from '../Component/TableUser';

class Home extends Component {

  componentDidMount() {
    // this.props.CustomerAction.GetListCustomer();
    this.props.CustomerAction.GetListCustomerPagin(7,1);
  }


  render() {
    const { CustomerReducer } = this.props;
    return (
      <div>
        <TableUser
          CustomerReducer = {CustomerReducer}
          dataGetList={CustomerReducer.listCustomer.data}
          GetListCustomerPagin={this.props.CustomerAction.GetListCustomerPagin}
          loadingTable={CustomerReducer.listCustomer.loading}
          GetListCustomer={this.props.CustomerAction.GetListCustomer}
          CreateCustomer={this.props.CustomerAction.CreateCustomer}
          UpdateCustomer={this.props.CustomerAction.UpdateCustomer}
          DeleteCustomer={this.props.CustomerAction.DeleteCustomer}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    CustomerReducer: state.CustomerReducer,
  }),
  (dispatch) => ({
    CustomerAction: bindActionCreators(Object.assign(Actions.CustomerAction), dispatch),
    // OtherAction: bindActionCreators(Object.assign(Actions.OtherAction), dispatch)
  })
)(Home);