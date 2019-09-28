import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal } from 'antd';
import ModalCustomer from './ModalCustomer';

export default function TableUser(props) {

  const handleDelete = async (uuid) => {
    await props.DeleteCustomer(uuid)
    await props.GetListCustomer();
  }

  const EditCustomer = async (data) => {
    const dataUpdate = {uuid: data.uuid, full_name:data.full_name,phone:data.phone,address:data.address}
    await props.UpdateCustomer(dataUpdate)
    await props.GetListCustomer();
  }

  const AddNewCustomer = async (data) => {
    await props.CreateCustomer(data.fullName,data.phone,data.address);
    await props.GetListCustomer();

  }

  const columns = [
    {
      title: 'Index',
      dataIndex: 'id',
      key: 'id',
      render: text => <p>{text+1}</p>,
    },
    {
      title: 'Full name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: text => <a href="#">{text}</a>,
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
      key: "action",
      title: '',
      dataIndex: 'uuid',
      render: (uuid, dataCustomer)=>
        props.dataGetList.length >= 1 ? (
          <div style={{
            display: "flex", justifyContent: "space-around", alignItems: "center"
          }}>
            <ModalCustomer
              title="Edit"
              dataNeedUpdate = {dataCustomer}
              modalTitle="Edit info customer !"
              btnDefault={false}
              handleConfirm = {(data)=>EditCustomer(data)}
            />
            <Popconfirm title="Are you sure delete this customer ?"            onConfirm={() => handleDelete(uuid)}>
              <p style={{ cursor: "pointer", color: "#F5222D" }}>Delete</p>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  return (
    <div>
      <div style={{ margin: "10px", position: 'relative' }}>
        <Table
          loading={props.loadingTable}
          pagination={{ pageSize: 6 }}
          columns={columns}
          dataSource={props.dataGetList}
          rowKey="tableCustomer"
        />
        <div style={{
          position: "absolute",
          top: "2%",
          right: "0",
        }}>
          <ModalCustomer
            title="Add Customer"
            modalTitle="Add a new customer !"
            btnDefault={true}
             handleConfirm = {(data)=>AddNewCustomer(data)}
          />
        </div>
      </div>
    </div>
  )
}
