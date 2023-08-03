import { useState } from 'react';
import { Avatar, AvatarGroup, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Edit, EditAttributes, EditOutlined, More, MoreOutlined, PanoramaFishEye, ViewAgenda } from '@mui/icons-material';
import { Eye } from 'react-bootstrap-icons';
import EditModal from './EditModal';
import React from 'react'
import DeleteModal from './DeleteModal';


const Table = ({ tasks }) => {

    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const columns = [
        { field: 'title', headerName: 'Title', width: 150, },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'dueDate', headerName: 'Due Date', width: 150 },
        { field: 'createdAt', headerName: 'Created At', width: 150 },
        {
            field: "action", headerName: "Action", width: 150, renderCell: (params) => (
                <div className='flex gap-[4px] ' >
                    <Tooltip placement='top' title='Edit' >
                        <button onClick={() => setOpenEditModal(true)} className='cursor-pointer ' ><EditOutlined /></button>
                    </Tooltip>
                    <Tooltip placement='top' title='Delete' >
                        <button onClick={() => setOpenDeleteModal(true)} className='cursor-pointer ' ><DeleteOutline /></button>
                    </Tooltip>
                </div>
            ),
        },
    ];



    const handleDelete = () => {
        console.log('handleDelete')
    }

    return (
        <div className='w-[61rem] h-auto overflow-x-scroll '>

            <EditModal open={openEditModal} setOpen={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} handleDelete={handleDelete} />

            <DataGrid
                rows={tasks}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                getRowId={row => row._id}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
            />

        </div>
    );
}

export default Table