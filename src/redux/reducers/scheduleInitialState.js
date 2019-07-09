const initialState = {
  scheduled_sms: [
    {
      schedule_time: -2 * 60 * 60 * 1000 - 1,
      number: 10,
      type: "hour",
      before: "before",
      text: "Hey {FullName}, the event will happen in 10 hours, so get ready! The address of the event will be at "
    },
    {
      schedule_time: 24 * 60 * 60 * 1000,
      number: 1,
      type: "day",
      before: "after",
      text:
        "Thank you {FullName} for coming to our event it was a great success thanks to you."
    }
  ]
};

export default initialState;