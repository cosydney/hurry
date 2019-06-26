import React, { Component } from "react";

import { Card, Icon, Input, Select, Spin, message } from "antd";
import { connect } from "react-redux";
import { editBox } from "./action";

const { Option } = Select;
const { TextArea } = Input;

class ScheduleBox extends Component {
  state = {
    number: 0,
    type: "hour",
    before: "before",
    text: ""
  };

  componentDidMount = () => {
    this.setState(this.props.info)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.info !== this.props.info) {
      this.setState(this.props.info);
    }
  }

  hitToaster() {
    const { number, type, before } = this.state
    if (before === 'before') {
      message.success(`Your message will be scheduled ${number} ${type}${number > 1 ? 's' : ''} ${before} your event`)
    } else if (before === 'after') {
      message.success(`Your message will be scheduled ${number} ${type}${number > 1 ? 's' : ''} ${before} the beginning of your event`)
    }
  }


  onValueChange = value => {
    this.setState({ number: value }, 
      () => this.props.editBox(this.props.index, this.state)
    );
    this.hitToaster()
  };

  onBeforeChange = value => {
    this.setState({ before: value }, 
      () => this.props.editBox(this.props.index, this.state)
    );
    this.hitToaster()
  };

  onTimeChange = value => {
    this.setState({ type: value }, 
      () => this.props.editBox(this.props.index, this.state)
    );
    this.hitToaster()
  };

  onTextChange = e => {
    this.setState({ text: e.target.value }, 
      () => this.props.editBox(this.props.index, this.state)
    );
  };
  render() {
    const { add, addBox, deleteBox, index } = this.props;
    let addS = this.state.number > 1 ? true : false;
    return (
      <Spin
        spinning={add}
        tip={"New scheduled SMS message"}
        size="large"
        style={{ color: "grey" }}
        indicator={
          <Icon
            style={{ fontSize: "36px" }}
            type="plus-circle"
            theme="twoTone"
            onClick={() => addBox()}
          />
        }
      >
        <Card
          style={{
            width: 300,
            borderRadius: 10,
            marginLeft: 15,
            marginRight: 15
          }}
          cover={
            <div id={"schedule-top"}>
              <Select
                showSearch
                style={{
                  fontSize: 12,
                  width: 80,
                  color: "white"
                }}
                defaultValue={10}
                optionFilterProp="children"
                onChange={this.onValueChange}
                value={this.state.number}
              >
                {[...Array(60).keys()].map(element => (
                  <Option key={element} value={element}>
                    {element}
                  </Option>
                ))}
              </Select>
              <Select
                showSearch
                style={{
                  fontSize: 12,
                  width: 105,
                  color: "white"
                }}
                defaultValue={"hour"}
                optionFilterProp="children"
                onChange={this.onTimeChange}
                value={this.state.type}
              >
                <Option value={"minute"}>{addS ? 'minutes' : 'minute'}</Option>
                <Option value={"hour"}>{addS ? 'hours' : 'hour'}</Option>
                <Option value={"day"}>{addS ? 'days' : 'day'}</Option>
              </Select>
              <Select
                showSearch
                style={{
                  fontSize: 12,
                  width: 100,
                  color: "white"
                }}
                defaultValue={"before"}
                optionFilterProp="children"
                onChange={this.onBeforeChange}
                value={this.state.before}
              >
                <Option value={"before"}>{"before"}</Option>
                <Option value={"after"}>{"after"}</Option>
              </Select>
              <Icon
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.29)",
                  color: "white",
                  padding: 8,
                  fontSize: 10,
                  borderRadius: 40,
                  marginRight: 6,
                  marginLeft: 20,
                }}
                type="close"
                onClick={() => deleteBox(index)}
              />
            </div>
          }
        >
          <TextArea
            onChange={value => this.onTextChange(value)}
            value={this.state.text}
            rows={5}
            style={{ border: "none", resize: "none" }}
            onBlur={() => this.hitToaster()}
          />
          <p className={"chars-count"}>{this.state.text.length} characters • {Math.ceil(this.state.text.length / 160)} text message</p>
        </Card>
      </Spin>
    );
  }
}

const mapStateToProps = ({ schedule }) => ({
  scheduled_sms: schedule.scheduled_sms
});

const mapDispatchToProps = dispatch => {
  return {
    editBox: (index, info) => dispatch(editBox(index, info))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleBox);
