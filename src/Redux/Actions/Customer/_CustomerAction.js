import { GetListCustomerAction } from "./GetListCustomerAction";
import { CreateCustomerAction } from "./CreateCustomerAction";
import { UpdateCustomerAction } from "./UpdateCustomerAction";
import { DeleteCustomerAction } from "./DeleteCustomerAction";

const CustomerAction = {
    ...GetListCustomerAction,
    ...CreateCustomerAction,
    ...UpdateCustomerAction,
    ...DeleteCustomerAction,
}

export default CustomerAction;