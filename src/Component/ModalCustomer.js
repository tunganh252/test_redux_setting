import React, { createRef } from 'react';
import { Modal } from 'antd';
import '../Sass/ModalCustomer.scss';

export default function ModalCustomer(props) {

    const inputNameRef = createRef();
    const inputPhoneRef = createRef();
    const inputAddressRef = createRef();

    const _handleOk = e => {
        e.preventDefault();
        const { dataCustomer } = props;
        const data = {
            ...dataCustomer,
            full_name: inputNameRef.current.value,
            phone: inputPhoneRef.current.value,
            address: inputAddressRef.current.value,
        }
        props.handleConfirm(data)
        props._setDefaultDataCustomer();
        props.showHideModal(undefined);

    };

    const _handleCancel = () => {
        props._setDefaultDataCustomer();
        props.showHideModal(undefined);
    };

    const title = props.type === "new" ? "Add Customer" : props.type === "update" ? "Edit Customer" : "";
    const { dataCustomer } = props;

    return (
        <div>
            <Modal
                title={title}
                visible={props.visible !== undefined}
                onOk={_handleOk}
                onCancel={_handleCancel}
            >
                <form className="form_style"
                    onSubmit={_handleOk}>
                    <input
                        name="fullName"
                        placeholder={dataCustomer && props.type === "update" ? dataCustomer.full_name : "fullName"}
                        ref={inputNameRef}
                        className="inputText" type="text" />

                    <input
                        placeholder={dataCustomer && props.type === "update" ? dataCustomer.phone : "Phone Number"}
                        ref={inputPhoneRef}
                        name="phone"
                        className="inputText" type="phone" />
                    <input
                        placeholder={dataCustomer && props.type === "update" ? dataCustomer.address : "Address"}
                        ref={inputAddressRef}
                        name="address"
                        className="inputText" type="text" />
                </form>
            </Modal>
        </div>
    )
}
