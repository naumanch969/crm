import React, { useEffect, useState } from 'react';
import { Add, Archive, Person2,  } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../utils';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getArchivedLeads, getEmployeeLeads, getLeads } from '../../redux/action/lead';
import { Grid3x2 } from 'react-bootstrap-icons';

const Topbar = ({ options, setOptions }) => {

  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = pathname.split('/')[1];
  const pathArr = pathname.split('/').filter(item => item !== '');
  const showOptionButtons = !pathArr.includes('create');
  const dispatch = useDispatch()

  ////////////////////////////////////////// STATES //////////////////////////////////////

  ////////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    options?.showArchivedLeads && dispatch(getArchivedLeads())
    options?.showEmployeeLeads && dispatch(getEmployeeLeads())
    !options?.showArchivedLeads && !options?.showEmployeeLeads && dispatch(getLeads())
  }, [options])

  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const handleAddClick = () => {
    navigate(`${pathname}/create`);
  };
  const handleToggleShowArchivedLeads = () => {
    setOptions(pre => (
      { ...pre, showArchivedLeads: !options?.showArchivedLeads, showEmployeeLeads: false }
    ))
  }
  const handleToggleShowEmployeeLeads = () => {
    setOptions(pre => (
      { ...pre, showEmployeeLeads: !options?.showEmployeeLeads, showArchivedLeads: false }
    ))
  }
  const handleToggleIsKanbanView = () => {
    setOptions(pre => (
      { ...pre, isKanbanView: !options?.isKanbanView }
    ))
  }



  return (
    <div className='flex flex-col '>
      <div className="w-full text-[14px] ">
        <Path />
      </div>

      <div className='flex justify-between items-center '>
        <h1 className='text-primary-blue text-[32px] capitalize'>{title}</h1>

        {showOptionButtons && (
          <div className="flex gap-[1rem] ">
            <Tooltip title='Archived Leads' placement='top' >
              <IconButton onClick={handleToggleShowArchivedLeads} >
                <Archive style={{ color: options?.showArchivedLeads ? 'blue' : 'gray' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='My Leads' placement='top' >
              <IconButton onClick={handleToggleShowEmployeeLeads} >
                <Person2 style={{ color: options?.showEmployeeLeads ? 'blue' : 'gray' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='View' placement='top' >
              <IconButton onClick={handleToggleIsKanbanView} >
                <Grid3x2 style={{ color: options?.isKanbanView ? 'blue' : 'gray' }} />
              </IconButton>
            </Tooltip>

            <button
              onClick={handleAddClick}
              className="bg-primary-red text-white w-[44px] h-[44px] flex justify-center items-center rounded-full shadow-lg"
            >
              <Add />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Topbar;
