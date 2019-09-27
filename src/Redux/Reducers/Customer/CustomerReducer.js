import { handleActions, combineActions } from 'redux-actions';
import { GetListCustomerAction } from '../../Actions/Customer/GetListCustomerAction';
import { CreateCustomerAction } from '../../Actions/Customer/CreateCustomerAction';
import { UpdateCustomerAction } from '../../Actions/Customer/UpdateCustomerAction';
import { DeleteCustomerAction } from '../../Actions/Customer/DeleteCustomerAction';


let initialState = {
    listCustomer: {
        data: [],
        createCustomer: {},
        updateCustomer: {},
        error: {
            errorCode: "",
            message: "",
        },
        loading: false
    }
}

const CustomerReducer = handleActions({
    [combineActions(
        //////////// GET_LIST_CUSTOMER_ACTION ///////////
        GetListCustomerAction.GetListCustomerStart,
        GetListCustomerAction.GetListCustomerSuccess,
        GetListCustomerAction.GetListCustomerFail,

        //////////// CREATE_CUSTOMER_ACTION ///////////
        CreateCustomerAction.CreateCustomerStart,
        CreateCustomerAction.CreateCustomerSuccess,
        CreateCustomerAction.CreateCustomerFail,

        //////////// UPDATE_CUSTOMER_ACTION ///////////
        UpdateCustomerAction.UpdateCustomerStart,
        UpdateCustomerAction.UpdateCustomerSuccess,
        UpdateCustomerAction.UpdateCustomerFail,

        //////////// DELETE_CUSTOMER_ACTION ///////////
        DeleteCustomerAction.DeleteCustomerStart,
        DeleteCustomerAction.DeleteCustomerSuccess,
        DeleteCustomerAction.DeleteCustomerFail,
    ).toString()]: (state, action) => {
        return { ...state, ...action.payload }
    }
}, initialState);

export default CustomerReducer;
