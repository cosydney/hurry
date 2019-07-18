import { ADD_EVENT } from "../../components/ImportContacts/actionTypes";
import { RESET_CAMPAIGN } from "../../components/Pay/actionTypes";

const initialState = {
  name: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...action.event
      }
    case RESET_CAMPAIGN:
      return initialState;
    default:
      return state;
  }
}
