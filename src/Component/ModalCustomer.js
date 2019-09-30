import React, { createRef } from 'react';
import { Modal } from 'antd';
import '../Sass/ModalCustomer.scss';

export default function ModalCustomer(props) {

    const inputNameRef = createRef();
    const inputPhoneRef = createRef();
    const inputAddressRef = createRef();

    const _handleOk = e => {
        e.preventDefault();
        const data = {
            full_name: inputNameRef.current.value,
            phone: inputPhoneRef.current.value,
            address: inputAddressRef.current.value,
        }
        props.handleConfirm(data)
        props.showHideModal(undefined);

    };

    const _handleCancel = () => {
        props.showHideModal(undefined);
    };

    const title = props.type === "new" ? "Add Customer" : props.type === "update" ? "Edit Customer" : "";
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
                    <input placeholder="Full Name"
                        name="fullName"
                        ref={inputNameRef}
                        className="inputText" type="text" />

                    <input placeholder="Phone Number"
                        ref={inputPhoneRef}
                        name="phone"
                        className="inputText" type="phone" />

                    <input placeholder="Address"
                        ref={inputAddressRef}
                        name="address"
                        className="inputText" type="text" />
                </form>
            </Modal>
        </div>
    )
}
