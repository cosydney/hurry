import React, { Component } from "react";
import ScheduleBox from "./ScheduleBox";
import { connect } from "react-redux";
import { addScheduleBox, deleteScheduleBox } from "./action";
import { Icon, Button, Tag } from "antd";

class Schedule extends Component {
  render() {
    const { addBox, scheduled_sms, delBox } = this.props;
    return (
      <div style={{ height: "auto" }}>
        <h1 className="sections">
          <Icon type="calendar" theme="filled" className="icon-section" />{" "}
          Schedule your messages
        </h1>
        <Tag color="blue" className="tag-info">
          {" "}
          <Icon type="info-circle" theme="filled" style={{ marginRight: 8 }} />
            insert variables to include attendees informations. <br />
            <span style={{marginLeft: 20}}>Ex: {"{FullName}"} = Rosalia Marquez</span>
        </Tag>
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
            <div
              style={{
                backgroundColor: "#F4F5F6",
                height: 226,
                width: 340,
                borderRadius: 10,
                marginLeft: 15,
                marginRight: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                type={"dashed"}
                style={{ color: "#9197A7", backgroundColor: "lightgrey" }}
                onClick={() => addBox()}
                icon="plus"
              >
                New Message
              </Button>
            </div>
            {/* <ScheduleBox add={true} addBox={() => addBox()} /> */}
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
