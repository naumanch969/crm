import React, { memo, useEffect, useState } from 'react'
import Topbar from './Topbar'
import { Table } from '../../Components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getEmployees } from '../../redux/action/user'
import DeleteEmployee from './DeleteEmployee'
import EditEmployee from './EditEmployee'
import { getUserReducer } from '../../redux/reducer/user'
import { IconButton, Tooltip } from '@mui/material'
import { DeleteOutline, EditOutlined } from '@mui/icons-material'

const Employees = memo(() => {

    /////////////////////////////////////// VARIABLES ////////////////////////////////////////
    const dispatch = useDispatch()
    const { employees, isFetching, error } = useSelector(state => state.user)
    const columns = [
        {
            field: 'firstName', headerName: 'First Name', width: '150', renderCell: (params) => (
                <Link to={`/users/${params.row._id}`} >{params.row.firstName}</Link>
            )
        },
        { field: 'lastName', headerName: 'Last Name', width: '150' },
        { field: 'username', headerName: 'Username', width: '150' },
        { field: 'email', headerName: 'Email', width: '150' },
        { field: 'phone', headerName: 'Phone', width: '150' },
        { field: 'cnic', headerName: 'CNIC', width: '150' },
        {
            field: "action", headerName: "Action", width: 150, renderCell: (params) => (
                <div className='flex gap-[4px] ' >
                    <Tooltip placement='top' title='Edit' >
                        <IconButton onClick={() => handleOpenEditModal(params.row)} className='cursor-pointer ' ><EditOutlined /></IconButton>
                    </Tooltip>
                    <Tooltip placement='top' title='Delete' >
                        <IconButton onClick={() => handleOpenDeleteModal(params.row._id)} className='cursor-pointer ' ><DeleteOutline /></IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ]

    /////////////////////////////////////// STATES ////////////////////////////////////////
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState('')

    /////////////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getEmployees())
    }, [])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////
    const handleOpenEditModal = (employee) => {
        dispatch(getUserReducer(employee))
        setOpenEditModal(true);
    }
    const handleOpenDeleteModal = (taskId) => {
        setSelectedUserId(taskId)
        setOpenDeleteModal(true);
    }


    return (
        <div className='w-full' >

            <EditEmployee open={openEditModal} setOpen={setOpenEditModal} />
            <DeleteEmployee open={openDeleteModal} setOpen={setOpenDeleteModal} userId={selectedUserId} />

            <Topbar />
            <Table
                rows={employees}
                columns={columns}
                isFetching={isFetching}
                error={error}
                rowsPerPage={10}
            />

        </div>
    )
})

export default Employees