import React from 'react'
import { useState } from 'react';
import { Tooltip, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import Task from './Task'
import { useDispatch } from 'react-redux';
import { getTaskReducer } from '../../redux/reducer/task';

const Table = ({ tasks, isFetching, error }) => {

    ///////////////////////////////////// VARIABLES /////////////////////////////////////
    const dispatch = useDispatch()

    ///////////////////////////////////// STATES ////////////////////////////////////////
    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openTask, setOpenTask] = useState(false)

    ///////////////////////////////////// USE EFFECTS ///////////////////////////////////

    ///////////////////////////////////// FUNCTIONS /////////////////////////////////////
    const handleOpenTask = (task) => {
        setOpenTask(true);
        dispatch(getTaskReducer(task))
    }
    const handleOpenEditModal = (task) => {
        setOpenEditModal(true);
        dispatch(getTaskReducer(task))
    }
    const handleOpenDeleteModal = (taskId) => {
        setOpenDeleteModal(true);
        setSelectedTaskId(taskId)
    }


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




    return (
        <div className='w-[61rem] h-auto overflow-x-scroll '>

            <EditModal open={openEditModal} setOpen={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} taskId={selectedTaskId} />
            <Task open={openTask} setOpen={setOpenTask} />

            {
                isFetching
                &&
                <div className="w-full h-[11rem] flex justify-center items-center ">
                    <CircularProgress />
                </div>
            }
            {
                error
                &&
                <div className="w-full h-[11rem] flex justify-center items-center ">
                    <span className='text-red-500 ' >{error}</span>
                </div>
            }
            {
                (!isFetching && !error) &&
                < DataGrid
                    rows={tasks}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5, }
                        },
                    }}
                    getRowId={row => row._id}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            }

        </div>
    );
}

export default Table