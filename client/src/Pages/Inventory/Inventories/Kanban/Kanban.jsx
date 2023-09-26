import React, { useEffect, useState } from "react";
import Board from "./Board";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateInventory } from "../../../../redux/action/inventory";
import { Loader } from "../../../../utils";

const Kanban = ({ options, setOptions }) => {
  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch();
  const { inventories, isFetching } = useSelector((state) => state.inventory);
  const archivedInventories = inventories.filter(inventory => inventory.isArchived)
  const unarchivedInventories = inventories.filter(inventory => !inventory.isArchived)
  let initialFilteredInventoriesState = {
    sold: [],
    unsold: [],
    underProcess: [],
  };
  const statusEnum = ["sold", "unsold", "underProcess"];

  /////////////////////////////////////// STATE ////////////////////////////////////////
  let [filteredInventories, setFilteredInventories] = useState(initialFilteredInventoriesState);
  const { sold, unsold, underProcess } = filteredInventories;

  /////////////////////////////////////// USE EFFECT /////////////////////////////////////
  useEffect(() => {
    statusEnum.forEach(
      (status) =>
      (filteredInventories[status] = (options.showArchivedInventories ? archivedInventories : unarchivedInventories).filter(
        (inventory) => inventory.status == status
      ))
    );
    setFilteredInventories({ ...filteredInventories });
  }, []);

  /////////////////////////////////////// FUNCTION ///////////////////////////////////////
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Determine the source and destination columns
    const sourceColumn = getSourceColumn(result.source.droppableId);
    const destinationColumn = getSourceColumn(result.destination.droppableId);

    // Move the dragged inventory from the source to the destination column
    const draggedInventory = sourceColumn.inventories[result.source.index];
    filteredInventories[sourceColumn.title].splice(result.source.index, 1);
    filteredInventories[destinationColumn.title].splice(result.destination.index, 0, draggedInventory);
    setFilteredInventories({ ...filteredInventories });

    // upating inventory status in backend/database
    dispatch(updateInventory(draggedInventory._id, { status: destinationColumn.title }));
  };

  const getSourceColumn = (droppableId) => {
    switch (droppableId) {
      case "1":
        return { inventories: sold, title: "sold" };
      case "2":
        return { inventories: unsold, title: "unsold" };
      case "3":
        return { inventories: underProcess, title: "underProcess" };
      default:
        return underProcess;
    }
  };

  return (
    <div className="w-full h-fit bg-inherit flex flex-col gap-[2rem]  ">
      {isFetching ? (
        <div className="w-full h-[11rem] flex justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex justify-start gap-[1rem] w-full min-h-[30rem] h-fit pb-[1rem] overflow-x-scroll ">
            <Board inventories={sold} title='Sold' _id='1' />
            <Board inventories={unsold} title="On Sold" _id="2" />
            <Board inventories={underProcess} title="Under Progress" _id="3" />
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default Kanban;
