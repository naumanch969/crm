import React, { useEffect, useState } from 'react';
import Board from './Board';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { updateLead, } from '../../../redux/action/lead';
import { CircularProgress } from '@mui/material';

const Kanban = ({ options, setOptions }) => {

  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch()
  const { archived, leads, isFetching } = useSelector(state => state.lead)
  let initialFilteredLeadsState = { successful: [], unsuccessful: [], underProcess: [], declined: [], remaining: [] }
  const statusEnum = ['successful', 'unsuccessful', 'underProcess', 'declined', 'remaining'];

  /////////////////////////////////////// STATE ////////////////////////////////////////
  let [filteredLeads, setFilteredLeads] = useState(initialFilteredLeadsState)
  const { successful, unsuccessful, underProcess, declined, remaining } = filteredLeads

  /////////////////////////////////////// USE EFFECT /////////////////////////////////////
  useEffect(() => {
    statusEnum.forEach(status =>
      filteredLeads[status] = (options.showArchivedLeads ? archived : leads)
        .filter(lead => (lead.status == status))
    );
    setFilteredLeads({ ...filteredLeads })
  }, [leads, archived])

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
    setFilteredLeads({ ...filteredLeads })

    // upating lead status in backend/database
    dispatch(updateLead(draggedLead._id, { status: destinationColumn.title }))

  };

  const getSourceColumn = (droppableId) => {
    switch (droppableId) {
      case '1':
        return { leads: newLeads, title: 'new' };
      case '2':
        return { leads: successful, title: 'successful' };
      case '3':
        return { leads: unsuccessful, title: 'unsuccessful' };
      case '4':
        return { leads: underProcess, title: 'underProcess' };
      case '5':
        return { leads: remaining, title: 'remaining' };
      case '6':
        return { leads: declined, title: 'declined' };
      default:
        return newLeads;
    }
  };

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >
      {
        isFetching
          ?
          <div className="flex justify-between items-center min-h-[20rem] w-full ">
            <CircularProgress />
          </div>
          :
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex justify-start gap-[1rem] w-[61rem] min-h-[30rem] h-fit pb-[1rem] overflow-x-scroll ">
              {/* <Board leads={newLeads} title='New' _id='1' /> */}
              <Board leads={successful} title='Successful' _id='2' />
              <Board leads={unsuccessful} title='Unsuccessful' _id='3' />
              <Board leads={underProcess} title='Under Process' _id='4' />
              <Board leads={remaining} title='Remaining' _id='5' />
              <Board leads={declined} title='Declined' _id='6' />
            </div>
          </DragDropContext>
      }
    </div>
  );
}

export default Kanban;

