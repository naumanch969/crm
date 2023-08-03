import { useState } from 'react';
import { Avatar, AvatarGroup, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Edit, EditAttributes, EditOutlined, More, MoreOutlined, PanoramaFishEye, ViewAgenda } from '@mui/icons-material';
import { Eye } from 'react-bootstrap-icons';
import EditModal from './EditModal';
import React from 'react'
import DeleteModal from './DeleteModal';


const Table = ({ users }) => {

    const [changePassword, setChangePassword] = useState('')
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const columns = [
        {
            field: 'image', headerName: 'Photo', width: 100, renderCell: (params) => (
                <img src={params.row.image} alt="" className='w-[2rem] h-[2rem] rounded-full object-cover ' />
            )
        },
        { field: 'userName', headerName: 'User Name', width: 150, },
        { field: 'password', headerName: 'Password', width: 150 },
        {
            field: 'changePassword', headerName: 'Change Password', width: 150, renderCell: (params) => (
                <React.Fragment>
                    <input type="password" value={changePassword} onChange={(e) => setChangePassword(e.target.value)} />
                </React.Fragment>
            )
        },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'officialNumber', headerName: 'Office No.', width: 150 },
        { field: 'phone', headerName: 'Mobile Number', width: 150 },
        { field: 'cnic', headerName: 'CNIC', width: 150 },
        { field: 'branch', headerName: 'Branch', width: 150 },
        {
            field: 'activeStatus', headerName: 'Status', width: 150, renderCell: (params) => {
                const { activeStatus } = params.row
                return (
                    <span className={`
                ${activeStatus ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}
                border-[1px] rounded-[6px] px-[4px] py-[2px]
                `}
                    >{activeStatus ? 'Active' : 'Inactive'}</span>
                )
            }
        },
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => (
                <div className='flex gap-[4px] ' >
                    <Tooltip placement='top' title='Edit' >
                        <button onClick={() => setOpenEditModal(true)} className='cursor-pointer ' ><EditOutlined /></button>
                    </Tooltip>
                    <Tooltip placement='top' title='Delete' >
                        <button className='cursor-pointer ' ><DeleteOutline /></button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className='w-[61rem] h-auto overflow-x-scroll '>

            <EditModal open={openEditModal} setOpen={setOpenEditModal} />
            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} />

            <DataGrid
                rows={users}
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