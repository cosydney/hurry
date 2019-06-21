import {
  ADD_SCHEDULE_BOX,
  DELETE_SCHEDULE_BOX,
  EDIT_BOX
} from "../../components/Schedule/actionTypes";

const initialState = {
  scheduled_sms: [
    {
      schedule_time: -2 * 60 * 60 * 1000 - 1,
      number: 2,
      type: "hour",
      before: "before",
      text: "Hey {name}, the event will happen in 2 hours, so get ready! The address of the event will be at "
    },
    {
      schedule_time: 24 * 60 * 60 * 1000,
      number: 1,
      type: "day",
      before: "after",
      text:
        "Thank you {name} for coming to our event it was a great success thanks to you."
    }
  ]
};

function calculateMsInterval(interval, type, isBefore) {
  let total = 0;
  if (type === "day") {
    total = 24 * 60 * 60 * 1000 * interval;
  }
  if (type === "hour") {
    total = 60 * 60 * 1000 * interval;
  }
  if (type === "minute") {
    total = 60 * 1000 * interval;
  }
  return isBefore ? -1 * total : total;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SCHEDULE_BOX:
      // Calculating interval of time before or after the event in MS
      let { before, number, type } = action.scheduled_sms;
      let isBefore = before === "before";
      let schedule_time = calculateMsInterval(number, type, isBefore);
      action.scheduled_sms.schedule_time = schedule_time;
      let array = [...state.scheduled_sms, action.scheduled_sms]
      array.sort((a, b) => (a.schedule_time > b.schedule_time) ? 1 : -1)
      return {
        ...state,
        scheduled_sms: [...array]
      };
    case DELETE_SCHEDULE_BOX:
      return {
        ...state,
        scheduled_sms: state.scheduled_sms.filter(
          (el, index) => action.index !== index
        )
      };
    case EDIT_BOX:
      // Calculating interval of time before or after the event in MS d for dos
      let shouldSort = action.info.text === state.scheduled_sms[action.index].text
      let isitBefore = action.info.before === "before";
      let numberd = action.info.number;
      let typed = action.info.type;
      let schedule_timed = calculateMsInterval(numberd, typed, isitBefore);
      action.info.schedule_time = schedule_timed;
      let newScheduledSms = state.scheduled_sms.map((el, i) =>
        action.index === i ? action.info : el
      )
      // sorting so that scheduled box appear one after the other
      if (shouldSort) {
        newScheduledSms.sort((a, b) => (a.schedule_time > b.schedule_time) ? 1 : -1)
      }
      return {
        ...state,
        scheduled_sms: newScheduledSms
      };
    default:
      return state;
  }
}
