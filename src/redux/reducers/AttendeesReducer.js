import { ADD_ATTENDEES } from "../../components/ImportContacts/actionTypes";


const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ATTENDEES:
      return [
        ...action.attendees
      ]
    default:
      return state;
  }
}
