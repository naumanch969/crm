import React from 'react';
import Lead from './Lead';
import { Add } from '@mui/icons-material';
import { Droppable } from 'react-beautiful-dnd';

const Board = ({ leads, title, _id }) => {
  return (
    <div className=' bg-gray-200 rounded-[10px] min-w-[260px] -[270px] h-[700px] border-[1px] border-t-[3px] border-gray-600 '>

      <div className="flex justify-between items-center h-[32px] px-[4px] ">
        <h4 className='text-[16px] text-primary-gray ' >{title}</h4>
        <button className='w-[18px] h-[18px] rounded-full bg-primary-gray text-white flex justify-center items-center ' >
          <Add style={{ fontSize: '16px' }} />
        </button>
      </div>

      <div style={{ height: 'calc(100% - 32px)' }} className="leadBoard h-full overflow-y-scroll  ">
        <Droppable droppableId={_id} className='droppable' >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`relative flex-1 flex flex-col gap-[1rem] p-[12px] h-full ${snapshot.isDraggingOver ? 'bg-gray-300' : ''}`}
            >
              {leads.map((lead, index) => (
                <React.Fragment key={index} >
                  <Lead key={lead._id} lead={lead} index={index} />
                  {snapshot.draggingOverWith == lead._id && (
                    <div className='custom-placeholder'>
                      {provided.placeholder}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </Droppable>
      </div>

    </div>
  );
};

export default Board;
