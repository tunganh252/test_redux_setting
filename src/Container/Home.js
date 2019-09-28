import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//////////
import { Actions } from '../Redux/Actions/RootAction';
import TableUser from '../Component/TableUser';

class Home extends Component {

  state = {
    full_name: "",
    phone: "",
    address: "",
  }

  componentDidMount() {
    this.props.CustomerAction.GetListCustomer();
  }

  _onChangeData = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  _handleCreateCustomer = (e) => {

    const { full_name, phone, address } = this.state;
    const data = {
      uuid: "5d8cef1d0d1b522390ccf049",
      full_name,
      phone,
      address
    }
    // this.props.CustomerAction.CreateCustomer(full_name, phone, address);
    // this.props.CustomerAction.UpdateCustomer(data);
    this.props.CustomerAction.DeleteCustomer(data.uuid);


  }

  render() {
    const { CustomerReducer } = this.props;
    return (
      <div>
        <TableUser
          dataGetList={CustomerReducer.listCustomer.data.data}
          loadingTable = {CustomerReducer.listCustomer.loading}
          GetListCustomer = {this.props.CustomerAction.GetListCustomer}
          CreateCustomer = {this.props.CustomerAction.CreateCustomer}
          UpdateCustomer = {this.props.CustomerAction.UpdateCustomer}
          DeleteCustomer = {this.props.CustomerAction.DeleteCustomer}
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