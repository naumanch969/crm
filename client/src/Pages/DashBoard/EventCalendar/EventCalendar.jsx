import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";
import View from "./View";
import Create from "./Create";
import Update from "./Update";
import Delete from "./Delete";
import { getEvents,getEmployeeEvents } from "../../../redux/action/event";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const localizer = momentLocalizer(moment);



const EventCalendar = () => {

  const dispatch = useDispatch()
  const { events } = useSelector(state => state.event)
  const { loggedUser } = useSelector(state => state.user)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  useEffect(() => {
    loggedUser.role == 'employee'
      ?
      dispatch(getEmployeeEvents())
      :
      dispatch(getEvents())
  }, [])
  useEffect(() => {
  }, [event, showViewModal])

  const handleShowViewModal = (event) => {
    setSelectedEvent(event)
    setShowViewModal(true)
  }


  return (
    <div>

      <View
        open={showViewModal}
        setOpen={setShowViewModal}
        event={selectedEvent}
        setOpenUpdateModal={setShowUpdateModal}
        setOpenDeleteModal={setShowDeleteModal}
      />
      <Update
        open={showUpdateModal}
        setOpen={setShowUpdateModal}
        event={selectedEvent}
      />
      <Create
        open={showCreateModal}
        setOpen={setShowCreateModal}
      />
      <Delete
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        eventId={selectedEvent?._id}
      />

      <Tooltip title="Add New Event To Calendar" placement="top" arrow>
        <button
          onClick={() => setShowCreateModal(true)}
          className="absolute bottom-4 right-4 bg-red-500 text-white rounded-full p-[1rem] shadow-xl z-[50000] cursor-pointer "
        >
          <Add style={{}} />
        </button>
      </Tooltip>


      <Calendar
        localizer={localizer}
        // startAccessor="start"
        // endAccessor="end"
        events={events}
        onDoubleClickEvent={(event) => handleShowViewModal(event)}
        // view="month" // agenda, day, month, week, work_week
        // defaultView="month" // agenda, day, month, week, work_week
        views={["month", "day", "week"]} // agenda, day, month, week
        style={{ height: 500 }}
      />
    </div>
  );
};

export default EventCalendar;
