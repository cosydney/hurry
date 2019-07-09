const initialState = {
  scheduled_sms: [
    {
      schedule_time: -10 * 60 * 60 * 1000 - 1,
      number: 10,
      type: "hour",
      before: "before",
      text: "Hey {FullName}, the event {EventName} will happen in 10 hours, so get ready 🎉! It will take place at {EventAddress}. Can’t wait to see you ✌"
    },
    {
      schedule_time: 1 * 24 * 60 * 60 * 1000,
      number: 1,
      type: "day",
      before: "after",
      text:
        "🙏 Thank you  {FullName} for coming to our event, it was a great success, we hope to see you again very soon! 😎"
    }
  ]
};

export default initialState;