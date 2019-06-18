import { SET_TOKEN, SET_USER_INFO } from "../../components/ConnectWith/actionTypes";


const initialState = {
    name: "",
    email: "",
    ebToken: "",
}
// events: [
  //   {
  //     title: "",
  //     starting_date: "",
  //     ending_date: "",
  //   }
  // ],

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        ebToken: action.token,
      }
    case SET_USER_INFO:
      return {
        ...state,
        name: action.info.name,
        email: action.info.emails[0].email
      }
    default:
      return state;
  }
}
