import React from 'react'
import { useState } from 'react';
import { Avatar, AvatarGroup, Tooltip, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Edit, EditAttributes, EditOutlined, More, MoreOutlined, PanoramaFishEye, ViewAgenda } from '@mui/icons-material';
import { Eye } from 'react-bootstrap-icons';
import DeleteModal from './DeleteModal';
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/action/user'
import Reqest from './Request';
import { getApprovalReducer } from '../../../redux/reducer/approval';
import { rejectRequestApproval } from '../../../redux/action/approval';

const Table = ({ approvals, isFetching, error }) => {

    //////////////////////////////////////// VARIABLES ///////////////////////////////////
    const dispatch = useDispatch()

    //////////////////////////////////////// STATES ///////////////////////////////////
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openRequest, setOpenRequest] = useState(false)
    const [selectedApprovalId, setSelectedApprovalId] = useState(null)


    //////////////////////////////////////// FUNCTIONS ///////////////////////////////////

    const handleOpenDeleteModal = (approvalId) => {
        setOpenDeleteModal(true);
        setSelectedApprovalId(approvalId)
    }

    const handleApprove = (approval) => {
        dispatch(register(approval?.data))
    }

    const handleReject = (approval) => {
        dispatch(rejectRequestApproval(approval.data?.email))
    }
    const handleOpenRequest = (approval) => {
        setOpenRequest(true);
        dispatch(getApprovalReducer(approval))
    }

    const columns = [
        {
            field: 'sr', headerName: 'Sr.', width: 80, renderCell: (params) => (
                <>{params.id}</>
            )
        },
        {
            field: 'data.firstName', headerName: 'First Name', width: 130, renderCell: (params) => (
                <span className='cursor-pointer text-blue-600 ' onClick={() => handleOpenRequest(params.row)} >{params.row?.data?.firstName}</span>
            )
        },
        {
            field: 'data.lastName', headerName: 'Last Name', width: 130, renderCell: (params) => (
                <span className='cursor-pointer text-gray-600 '  >{params.row?.data?.lastName}</span>
            )
        },
        {
            field: 'data.username', headerName: 'Username', width: 130, renderCell: (params) => (
                <span className='cursor-pointer text-gray-600 '  >{params.row?.data?.username}</span>
            )
        },
        {
            field: 'data.email', headerName: 'email', width: 160, renderCell: (params) => (
                <span className='cursor-pointer text-gray-600 '  >{params.row?.data?.email}</span>
            )
        },
        {
            field: 'data.phone', headerName: 'Phone', width: 150, renderCell: (params) => (
                <span className='cursor-pointer text-gray-600 '  >{format(params.row.phone)}</span>
            )
        },
        {
            field: 'data.password', headerName: 'Password', width: 150, renderCell: (params) => (
                <span className='cursor-pointer text-gray-600 '  >{format(params.row.password)}</span>
            )
        },
        {
            field: "approve/reject", headerName: "Approve/Reject", width: 150, renderCell: (params) => (
                <div className='flex gap-[4px] ' >
                    <button onClick={() => handleApprove(params.row)} className='cursor-pointer bg-green-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ' >Approve</button>
                    <button onClick={() => handleReject(params.row)} className='cursor-pointer bg-red-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ' >Reject</button>
                </div>
            ),
        },
        {
            field: "action", headerName: "Action", width: 100, renderCell: (params) => (
                <div className='flex gap-[4px] ' >
                    <Tooltip placement='top' title='Delete' >
                        <button onClick={() => handleOpenDeleteModal(params.row._id)} className='cursor-pointer ' ><DeleteOutline /></button>
                    </Tooltip>
                </div>
            ),
        },
    ];




    return (
        <div className='w-[61rem] h-auto overflow-x-scroll '>

            <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} approvalId={selectedApprovalId} />
            <Reqest open={openRequest} setOpen={setOpenRequest} />


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
                    rows={approvals}
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