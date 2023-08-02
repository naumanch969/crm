import React, { useState } from 'react';
import Board from './Board';
import { DragDropContext } from 'react-beautiful-dnd';

const Kanban = ({ leads, setLeads }) => {

  /////////////////////////////////////// STATE ////////////////////////////////////////
  const [newLeads, setNewLeads] = useState([...leads.filter(lead => lead.type == 'new')])
  const [qualified, setQualified] = useState([...leads.filter(lead => lead.type == 'qualified')])
  const [disqualified, setDisqualified] = useState([...leads.filter(lead => lead.type == 'disqualified')])
  const [contacted, setContacted] = useState([...leads.filter(lead => lead.type == 'contacted')])
  const [proposalSent, setProposalSent] = useState([...leads.filter(lead => lead.type == 'proposalSent')])
  const [converted, setConverted] = useState([...leads.filter(lead => lead.type == 'converted')])

  /////////////////////////////////////// USE EFFECT /////////////////////////////////////


  /////////////////////////////////////// FUNCTION ///////////////////////////////////////
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Determine the source and destination columns
    const sourceColumn = getSourceColumn(result.source.droppableId);
    const destinationColumn = getSourceColumn(result.destination.droppableId);

    // Move the dragged lead from the source to the destination column
    const draggedLead = sourceColumn.leads[result.source.index];
    sourceColumn.leads.splice(result.source.index, 1);
    destinationColumn.leads.splice(result.destination.index, 0, draggedLead);

    // Change the type of dragged lead
    draggedLead.type = destinationColumn.title

    // dispatch a function to change the type in the database

    setLeads([...leads])
  };

  const getSourceColumn = (droppableId) => {
    switch (droppableId) {
      case '1':
        return { leads: newLeads, title: 'new' };
      case '2':
        return { leads: qualified, title: 'qualified' };
      case '3':
        return { leads: disqualified, title: 'disqualified' };
      case '4':
        return { leads: contacted, title: 'contacted' };
      case '5':
        return { leads: converted, title: 'converted' };
      case '6':
        return { leads: proposalSent, title: 'proposalSent' };
      default:
        return newLeads;
    }
  };

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-start gap-[1rem] w-[61rem] min-h-[30rem] h-fit pb-[1rem] overflow-x-scroll ">
          <Board leads={newLeads} title='New' _id='1' />
          <Board leads={qualified} title='Qualified' _id='2' />
          <Board leads={disqualified} title='Disqualified' _id='3' />
          <Board leads={contacted} title='Contacted' _id='4' />
          <Board leads={converted} title='Converted' _id='5' />
          <Board leads={proposalSent} title='Proposal' _id='6' />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Kanban;

