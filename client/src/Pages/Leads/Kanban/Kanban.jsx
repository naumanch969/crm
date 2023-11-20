import React, { useEffect, useState } from "react";
import Board from "./Board";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateLead } from "../../../redux/action/lead";
import { CircularProgress } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

const Kanban = ({ options, setOptions }) => {
  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch();
  const { leads, isFetching } = useSelector((state) => state.lead);
  const archivedLeads = leads.filter(lead => lead.isArchived)
  const unarchivedLeads = leads.filter(lead => !lead.isArchived)
  let initialFilteredLeadsState = {
    closedLost: [],
    followedUpCall: [],
    contactedCallAttempt: [],
    contactedCall: [],
    followedUpEmail: [],
    contactedEmail: [],
    new: [],
    meetingDone: [],
    closedWon: [],
    meetingAttempt: [],
  };

  const statuses = [
    'closedLost',
    'followedUpCall',
    'contactedCallAttempt',
    'contactedCall',
    'followedUpEmail',
    'contactedEmail',
    'new',
    'meetingDone',
    'closedWon',
    'meetingAttempt',
  ]
  /////////////////////////////////////// STATE ////////////////////////////////////////
  let [filteredLeads, setFilteredLeads] = useState(initialFilteredLeadsState);
  const { closedLost, followedUpCall, contactedCallAttempt, contactedCall, followedUpEmail, contactedEmail, new: newLeads, meetingDone, closedWon, meetingAttempt, } = filteredLeads;

  /////////////////////////////////////// USE EFFECT /////////////////////////////////////
  useEffect(() => {
    statuses.forEach(
      (status) =>
      (filteredLeads[status] = (options.showArchivedLeads ? archivedLeads : unarchivedLeads).filter(
        (lead) => lead.status == status
      ))
    );
    setFilteredLeads({ ...filteredLeads });
  }, [unarchivedLeads, archivedLeads]);

  /////////////////////////////////////// FUNCTION ///////////////////////////////////////
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Determine the source and destination columns
    const sourceColumn = getSourceColumn(result.source.droppableId);
    const destinationColumn = getSourceColumn(result.destination.droppableId);

    // Move the dragged lead from the source to the destination column
    const draggedLead = sourceColumn.leads[result.source.index];
    filteredLeads[sourceColumn.title].splice(result.source.index, 1);
    filteredLeads[destinationColumn.title].splice(result.destination.index, 0, draggedLead);
    setFilteredLeads({ ...filteredLeads });

    // upating lead status in backend/database
    dispatch(updateLead(draggedLead._id, { status: destinationColumn.title }));
  };

  const getSourceColumn = (droppableId) => {
    switch (droppableId) {
      case "1":
        return { leads: closedLost, title: "closedLost" };
      case "2":
        return { leads: followedUpCall, title: "followedUpCall" };
      case "3":
        return { leads: contactedCallAttempt, title: "contactedCallAttempt" };
      case "4":
        return { leads: contactedCall, title: "contactedCall" };
      case "5":
        return { leads: followedUpEmail, title: "followedUpEmail" };
      case "6":
        return { leads: contactedEmail, title: "contactedEmail" };
      case "7":
        return { leads: newLeads, title: "new" };
      case "8":
        return { leads: meetingDone, title: "meetingDone" };
      case "9":
        return { leads: closedWon, title: "closedWon" };
      case "10":
        return { leads: meetingAttempt, title: "meetingAttempt" };
      default:
        return newLeads;
    }
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col gap-[2rem]  ">
      {isFetching ? (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="gray"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex justify-start gap-[1rem] w-full min-h-[30rem] h-fit pb-[1rem] overflow-x-scroll capitalize">
            <Board leads={closedLost} title='closed Lost' _id='1' />
            <Board leads={followedUpCall} title="followed Up Call" _id="2" />
            <Board leads={contactedCallAttempt} title="contacted Call Attempt" _id="3" />
            <Board leads={contactedCall} title="contacted Call" _id="4" />
            <Board leads={followedUpEmail} title="followed Up Email" _id="5" />
            <Board leads={contactedEmail} title="contacted Email" _id="6" />
            <Board leads={newLeads} title="new" _id="7" />
            <Board leads={meetingDone} title="meeting Done" _id="8" />
            <Board leads={closedWon} title="closed Won" _id="9" />
            <Board leads={meetingAttempt} title="meeting Attempt" _id="10" />
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default Kanban;