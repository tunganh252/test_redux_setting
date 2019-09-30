import { createAction } from 'redux-actions';
import { host } from '../../../API/Host';
import Axios from "axios";

///////////// Status call API ////////////////////////////
const API_SUCCESS = 200;

///////////// API /////////////////
const apiGetListCustomer = host + "/api/customer/get-customer";

///////////// Types Action ////////////////////
export const GetListCustomerStart = createAction("GET_LIST_CUSTOMER_START");
export const GetListCustomerSuccess = createAction("GET_LIST_CUSTOMER_SUCCESS");
export const GetListCustomerFail = createAction("GET_LIST_CUSTOMER_FAIL");


/**
 * [description]
 * 
 */

export const GetListCustomer = () => async (dispatch, getState) => {
    dispatch(GetListCustomerStart({
        listCustomer: {
            ...getState().CustomerReducer.listCustomer,
            loading: true,
        }
    }));

    try {
        const res = await Axios.get(apiGetListCustomer);
        const { data } = res;
        const isSuccess = data.isSuccess && res.status === API_SUCCESS && true

        if (data && isSuccess) {
            console.log(res);
            dispatch(GetListCustomerSuccess({
                listCustomer: {
                    ...getState().CustomerReducer.listCustomer,
                    loading: false,
                    data: data.data,
                    error: {
                        errorCode: "",
                        message: ""
                    }
                }
            }))
        } else {
            console.log(res);
            dispatch(GetListCustomerFail({
                listCustomer: {
                    ...getState().CustomerReducer.listCustomer,
                    loading: false,
                    error: {
                        errorCode: "",
                        message: "Client Connect Failed"
                    }
                }
            }));
        }
    } catch (err) {
        console.log(err);
        dispatch(GetListCustomerFail({
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

/**
 * 
 * @param {number*} limitPerPage 
 * @param {number*} PageNumber 
 */
export const GetListCustomerPagin = (limitPerPage, PageNumber) => async (dispatch, getState) => {
    dispatch(GetListCustomerStart({
        listCustomer: {
            ...getState().CustomerReducer.listCustomer,
            loading: true,
        }
    }));

    const dataQueryFormat = {
        limit: limitPerPage,
        pageNum: PageNumber
    }


    try {
        const res = await Axios.get(apiGetListCustomer, {params:dataQueryFormat});
        const { data } = res;
        const isSuccess = data.isSuccess && res.status === API_SUCCESS && true

        if (data && isSuccess) {
            console.log(res);
            dispatch(GetListCustomerSuccess({
                listCustomer: {
                    ...getState().CustomerReducer.listCustomer,
                    loading: false,
                    data: data.data,
                    error: {
                        errorCode: "",
                        message: ""
                    }
                }
            }))
        } else {
            console.log(res);
            dispatch(GetListCustomerFail({
                listCustomer: {
                    ...getState().CustomerReducer.listCustomer,
                    loading: false,
                    error: {
                        errorCode: "",
                        message: "Client Connect Failed"
                    }
                }
            }));
        }
    } catch (err) {
        console.log(err);
        dispatch(GetListCustomerFail({
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

export const GetListCustomerAction = {
    /////// GetListCustomer ////////
    GetListCustomerStart,
    GetListCustomerSuccess,
    GetListCustomerFail,
    GetListCustomer,
    GetListCustomerPagin

}