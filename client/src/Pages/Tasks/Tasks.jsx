import React, { useEffect, useMemo, useState } from 'react'
import { Table } from '../../Components'
import Topbar from './Topbar'
import Task from './Task'
import { person5 } from '../../assets'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { getTasks } from '../../redux/action/task'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import { getTaskReducer } from '../../redux/reducer/task'

function Tasks() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { tasks, isFetching, error } = useSelector(state => state.task)
  const columns = [
    {
      field: 'title', headerName: 'Title', width: 200, renderCell: (params) => (
        <span className='cursor-pointer text-blue-600 ' onClick={() => handleOpenTask(params.row)} >{params.row.title}</span>
      )
    },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'priority', headerName: 'Priority', width: 120 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    {
      field: "action", headerName: "Action", width: 150, renderCell: (params) => (
        <div className='flex gap-[4px] ' >
          <Tooltip placement='top' title='Edit' >
            <button onClick={() => handleOpenEditModal(params.row)} className='cursor-pointer ' ><EditOutlined /></button>
          </Tooltip>
          <Tooltip placement='top' title='Delete' >
            <button onClick={() => handleOpenDeleteModal(params.row._id)} className='cursor-pointer ' ><DeleteOutline /></button>
          </Tooltip>
        </div>
      ),
    },
  ];

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openTask, setOpenTask] = useState(false)

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useMemo(() => {
    dispatch(getTasks())
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////
  const handleOpenTask = (task) => {
    dispatch(getTaskReducer(task))
    setOpenTask(true);
  }
  const handleOpenEditModal = (task) => {
    dispatch(getTaskReducer(task))
    setOpenEditModal(true);
  }
  const handleOpenDeleteModal = (taskId) => {
    setSelectedTaskId(taskId)
    setOpenDeleteModal(true);
  }




  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[12px]  ' >

      <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} taskId={selectedTaskId} />
      <Task open={openTask} setOpen={setOpenTask} />

      <Topbar view={view} setView={setView} />
      <Table
        rows={tasks}
        columns={columns}
        rowsPerPage={5}
        isFetching={isFetching}
        error={error}
      />

    </div>
  )
}

export default Tasks