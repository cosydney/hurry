import { combineReducers } from "redux";
import scheduleReducer from "./ScheduleReducer";
import userReducer from "./UserReducer";
import Attendees from "./AttendeesReducer";
import Event from "./EventReducer";

export default combineReducers({
  schedule: scheduleReducer,
  user: userReducer,
  attendees: Attendees,
  event: Event,
});
