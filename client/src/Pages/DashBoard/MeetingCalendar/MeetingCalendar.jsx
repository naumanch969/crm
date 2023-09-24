import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";

const localizer = momentLocalizer(moment);

const MeetingCalendar = () => {

  const events = [
    {
      title: 'Have an important task',
      start: "2023-09-24T12:30:00",
      end: "2023-09-24T13:30:00",
    },
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MeetingCalendar;
