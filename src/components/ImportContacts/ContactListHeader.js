import React from 'react';
import PropTypes from "prop-types";

import Button from 'antd/lib/button';
import Checkbox from "antd/lib/checkbox";
import Icon from 'antd/lib/icon';

const ContactListHeader = ({ selectedEvent, attendees, resetState, importList, ToggleAttendees }) => (
  <div>
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Button
        onClick={() => resetState()}
        icon={'arrow-left'}
        style={{borderRadius: 40}}
      />
      <h2 style={{ color: '#232E50', margin: 10 }}>
        {selectedEvent}
      </h2>
      </div>
      <br></br>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Checkbox
          style={{ marginTop: 12 }}
          type="checkbox"
          className="checkbox"
          defaultChecked
          onChange={() => ToggleAttendees()}
        />
        <Button
          onClick={() => importList()}
          // type={'primary'}
        >
          <Icon
            type={'import'}
            rotate={180}
          />
          {`Select ${attendees.filter(({ checked }) => checked).length} attendees`}
        </Button>
      </div>
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
