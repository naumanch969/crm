import React from "react";
import KanbanLead from "./KanbanLead";
import { Add } from "@mui/icons-material";
import { Droppable } from "react-beautiful-dnd";

const Board = ({ leads, title, _id }) => {


  return (
    <div
      className={`bg-[#ebf2f5] border-t-[2px] 
      ${title == "Successful" ? "border-t-green-500" : ""}
      ${title == "Remaining" ? "border-t-sky-400" : ""} 
      ${title == "Declined" ? "border-t-red-400" : ""}
      ${title == "Under Process" ? "border-t-yellow-500" : ""} 
      ${title == "Unsuccessful" ? "border-t-orange-500" : ""}
       rounded-[10px] min-w-[260px] -[270px] h-[700px]`}
    >
      <div className="flex justify-between items-center h-[32px] px-[4px] ">
        <h4 className="text-[16px] text-primary-gray ">{title}</h4>
        <button className="w-[18px] h-[18px] rounded-full bg-primary-gray text-white flex justify-center items-center ">
          <Add style={{ fontSize: "16px" }} />
        </button>
      </div>

      <div style={{ height: "calc(100% - 32px)" }} className="leadBoard h-full overflow-y-scroll  ">
        <Droppable droppableId={_id} className="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`relative flex-1 flex flex-col gap-[1rem] p-[12px] h-full ${snapshot.isDraggingOver ? "bg-gray-300" : ""}`}
            >
              {leads.map((lead, index) => (
                <React.Fragment key={index}>
                  <KanbanLead key={lead._id} lead={lead} index={index} />
                  {snapshot.draggingOverWith == lead._id && (
                    <div className="custom-placeholder">{provided.placeholder}</div>
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
