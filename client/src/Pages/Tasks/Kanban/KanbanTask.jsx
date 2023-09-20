import React from 'react';
import { Alarm, Archive, LinkOff, LinkOutlined, Message, Person } from '@mui/icons-material';
import { Avatar, Link, Tooltip } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { person1 } from '../../../assets';
import { Check2Square } from 'react-bootstrap-icons';
import { updateTask } from '../../../redux/action/task'
import { format } from 'timeago.js'
import { rootURL } from '../../../constant';
import { useDispatch } from 'react-redux';


const Task = ({ task, index, }) => {

  const dispatch = useDispatch()

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${rootURL}/tasks/${task?._id}`);
  }
  const handleArchive = () => {
    dispatch(updateTask(task._id, { isArchived: true }, { loading: false }))
  }
  const handleUnArchive = () => {
    dispatch(updateTask(task._id, { isArchived: false }, { loading: false }))
  }

  return (
    <Draggable draggableId={task?._id} key={task?._id} index={index}  >
      {(provided, snapshot) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className={` flex flex-col gap-[8px] bg-white rounded-[4px] p-[6px] ${snapshot.isDragging ? 'opacity-[80] ' : ' '}  `}
        >

          <div className="flex flex-col gap-[6px] ">
            <h4 className='text-[13px] text-primary-gray ' >{task?.title}</h4>
            <span className='w-fit text-[10px] text-primary-gray bg-secondary-gray px-[6px] py-[2px] rounded-[2px] '>{task?.status}</span>
            <span className='w-fit text-[10px] text-primary-blue bg-secondary-blue px-[6px] py-[2px] rounded-[2px] ' >{task?.priority}</span>
            <div className="text-[11px] flex flex-col gap-[4px] ">
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Description:</span>
                <span className='text-gray-400 ' >{task?.description || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Created By:</span>
                <span className='text-gray-400 ' >{task?.userId?.email || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Created At:</span>
                <span className='text-gray-400 ' >{format(task?.createdAt) || '---'}</span>
              </div>

              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Due Date:</span>
                <span className='text-gray-400 ' >{task?.dueDate || '---'}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex justify-start items-center gap-[8px] ">
              <Tooltip placement='top' title='You created this task' >
                <Person style={{ fontSize: '18px' }} className='cursor-pointer rounded-full p-[2px] bg-blue-500 text-white ' />
              </Tooltip>
              <Tooltip placement='top' title={task?.isArchived ? 'Un Archive' : 'Archive'} >
                <Archive onClick={() => task.isArchived ? handleUnArchive() : handleArchive()} style={{ fontSize: '18px' }} className='cursor-pointer rounded-full ' />
              </Tooltip>
              <Tooltip placement='top' title='URL' >
                <LinkOutlined onClick={handleCopyLink} style={{ fontSize: '18px' }} className='cursor-pointer rounded-full ' />
              </Tooltip>
              <Tooltip placement='top' title='Check' >
                <Check2Square style={{ fontSize: '18px' }} className='cursor-pointer rounded-full ' />
              </Tooltip>
            </div>

            <div className="">
              <Avatar src={person1} style={{ width: '2rem', height: '2rem' }} className=' ' />
            </div>
          </div>

          {provided.placeholder}

        </div>
      )}
    </Draggable>
  );
};

export default Task;
