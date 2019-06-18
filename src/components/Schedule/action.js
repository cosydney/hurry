import { ADD_SCHEDULE_BOX, DELETE_SCHEDULE_BOX, EDIT_BOX } from './actionTypes'

const scheduledSms = {
    // schedule_time: '',
    number: 2,
    type: 'hour',
    before: 'before',
    text: '',
  }

export const addScheduleBox = () => ({
  type: ADD_SCHEDULE_BOX,
  scheduled_sms: scheduledSms,
});

export const deleteScheduleBox = (index) => ({
  type: DELETE_SCHEDULE_BOX,
  index,
});

export const editBox = (index, info) => ({
  type: EDIT_BOX,
  index, 
  info
})
