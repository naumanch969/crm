import React, { useEffect, useState } from 'react';
import Board from './Board';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../../redux/action/task';
import { Loader } from '../../../utils';
import { ThreeDots } from 'react-loader-spinner';

const Kanban = ({ options, setOptions }) => {
  const dispatch = useDispatch();
  const { tasks, isFetching } = useSelector((state) => state.task);
  const archivedTasks = tasks.filter((task) => task.isArchived);
  const unarchivedTasks = tasks.filter((task) => !task.isArchived);

  // Initialize state using the function form to avoid unexpected behavior
  const [filteredTasks, setFilteredTasks] = useState(() => ({
    successful: [],
    unsuccessful: [],
  }));

  const { successful, unsuccessful } = filteredTasks;

  useEffect(() => {
    // Create a new object to store the updated filteredTasks
    const updatedFilteredTasks = {
      successful: options.showArchivedTasks
        ? archivedTasks.filter((task) => task.completedTaskStatus === 'successful')
        : unarchivedTasks.filter((task) => task.completedTaskStatus === 'successful'),
      unsuccessful: options.showArchivedTasks
        ? archivedTasks.filter((task) => task.completedTaskStatus === 'unsuccessful')
        : unarchivedTasks.filter((task) => task.completedTaskStatus === 'unsuccessful'),
    };
  
    // Update the state with the new object
    setFilteredTasks(updatedFilteredTasks);
  }, [options.showArchivedTasks]);
  

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceColumn = getSourceColumn(result.source.droppableId);
    const destinationColumn = getSourceColumn(result.destination.droppableId);

    const draggedTask = sourceColumn[result.source.index];
    const updatedSourceColumn = [...sourceColumn];
    const updatedDestinationColumn = [...destinationColumn];
    
    // Move the task from source to destination
    updatedSourceColumn.splice(result.source.index, 1);
    updatedDestinationColumn.splice(result.destination.index, 0, draggedTask);

    // Update the state with the new column data
    setFilteredTasks((prev) => ({
      ...prev,
      [sourceColumn.title]: updatedSourceColumn,
      [destinationColumn.title]: updatedDestinationColumn,
    }));

    // Update the task's completedTaskStatus in the backend/database
    dispatch(updateTask(draggedTask._id, { completedTaskStatus: destinationColumn.title }));
  };

  const getSourceColumn = (droppableId) => {
    switch (droppableId) {
      case '1':
        return { column: successful, title: 'successful' };
      case '2':
        return { column: unsuccessful, title: 'unsuccessful' };
      default:
        return { column: [], title: '' };
    }
  };

  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem]'>
      {isFetching ? (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex justify-start gap-[1rem] w-full min-h-[30rem] h-fit pb-[1rem] overflow-x-scroll">
            <Board tasks={successful} title='Successful' _id='1' />
            <Board tasks={unsuccessful} title='Unsuccessful' _id='2' />
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default Kanban;
