import React from 'react';
import PropTypes from "prop-types";

import Button from 'antd/lib/button';
import Checkbox from "antd/lib/checkbox";
import Icon from 'antd/lib/icon';

const ContactListHeader = ({ selectedEvent, attendees, resetState, importList, ToggleAttendees }) => (
  <div>
    <div>
      <h5 style={{ margin: 10, marginBottom: 30 }}>
        Attendees for {selectedEvent}
      </h5>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={() => resetState()}
          icon={'arrow-left'}
        />
        <Button
          onClick={() => importList()}
          type={'primary'}
        >
          <Icon
            type={'import'}
            rotate={180}
          />
          {`Select ${attendees.filter(({ checked }) => checked).length} attendees`}
        </Button>
      </div>
        <Checkbox
          style={{ marginTop: 12 }}
          type="checkbox"
          className="checkbox"
          defaultChecked
          onChange={() => ToggleAttendees()}
        />
    </div>
  </div>
  );

ContactListHeader.propTypes = {
  ToggleAttendees: PropTypes.func.isRequired,
  attendees: PropTypes.array.isRequired,
  importList: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  selectedEvent: PropTypes.string.isRequired,
};

export default ContactListHeader;
