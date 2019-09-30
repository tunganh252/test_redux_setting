import React, { useState } from 'react';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import ModalCustomer from './ModalCustomer';

export default function TableUser(props) {

  /////// Visible form Modal
  const [visible, setVisible] = useState(undefined);
  const [dataCustomer, setDataCustomer] = useState({});
  ////// Check type Modal

  const PAGE_SIZE = 7;
  const _handleDelete = async (uuid, data) => {
    console.log(uuid);
    await props.DeleteCustomer(uuid)
    await props.GetListCustomerPagin(PAGE_SIZE, props.dataGetList.pager.pageNum)

  }

  const _EditCustomer = async (data) => {
    const dataUpdate = { uuid: data.uuid, full_name: data.full_name, phone: data.phone, address: data.address }
    await props.UpdateCustomer(dataUpdate)
    await props.GetListCustomerPagin(PAGE_SIZE, props.dataGetList.pager.pageNum)
  }

  const _AddNewCustomer = async (data) => {
    await props.CreateCustomer(data.full_name, data.phone, data.address);
    await props.GetListCustomerPagin(PAGE_SIZE, props.dataGetList.pager.pageNum)
  }


  const _handleConfirm = (data) => {
    console.log(data);

    switch (visible !== undefined) {
      case visible === "new":
        _AddNewCustomer(data)
        break;
      case visible === "update":
        _EditCustomer(data)
        break;

      default:
        break;
    }

  }

  const columns = [
    {
      title: 'Index',
      dataIndex: 'id',
      key: 'id',
      render: text => <p>{text + 1}</p>,
    },
    {
      title: 'Full name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: text => <p style={{ cursor: "pointer", color: "#40A9FF" }}>{text}</p>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Customer code',
      dataIndex: 'code',
      key: 'code'
    },
    {
      key: "actionEdit",
      title: '',
      dataIndex: 'uuid',
      render: (uuid, dataCustomer) => <Button type="primary" onClick={_showEdit}
      >
        Edit </Button>
    },
    {
      key: "actionDelete",
      title: '',
      dataIndex: 'uuid',
      render: (uuid, dataCustomer) => <Popconfirm
        title="Are you sure delete this customer ?" onConfirm={_handleDelete}>
        <Button type="danger">Delete</Button>
      </Popconfirm>
    },
  ];

  const _showHideModal = (toogle) => {
    setVisible(toogle)
  }

  const _handleChangePage = async (pageNum, pageSize) => {
    props.GetListCustomerPagin(pageSize, pageNum)
  }

  const _showAddNew = () => {
    setVisible("new")
  }
  const _showEdit = () => {
    setVisible("update");
  }

  return (
    <div>
      <div style={{ margin: "10px", position: 'relative' }}>
        <Button type="primary" onClick={_showAddNew}>
          New
        </Button>
        <Table
          loading={props.loadingTable}
          pagination={false}
          columns={columns}
          dataSource={props.dataGetList.data}
          rowKey="uuid"
        />
        <div>
          <Pagination
            total={(props.dataGetList.data && props.dataGetList.data.length > 0) ? props.dataGetList.pager.total : 1}
            pageSize={7}
            defaultCurrent={1}
            onChange={_handleChangePage}
          />
        </div>
        <div style={{
          position: "absolute",
          top: "2%",
          right: "0",
        }}>
          <ModalCustomer
            type={visible}
            handleConfirm={_handleConfirm}
            visible={visible}
            showHideModal={_showHideModal}
          />
        </div>
      </div>
    </div>
  )
}
