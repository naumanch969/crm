import React, { useEffect, useState } from "react";
import Board from "./Board";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../../redux/action/project";
import { Loader } from "../../../utils";

const Kanban = ({ options, setOptions }) => {
  /////////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch();
  const { archived, projects, isFetching } = useSelector((state) => state.project);
  let initialFilteredProjectsState = {
    notStarted: [],
    completed: [],
    inProgress: [],
    onHold: [],
    remaining: [],
  };
  const statusEnum = ["notStarted", "completed", "inProgress", "onHold"];

  /////////////////////////////////////// STATE ////////////////////////////////////////
  let [filteredProjects, setFilteredProjects] = useState(initialFilteredProjectsState);
  const { notStarted, completed, inProgress, onHold } = filteredProjects;

  /////////////////////////////////////// USE EFFECT /////////////////////////////////////
  useEffect(() => {
    statusEnum.forEach(
      (status) =>
      (filteredProjects[status] = (options.showArchivedProjects ? archived : projects).filter(
        (project) => project.status == status
      ))
    );
    setFilteredProjects({ ...filteredProjects });
  }, [projects, archived]);

  /////////////////////////////////////// FUNCTION ///////////////////////////////////////
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Determine the source and destination columns
    const sourceColumn = getSourceColumn(result.source.droppableId);
    const destinationColumn = getSourceColumn(result.destination.droppableId);

    // Move the dragged project from the source to the destination column
    const draggedProject = sourceColumn.projects[result.source.index];
    filteredProjects[sourceColumn.title].splice(result.source.index, 1);
    filteredProjects[destinationColumn.title].splice(result.destination.index, 0, draggedProject);
    setFilteredProjects({ ...filteredProjects });

    // upating project status in backend/database
    dispatch(updateProject(draggedProject._id, { status: destinationColumn.title }));
  };

  const getSourceColumn = (droppableId) => {
    switch (droppableId) {
      case "1":
        return { projects: notStarted, title: "notStarted" };
      case "2":
        return { projects: completed, title: "completed" };
      case "3":
        return { projects: inProgress, title: "inProgress" };
      case "4":
        return { projects: onHold, title: "onHold" };
      default:
        return notStarted;
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
            <Board projects={notStarted} title='Not Started' _id='1' />
            <Board projects={completed} title="Completed" _id="2" />
            <Board projects={inProgress} title="In Progress" _id="3" />
            <Board projects={onHold} title="On Hold" _id="4" />
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default Kanban;
