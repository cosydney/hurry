const initialState = {
  scheduled_sms: [
    {
      schedule_time: 3 * 24 * 60 * 60 * 1000,
      number: 1,
      type: "day",
      before: "after",
      text:
        "Hi {FirstName}, thank you for subscribing to our event. You can invite some friends to subscribe to our event. "
    },
    {
      schedule_time: -10 * 60 * 60 * 1000 - 1,
      number: 10,
      type: "hour",
      before: "before",
      text: "Hey {FirstName}, the event will happen in 10 hours, so get ready!"
    },
    {
      schedule_time: 1 * 24 * 60 * 60 * 1000,
      number: 1,
      type: "day",
      before: "after",
      text:
        "Thank you {FirstName} for coming to our event it was a great success thanks to you."
    }
  ]
};

export default initialState;