import React, { Component } from "react";
import ScheduleBox from "./ScheduleBox";
import { connect } from "react-redux";
import { addScheduleBox, deleteScheduleBox } from "./action";
import { Icon } from "antd";

class Schedule extends Component {
  render() {
    const { addBox, scheduled_sms, delBox } = this.props;
    return (
      <div style={{ height: "auto" }}>
        <h1>
          <Icon
            style={{ fontSize: "36px" }}
            type="calendar"
            theme="twoTone"
          />{" "}
          Schedule your messages
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {scheduled_sms.map((element, index) => (
            <div
              style={{
                marginTop: 15,
                marginLeft: -10
              }}
              key={index}
            >
              <ScheduleBox
                key={index}
                index={index}
                info={element}
                add={false}
                deleteBox={index => delBox(index)}
              />
            </div>
          ))}
          <div
            style={{
              marginTop: 15,
              marginLeft: -10
            }}
          >
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
