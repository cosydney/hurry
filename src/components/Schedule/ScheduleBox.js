import React, { Component } from "react";

import { Card, Icon, Input, Select, Spin, message } from "antd";
import { connect } from "react-redux";
import { editBox } from "./action";

const { Option } = Select;
const { TextArea } = Input;

function getInputSelection(el) {
  var start = 0, end = 0, normalizedValue, range,
      textInputRange, len, endRange;

  if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
      start = el.selectionStart;
      end = el.selectionEnd;
  } else {
      range = document.selection.createRange();

      if (range && range.parentElement() == el) {
          len = el.value.length;
          normalizedValue = el.value.replace(/\r\n/g, "\n");

          // Create a working TextRange that lives only in the input
          textInputRange = el.createTextRange();
          textInputRange.moveToBookmark(range.getBookmark());

          // Check if the start and end of the selection are at the very end
          // of the input, since moveStart/moveEnd doesn't return what we want
          // in those cases
          endRange = el.createTextRange();
          endRange.collapse(false);

          if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
              start = end = len;
          } else {
              start = -textInputRange.moveStart("character", -len);
              start += normalizedValue.slice(0, start).split("\n").length - 1;

              if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                  end = len;
              } else {
                  end = -textInputRange.moveEnd("character", -len);
                  end += normalizedValue.slice(0, end).split("\n").length - 1;
              }
          }
      }
  }

  return {
      start: start,
      end: end
  };
}

class ScheduleBox extends Component {
  constructor(props) {
    super(props);
    this.textAreaRef = React.createRef();
  }

  state = {
    number: 0,
    type: "hour",
    before: "before",
    text: ""
  };

  componentDidMount = () => {
    this.setState(this.props.info);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.info !== this.props.info) {
      this.setState(this.props.info);
    }
  }

  hitToaster() {
    const { number, type, before, text } = this.state;
    if (text === "") {
      message.warning("Empty messages won't be sent");
    } else if (before === "before") {
      message.success(
        `Your message "${text.substring(
          0,
          10
        )}..." will be scheduled ${number} ${type}${
          number > 1 ? "s" : ""
        } ${before} your event`
      );
    } else if (before === "after") {
      message.success(
        `Your message "${text.substring(
          0,
          10
        )}..." will be scheduled ${number} ${type}${
          number > 1 ? "s" : ""
        } ${before} the beginning of your event`
      );
    }
  }

  onValueChange = value => {
    this.setState(
      { number: value },
      () => this.props.editBox(this.props.index, this.state),
      this.hitToaster()
    );
  };

  onBeforeChange = value => {
    this.setState(
      { before: value },
      () => this.props.editBox(this.props.index, this.state),
      this.hitToaster()
    );
  };

  onTimeChange = value => {
    this.setState(
      { type: value },
      () => this.props.editBox(this.props.index, this.state),
      this.hitToaster()
    );
  };

  insertVariable = value => {
    let { text } = this.state;
    let textToInsert = `{${value}}`    
    var input = document.getElementById("texto");

    let { start } = getInputSelection(input);
    if (text && start === 0) {
      start = text.length
    }
    let cursorPosition = start
    let textBeforeCursorPosition = text.substring(0, cursorPosition)
    let textAfterCursorPosition = text.substring(cursorPosition, text.length)
    text = textBeforeCursorPosition + textToInsert + textAfterCursorPosition
    this.setState({ text })
    setTimeout(() => this.hitToaster(), 300);
  };

  onTextChange = e => {
    this.setState({ text: e.target.value }, () =>
      this.props.editBox(this.props.index, this.state)
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
            width: 340,
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
                  marginLeft: 5,
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
                style={{
                  fontSize: 12,
                  width: 85,
                  color: "white"
                }}
                defaultValue={"hour"}
                optionFilterProp="children"
                onChange={this.onTimeChange}
                value={this.state.type}
              >
                <Option value={"minute"}>{addS ? "minutes" : "minute"}</Option>
                <Option value={"hour"}>{addS ? "hours" : "hour"}</Option>
                <Option value={"day"}>{addS ? "days" : "day"}</Option>
              </Select>
              <Select
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
              <Select
                id={"insert"}
                style={{
                  fontSize: 12,
                  width: 110,
                  color: "#0664FE",
                  marginLeft: 10,
                  marginRight: 5
                }}
                defaultValue={"Insert"}
                optionFilterProp="children"
                onChange={this.insertVariable}
                value={"Insert"}
              >
                <Option style={{ fontSize: 11 }} value={"FirstName"}>
                  {"FirstName"}
                </Option>
                <Option style={{ fontSize: 11 }} value={"LastName"}>
                  {"LastName"}
                </Option>
                <Option style={{ fontSize: 11 }} value={"FullName"}>
                  {"FullName"}
                </Option>
                <Option style={{ fontSize: 11 }} value={"Email"}>
                  {"Email"}
                </Option>
                <Option style={{ fontSize: 11 }} value={"TicketLink"}>
                  {"TicketLink"}
                </Option>
              </Select>
            </div>
          }
        >
          <TextArea
            id='texto'
            ref={this.textAreaRef} 
            onChange={e => this.onTextChange(e)}
            value={this.state.text}
            rows={5}
            style={{ border: "none", resize: "none" }}
            onBlur={() => this.hitToaster()}
          />
          <div className={"box-chars"}>
            <p className={"chars-count"}>
              <Icon type="font-size" size='small' style={{marginRight: 0}} />{" "}
              {this.state.text.length} /{" "}
              {160 * Math.ceil(this.state.text.length / 160)}{" "}
              <Icon type="message" size="small" style={{marginLeft: 30}} />{" "}
              {Math.ceil(this.state.text.length / 160)} SMS
            </p>
            <Icon
              style={{
                // backgroundColor: "rgba(255, 255, 255, 0.29)",
                color: "red",
                padding: 6,
                fontSize: 13,
                borderRadius: 40,
                marginRight: 6,
                marginLeft: 20,
                borderColor: "red",
                borderStyle: "solid",
                borderWidth: 1
              }}
              type="delete"
              onClick={() => deleteBox(index)}
            />
          </div>
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
