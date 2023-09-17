import React from 'react';
import { Alarm, Archive, LinkOff, LinkOutlined, Message, Person } from '@mui/icons-material';
import { Avatar, Link, Tooltip } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { person1 } from '../../../../assets';
import { Check2Square } from 'react-bootstrap-icons';
import { updateInventory } from '../../../../redux/action/inventory'
import { format } from 'timeago.js'
import { rootURL } from '../../../../constant';
import { useDispatch } from 'react-redux';

const KanbanInventory = ({ inventory, index, }) => {

  const dispatch = useDispatch()

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${rootURL}/inventory/${inventory?._id}`);
  }
  const handleArchive = () => {
    dispatch(updateInventory(inventory._id, { isArchived: true }, { loading: false }))
  }
  const handleUnArchive = () => {
    dispatch(updateInventory(inventory._id, { isArchived: false }, { loading: false }))
  }

  return (
    <Draggable draggableId={inventory?._id} key={inventory?._id} index={index}  >
      {(provided, snapshot) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className={` flex flex-col gap-[8px] bg-white rounded-[4px] p-[6px] ${snapshot.isDragging ? 'opacity-[80] ' : ' '}  `}
        >

          <div className="flex flex-col gap-[6px] ">
            <h4 className='text-[13px] text-primary-gray ' >{inventory?.project?.title}</h4>
            <span className='w-fit text-[10px] text-primary-gray bg-secondary-gray px-[6px] py-[2px] rounded-[2px] '>{inventory?.price}</span>
            <div className="text-[11px] flex flex-col gap-[4px] ">
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Seller Name:</span>
                <span className='text-gray-400 ' >{inventory?.sellerName || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Seller Email:</span>
                <span className='text-gray-400 ' >{inventory?.sellerEmail || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Seller Phone:</span>
                <span className='text-gray-400 ' >{inventory?.sellerPhone || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Seller Company:</span>
                <span className='text-gray-400 ' >{inventory?.sellerCompany || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Seller City:</span>
                <span className='text-gray-400 ' >{inventory?.sellerCity || '---'}</span>
              </div>
              <div className="flex justify-start items-center gap-[8px]  ">
                <span className='text-primary-gray ' >Created:</span>
                <span className='text-gray-400 ' >{format(inventory?.createdAt) || '---'}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex justify-start items-center gap-[8px] ">
              <Tooltip placement='top' title={inventory?.isArchived ? 'Un Archive' : 'Archive'} >
                <Archive onClick={() => inventory.isArchived ? handleUnArchive() : handleArchive()} style={{ fontSize: '18px' }} className='cursor-pointer rounded-full ' />
              </Tooltip>
              <Tooltip placement='top' title='URL' >
                <LinkOutlined onClick={handleCopyLink} style={{ fontSize: '18px' }} className='cursor-pointer rounded-full ' />
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

export default KanbanInventory;
