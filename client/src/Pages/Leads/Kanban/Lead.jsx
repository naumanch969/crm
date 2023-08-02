import React from 'react';
import { Alarm, Archive, LinkOff, LinkOutlined, Message, Person } from '@mui/icons-material';
import { Avatar, Link, Tooltip } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { person1 } from '../../../assets';
import { Check2Square } from 'react-bootstrap-icons';

const Lead = ({ lead, index }) => {
  return (
    <Draggable draggableId={lead._id} key={lead._id} index={index}  >
      {(provided, snapshot) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className={` flex flex-col gap-[8px] bg-white rounded-[4px] p-[6px] ${snapshot.isDragging ? 'opacity-[80] ' : ' '}  `}
        >

          <div className="flex flex-col gap-[6px] ">
            <h4 className='text-[13px] text-primary-gray ' >{lead.title}</h4>
            <span className='w-fit text-[10px] text-primary-gray bg-secondary-gray px-[6px] py-[2px] rounded-[2px] '>{lead.contact}</span>
            <span className='w-fit text-[10px] text-primary-blue bg-secondary-blue px-[6px] py-[2px] rounded-[2px] ' >{lead.value}</span>
            <div className="text-[11px] flex flex-col gap-[4px] ">
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Telephone:</span>
                <span className='text-gray-400 ' >{lead.telephone || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Created:</span>
                <span className='text-gray-400 ' >{lead.created || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Contacted:</span>
                <span className='text-gray-400 ' >{lead.contacted || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Email:</span>
                <span className='text-gray-400 ' >{lead.email || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Content Type:</span>
                <span className='text-gray-400 ' >{lead.contentType || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Target Date:</span>
                <span className='text-gray-400 ' >{lead.targetDate || '---'}</span>
              </div>
            </div>
          </div>

          {/* alert */}
          <div className="flex flex-col gap-[4px] bg-red-100 p-[10px] rounded-[8px] ">
            <div className="flex justify-start items-center gap-[12px] ">
              <div className="h-full flex items-start ">
                <Alarm className='text-red-700 ' />
              </div>
              <div className="flex flex-col text-red-700">
                <span className='text-[14px] font-[400] ' >{lead.alarm.time}</span>
                <span className='text-[12px] font-light ' >{lead.alarm.date}</span>
              </div>
            </div>
            <button className='text-red-700 bg-red-200 text-[11px] py-[4px] w-full rounded-[2px] ' >{lead.alarm.CTA}</button>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex justify-start items-center gap-[8px] ">
              <Tooltip placement='top' title='You created this lead' >
                <Person style={{ fontSize: '18px' }} className='cursor-pointer rounded-full p-[2px] bg-blue-500 text-white ' />
              </Tooltip>
              <Tooltip placement='top' title='Archived' >
                <Archive style={{ fontSize: '18px' }} className='cursor-pointer rounded-full ' />
              </Tooltip>
              <Tooltip placement='top' title='URL' >
                <LinkOutlined style={{ fontSize: '18px' }} className='cursor-pointer rounded-full ' />
              </Tooltip>
              <Tooltip placement='top' title='Message' >
                <Message style={{ fontSize: '18px' }} className='cursor-pointer rounded-full ' />
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

export default Lead;
