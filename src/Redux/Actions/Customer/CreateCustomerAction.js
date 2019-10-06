import { createAction } from 'redux-actions';
import { host } from '../../../API/Host';
import Axios from "axios";


///////////// Status call API ////////////////////////////
const API_SUCCESS = 200;


///////////// API /////////////////
const apiCreateCustomer = host + "/api/customer/create-customer";


///////////// Types Action ////////////////////
export const CreateCustomerStart = createAction("CREATE_CUSTOMER_START");
export const CreateCustomerSuccess = createAction("CREATE_CUSTOMER_SUCCESS");
export const CreateCustomerFail = createAction("CREATE_CUSTOMER_FAIL");

/**
 * [description]
 * @param {string*} full_name
 * @param {string*} phone
 * @param {string*} address
 */

export const CreateCustomer = (full_name, phone, address) => async (dispatch, getState) => {
    dispatch(CreateCustomerStart({
        listCustomer: {
            ...getState().CustomerReducer.listCustomer,
            loading: true,
        }
    }));
    const queryDataFormat = {
        full_name,
        phone,
        address
    }
    try {
        const res = await Axios.post(apiCreateCustomer, queryDataFormat)
        const { data } = res;
        const isSuccess = data.isSuccess && res.status === API_SUCCESS && true
        if (data && isSuccess) {
            // console.log(res);
            dispatch(CreateCustomerSuccess({
                listCustomer: {
                    ...getState().CustomerReducer.listCustomer,
                    loading: false,
                    createCustomer: data.data,
                    error: {
                        errorCode: "",
                        message: ""
                    }
                }
            }));
        } else {
            // console.log(res);
            dispatch(CreateCustomerFail({
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
        dispatch(CreateCustomerFail({
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

export const CreateCustomerAction = {
    /////// GetListCustomer ////////
    CreateCustomerStart,
    CreateCustomerSuccess,
    CreateCustomerFail,
    CreateCustomer
}