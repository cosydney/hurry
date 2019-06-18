import { ADD_EVENT } from "../../components/ImportContacts/actionTypes";

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      console.log('action.event', action.event)
      return {
        ...action.event
      }
    default:
      return state;
  }
}
