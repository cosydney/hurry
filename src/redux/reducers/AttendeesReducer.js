import { ADD_ATTENDEES } from "../../components/ImportContacts/actionTypes";
import { RESET_CAMPAIGN } from "../../components/Pay/actionTypes";


const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ATTENDEES:
      return [
        ...action.attendees
      ]
    case RESET_CAMPAIGN:
      return initialState;
    default:
      return state;
  }
}
