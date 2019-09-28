import React, { useState } from 'react';
import {Form, Modal, Button } from 'antd';
import '../Sass/ModalCustomer.scss';

export default function ModalCustomer(props) {

    const [visible, setVisible] = useState(false)
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    let dataCustomer = props.dataNeedUpdate;

    const _showModal = (dataNeedUpdate) => {
        if (dataNeedUpdate) {
            setFullName(dataNeedUpdate.full_name);
            setPhone(dataNeedUpdate.phone);
            setAddress(dataNeedUpdate.address);
            dataCustomer = dataNeedUpdate
        }
        setVisible(true);
    };

    const _handleOk = e => {
        e.preventDefault();
        const dataAddNew = {fullName,phone,address};
        props.handleConfirm(dataCustomer?{...dataCustomer,fullName,phone,address}:dataAddNew);
        setVisible(false);
    };
    const _handleCancel = e => {
        setVisible(false);
    };
 
    return (
        <div>
            {
                props.btnDefault ?
                    <Button type="primary" onClick={() => _showModal(props.dataNeedUpdate)}>
                        {props.title}
                    </Button>
                    :
                    <p style={{ cursor: "pointer", color: "#3053E9" }} onClick={() => _showModal(props.dataNeedUpdate)}>
                        {props.title}
                    </p>
            }
            <Modal
                title={props.modalTitle}
                visible={visible}
                onOk={(e) => _handleOk(e)}
                onCancel={(e) => _handleCancel(e)}
            >
                <form className="form_style" onSubmit={(e) => this.handleOk(e)}>
                    <input placeholder="Full Name" value={fullName}
                        onChange={(e)=>setFullName(e.target.value)}
                    className="inputText" type="text" name={fullName} />
                    <input placeholder="Phone Number"  value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                    className="inputText" type name={phone} />
                    <input placeholder="Address"  value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                    className="inputText" type="text" name={address} />
                </form>
            </Modal>
        </div>
    )
}
