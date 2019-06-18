import { ADD_ATTENDEES, ADD_EVENT } from "./actionTypes"

export const addAttendees = (attendees) => ({
  type: ADD_ATTENDEES,
  attendees
});

export const addEvent = (event) => ({
  type: ADD_EVENT,
  event
});