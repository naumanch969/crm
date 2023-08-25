import React, { useState } from 'react';
import Board from './Board';
import { DragDropContext } from 'react-beautiful-dnd';

const Kanban = ({ tasks, setTasks }) => {

  /////////////////////////////////////// STATE ////////////////////////////////////////
  const [newTasks, setNewTasks] = useState([...tasks.filter(task => task.type == 'new')])
  const [qualified, setQualified] = useState([...tasks.filter(task => task.type == 'qualified')])
  const [disqualified, setDisqualified] = useState([...tasks.filter(task => task.type == 'disqualified')])
  const [contacted, setContacted] = useState([...tasks.filter(task => task.type == 'contacted')])
  const [proposalSent, setProposalSent] = useState([...tasks.filter(task => task.type == 'proposalSent')])
  const [converted, setConverted] = useState([...tasks.filter(task => task.type == 'converted')])

  /////////////////////////////////////// USE EFFECT /////////////////////////////////////


  /////////////////////////////////////// FUNCTION ///////////////////////////////////////
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Determine the source and destination columns
    const sourceColumn = getSourceColumn(result.source.droppableId);
    const destinationColumn = getSourceColumn(result.destination.droppableId);

    // Move the dragged task from the source to the destination column
    const draggedTask = sourceColumn.tasks[result.source.index];
    sourceColumn.tasks.splice(result.source.index, 1);
    destinationColumn.tasks.splice(result.destination.index, 0, draggedTask);

    // Change the type of dragged task
    draggedTask.type = destinationColumn.title

    // dispatch a function to change the type in the database

    setTasks([...tasks])
  };

  const getSourceColumn = (droppableId) => {
    switch (droppableId) {
      case '1':
        return { tasks: newTasks, title: 'new' };
      case '2':
        return { tasks: qualified, title: 'qualified' };
      case '3':
        return { tasks: disqualified, title: 'disqualified' };
      case '4':
        return { tasks: contacted, title: 'contacted' };
      case '5':
        return { tasks: converted, title: 'converted' };
      case '6':
        return { tasks: proposalSent, title: 'proposalSent' };
      default:
        return newTasks;
    }
  };

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-start gap-[1rem] w-[61rem] min-h-[30rem] h-fit pb-[1rem] overflow-x-scroll ">
          <Board tasks={newTasks} title='New' _id='1' />
          <Board tasks={qualified} title='Qualified' _id='2' />
          <Board tasks={disqualified} title='Disqualified' _id='3' />
          <Board tasks={contacted} title='Contacted' _id='4' />
          <Board tasks={converted} title='Converted' _id='5' />
          <Board tasks={proposalSent} title='Proposal' _id='6' />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Kanban;

