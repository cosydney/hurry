import React, { Component } from "react";
import ScheduleBox from "./ScheduleBox";
import { connect } from "react-redux";
import { addScheduleBox, deleteScheduleBox } from "./action";

class Schedule extends Component {
  render() {
    const { addBox, scheduled_sms, delBox } = this.props;
    return (
      <div
        style={{
          height: 270
        }}
      >
        <h1>2. Schedule your messages</h1>
        <div
          style={{
            marginLeft: -163
          }}
        >
          <div
            style={{
              overflowY: "hidden",
              overflowX: "auto",
              display: "flex",
              padding: "20px",
              paddingLeft: 163,
            }}
          >
            {scheduled_sms.map((element, index) => (
              <ScheduleBox
                key={index}
                index={index}
                info={element}
                add={false}
                deleteBox={index => delBox(index)}
              />
            ))}
            <ScheduleBox add={true} addBox={() => addBox()} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ schedule }) => ({
  scheduled_sms: schedule.scheduled_sms
});

const mapDispatchToProps = dispatch => {
  return {
    addBox: () => dispatch(addScheduleBox()),
    delBox: index => dispatch(deleteScheduleBox(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
