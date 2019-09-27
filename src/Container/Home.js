import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//////////
import { Table, Button } from 'antd';
import { Actions } from '../Redux/Actions/RootAction';

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
    e.preventDefault();

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
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }

    const columns = [
      {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
      },
      {
        title: 'Column 5',
        dataIndex: 'address',
        key: '5',
        width: 150,
      },
      {
        title: 'Column 6',
        dataIndex: 'address',
        key: '6',
        width: 150,
      },
      {
        title: 'Column 7',
        dataIndex: 'address',
        key: '7',
        width: 150,
      },
      { title: 'Column 8', dataIndex: 'address', key: '8' },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>action</a>,
      },
    ];

    return (
      <div>
        <Table
          pagination={{ pageSize: 10 }}
          columns={columns} dataSource={data} />
        <form onSubmit={(e) => this._handleCreateCustomer(e)}>
          <input type="text" name="full_name" onChange={(e) => this._onChangeData(e)} />
          <input type="text" name="phone" onChange={(e) => this._onChangeData(e)} />
          <input type="text" name="address" onChange={(e) => this._onChangeData(e)} />
          <button type='submit'>Test API</button>
        </form>
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