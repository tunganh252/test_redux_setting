import { createAction } from 'redux-actions';
import { host } from '../../../API/Host';
import Axios from "axios";

///////////// Status call API ////////////////////////////
const API_SUCCESS = 200;


///////////// API /////////////////
const apiDeleteCustomer = host + "/api/customer/delete-customer";

export const DeleteCustomerStart = createAction("DELETE_CUSTOMER_START");
export const DeleteCustomerSuccess = createAction("DELETE_CUSTOMER_SUCCESS");
export const DeleteCustomerFail = createAction("DELETE_CUSTOMER_FAIL");

/**
 * [description]
 * @param {string*} uuid: id unique follow with customer,
 */

export const DeleteCustomer = (uuid) => async (dispatch, getState) => {
    dispatch(DeleteCustomerStart({
        listCustomer: {
            ...getState().CustomerReducer.listCustomer,
            loading: true,
        }
    }));
    const queryDataFormat = { uuid };
    try {
        const res = await Axios.delete(apiDeleteCustomer, { data: queryDataFormat });
        const { data } = res;
        const isSuccess = data.isSuccess && res.status === API_SUCCESS && true;
        if (isSuccess) {
            // console.log(res);
            dispatch(DeleteCustomerSuccess({
                listCustomer: {
                    ...getState().CustomerReducer.listCustomer,
                    loading: false,
                    error: {
                        errorCode: "",
                        message: ""
                    }
                }
            }));
        } else {
            // console.log(res);
            dispatch(DeleteCustomerFail({
                listCustomer: {
                    ...getState().CustomerReducer.listCustomer,
                    loading: false,
                    error: {
                        errorCode: data.error.errorCode,
                        message: data.error.errorMessage
                    }
                }
            }));
        }
    } catch (err) {
        // console.log(err);
        dispatch(DeleteCustomerFail({
            listCustomer: {
                ...getState().CustomerReducer.listCustomer,
                loading: false,
                error: {
                    errorCode: "",
                    message: err
                }
            }
        }));
    }
}

export const DeleteCustomerAction = {
    /////// GetListCustomer ////////
    DeleteCustomerStart,
    DeleteCustomerSuccess,
    DeleteCustomerFail,
    DeleteCustomer
}