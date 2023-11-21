import React, { useEffect, useState } from 'react';
import Board from './Board';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, } from '../../../redux/action/task';
import { Loader } from '../../../utils';
import { ThreeDots } from 'react-loader-spinner';

const Kanban = ({ options, setOptions }) => {

  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch()
  const { tasks, isFetching } = useSelector(state => state.task)
  const archivedTasks = tasks.filter(task => task.isArchived)
  const unarchivedTasks = tasks.filter(task => !task.isArchived)
  let initialFilteredTasksState = { completed: [], new: [], inProgress: [], overDue: [] }
  const statusEnum = ['completed', 'inProgress', 'new', 'overDue'];

  /////////////////////////////////////// STATE ////////////////////////////////////////
  let [filteredTasks, setFilteredTasks] = useState(initialFilteredTasksState)
  const { new: newTasks, inProgress, completed, overDue } = filteredTasks

  /////////////////////////////////////// USE EFFECT /////////////////////////////////////
  useEffect(() => {
    statusEnum.forEach(status =>
      filteredTasks[status] = (options.showArchivedTasks ? archivedTasks : unarchivedTasks)
        .filter(task => (task.status == status))
    );
    setFilteredTasks({ ...filteredTasks })
  }, [unarchivedTasks, archivedTasks])

  /////////////////////////////////////// FUNCTION ///////////////////////////////////////
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Determine the source and destination columns
    const sourceColumn = getSourceColumn(result.source.droppableId);
    const destinationColumn = getSourceColumn(result.destination.droppableId);

    // Move the dragged task from the source to the destination column
    const draggedTask = sourceColumn.unarchivedTasks[result.source.index];
    filteredTasks[sourceColumn.title].splice(result.source.index, 1);
    filteredTasks[destinationColumn.title].splice(result.destination.index, 0, draggedTask);
    setFilteredTasks({ ...filteredTasks })

    // upating task status in backend/database
    dispatch(updateTask(draggedTask._id, { status: destinationColumn.title }))

  };

  const getSourceColumn = (droppableId) => {
    switch (droppableId) {
      case '1':
        return { unarchivedTasks: newTasks, title: 'new' };
      case '2':
        return { unarchivedTasks: inProgress, title: 'inProgress' };
      case '3':
        return { unarchivedTasks: completed, title: 'successful' };
      case '4':
        return { unarchivedTasks: overDue, title: 'overDue' };
      default:
        return newTasks;
    }
  };

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]  ' >
      {
        isFetching
          ?
          <div className="w-full h-[11rem] flex justify-center items-center ">
            <Loader />
          </div>
          :
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex justify-start gap-[1rem] w-full min-h-[30rem] h-fit pb-[1rem] overflow-x-scroll ">
              <Board unarchivedTasks={newTasks} title='New' _id='1' />
              <Board unarchivedTasks={inProgress} title='In Progress' _id='2' />
              <Board unarchivedTasks={completed} title='Completed' _id='3' />
              <Board unarchivedTasks={overDue} title='Over Due' _id='4' />
            </div>
          </DragDropContext>
      }
    </div>
  );
}

export default Kanban;

