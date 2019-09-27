import { createAction } from 'redux-actions';
import { host } from '../../../API/Host';
import Axios from "axios";

///////////// Status call API ////////////////////////////
const API_SUCCESS = 200;


///////////// API /////////////////
const apiUpdateCustomer = host + "/api/customer/update-customer";

export const UpdateCustomerStart = createAction("UPDATE_CUSTOMER_START");
export const UpdateCustomerSuccess = createAction("UPDATE_CUSTOMER_SUCCESS");
export const UpdateCustomerFail = createAction("UPDATE_CUSTOMER_FAIL");

/**
 * [description]
 * @param {{
 *  uuid*: string / id unique follow with customer,
 *  full_name*: string,
 *  phone*: string,
 *  address*: string,
 * }} dataQuery: dataCustomer flowUpdate
 */

export const UpdateCustomer = (dataQuery) => async (dispatch, getState) => {
    dispatch(UpdateCustomerStart({
        listCustomer: {
            ...getState().CustomerReducer.listCustomer,
            loading: true,
        }
    }));
    const queryDataFormat = {
        uuid: dataQuery.uuid,
        full_name: dataQuery.full_name,
        phone: dataQuery.phone,
        address: dataQuery.address,
    }
    try {
        const res = await Axios.put(apiUpdateCustomer, queryDataFormat)
        const { data } = res;
        const isSuccess = data.isSuccess && res.status === API_SUCCESS && true;
        if (data && isSuccess) {
            console.log(res);
            dispatch(UpdateCustomerSuccess({
                listCustomer: {
                    ...getState().CustomerReducer.listCustomer,
                    loading: false,
                    updateCustomer: data.data,
                    error: {
                        errorCode: "",
                        message: ""
                    }
                }
            }));
        } else {
            console.log(res);
            dispatch(UpdateCustomerFail({
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
        console.log(err);
        dispatch(UpdateCustomerFail({
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

export const UpdateCustomerAction = {
    /////// GetListCustomer ////////
    UpdateCustomerStart,
    UpdateCustomerSuccess,
    UpdateCustomerFail,
    UpdateCustomer
}